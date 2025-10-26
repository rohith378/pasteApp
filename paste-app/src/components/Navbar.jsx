import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="w-full bg-gray-900/80 backdrop-blur-md border-b border-gray-800 shadow-md py-4 px-8 flex items-center justify-between">
      <h1 className="text-2xl font-semibold text-teal-400 tracking-wide">
        Paste<span className="text-white">Vault</span>
      </h1>

      <div className="flex items-center gap-8">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-gray-300 hover:text-teal-400 transition font-medium ${
              isActive ? 'text-teal-400 border-b-2 border-teal-400 pb-1' : ''
            }`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/pastes"
          className={({ isActive }) =>
            `text-gray-300 hover:text-teal-400 transition font-medium ${
              isActive ? 'text-teal-400 border-b-2 border-teal-400 pb-1' : ''
            }`
          }
        >
          Pastes
        </NavLink>
      </div>
    </nav>
  )
}

export default Navbar

