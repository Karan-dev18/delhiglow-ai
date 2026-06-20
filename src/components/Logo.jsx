import { Link } from 'react-router-dom'
import Icon from './Icon'

function Logo({ light = false, onClick }) {
  return (
    <Link
      aria-label="DelhiGlow AI home"
      className={`inline-flex items-center gap-2.5 font-bold tracking-[-0.02em] ${
        light ? 'text-white' : 'text-plum-950'
      }`}
      onClick={onClick}
      to="/"
    >
      <span
        className={`grid size-9 place-items-center rounded-full ${
          light ? 'bg-white text-plum-950' : 'bg-plum-950 text-white'
        }`}
      >
        <Icon name="sparkle" size={17} />
      </span>
      <span className="text-lg">
        DelhiGlow <span className={light ? 'text-saffron-300' : 'text-rosewood'}>AI</span>
      </span>
    </Link>
  )
}

export default Logo
