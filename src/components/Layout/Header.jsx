import imgLogo from '../../assets/icons/logo.webp'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'
import { useAuth } from '../../context/AuthContext'
import LoggedMenu from './LoggedMenu'
import { useState } from 'react'

export default function Header() {
  const { isAuth } = useAuth()

  const [openUserMenu, setOpenUserMenu] = useState(false)
  return (
    <>
      <header className="hidden h-14 w-full items-center justify-between bg-slate-800 md:flex md:px-10">
        <Link className="w-max" title="Home" to={'/'}>
          <img className="size-36 object-contain" src={imgLogo} alt="" />
        </Link>
        <div className="flex items-center gap-4">
          <SearchBar></SearchBar>
          <Link
            className="rounded-lg px-3 py-1 text-white hover:bg-gray-700"
            to={'/product/scooters'}
          >
            Monopatines
          </Link>

          {isAuth && (
            <>
              <Link
                to={'user/favorites'}
                className="rounded-lg p-2 text-white hover:bg-gray-700"
              >
                <svg
                  className="size-5 text-white duration-200 peer-checked:text-primary-500"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  fill="currentColor"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                </svg>
              </Link>
              <span className="relative">
                <button
                  onClick={() => setOpenUserMenu(!openUserMenu)}
                  to={'/user/profile'}
                  className="size-8 rounded-full bg-gray-200"
                >
                  <svg
                    className="size-full object-contain p-1"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="var(--primary-600)"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                    <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                  </svg>
                </button>
                {openUserMenu && <LoggedMenu></LoggedMenu>}
              </span>
            </>
          )}

          {!isAuth && (
            <>
              <Link
                className="rounded-lg border px-3 py-1 text-white hover:bg-gray-700"
                to={'/user/login'}
              >
                Ingresar
              </Link>
              <Link
                className="rounded-lg bg-primary-600 px-3 py-1 text-white hover:bg-primary-500"
                to={'/user/register'}
              >
                Registrarse
              </Link>
            </>
          )}
        </div>
      </header>
    </>
  )
}
