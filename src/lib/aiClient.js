const DEFAULT_TIMEOUT_MS = 6000

export class AiClientError extends Error {
  constructor(code, message, options = {}) {
    super(message, options.cause ? { cause: options.cause } : undefined)
    this.name = 'AiClientError'
    this.code = code
    this.status = options.status
  }
}

function getRequestTimeout() {
  const configuredTimeout = Number(import.meta.env.VITE_AI_REQUEST_TIMEOUT_MS)

  return Number.isFinite(configuredTimeout) && configuredTimeout > 0
    ? configuredTimeout
    : DEFAULT_TIMEOUT_MS
}

export function getAiApiUrl() {
  return import.meta.env.VITE_AI_API_URL?.trim() || ''
}

export function hasConfiguredAiApi() {
  return Boolean(getAiApiUrl())
}

function normalizeResponsePayload(payload) {
  const result =
    payload?.data && typeof payload.data === 'object' && !Array.isArray(payload.data)
      ? payload.data
      : payload

  if (!result || typeof result !== 'object' || Array.isArray(result)) {
    throw new AiClientError(
      'INVALID_RESPONSE',
      'The AI service returned an unreadable response.',
    )
  }

  return result
}

export async function requestAi({
  feature,
  input,
  context,
  expectedOutput,
}) {
  const endpoint = getAiApiUrl()

  if (!endpoint) {
    throw new AiClientError(
      'NOT_CONFIGURED',
      'No optional AI API endpoint is configured.',
    )
  }

  const controller = new AbortController()
  const timeout = globalThis.setTimeout(() => controller.abort(), getRequestTimeout())

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        feature,
        version: 1,
        input,
        context,
        expectedOutput,
      }),
      signal: controller.signal,
    })

    if (!response.ok) {
      throw new AiClientError(
        'HTTP_ERROR',
        'The optional AI service is temporarily unavailable.',
        { status: response.status },
      )
    }

    let payload

    try {
      payload = await response.json()
    } catch (error) {
      throw new AiClientError(
        'INVALID_RESPONSE',
        'The AI service did not return valid JSON.',
        { cause: error },
      )
    }

    return normalizeResponsePayload(payload)
  } catch (error) {
    if (error instanceof AiClientError) throw error

    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new AiClientError(
        'TIMEOUT',
        'The optional AI service took too long to respond.',
        { cause: error },
      )
    }

    throw new AiClientError(
      'NETWORK_ERROR',
      'The optional AI service could not be reached.',
      { cause: error },
    )
  } finally {
    globalThis.clearTimeout(timeout)
  }
}
