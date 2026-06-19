import { Link } from 'react-router-dom'
import Icon from '../components/Icon'

function NotFound() {
  return (
    <section className="page-shell grid min-h-[68vh] place-items-center py-16 text-center">
      <div>
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-plum-100 text-plum-700">
          <Icon name="sparkle" size={26} />
        </span>
        <p className="mt-6 text-xs font-bold tracking-[0.16em] text-rosewood uppercase">
          404 · Lost in Delhi
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-ink sm:text-5xl">
          This page missed its appointment.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-7 text-stone-600">
          The route does not exist, but the salon discovery journey is ready when
          you are.
        </p>
        <Link className="primary-button mt-7" to="/">
          Back to DelhiGlow
          <Icon name="arrow" size={17} />
        </Link>
      </div>
    </section>
  )
}

export default NotFound
