import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { userLogin, message } = useAuth()

  async function handleSubmit(e) {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value

    userLogin({ email, password })
  }

  return (
    <>
      <div className="flex h-screen w-full items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="mb-20 flex w-80 flex-col gap-3"
        >
          <h1 className="text-3xl">Login</h1>

          <input
            name="email"
            type="email"
            required
            className="input-form"
            placeholder="email"
          />

          <label className="flex flex-col">
            <div className="flex w-full flex-row">
              <input
                name="password"
                type="password"
                className="input-form"
                placeholder="password"
                required
              />
            </div>
          </label>

          <button
            type="submit"
            className="w-full rounded-lg bg-primary-500 py-3 text-lg text-white hover:bg-primary-400"
          >
            Enviar
          </button>
          <Link
            className="text-primary-600 hover:text-primary-400"
            to={'/user/register'}
          >
            No tienes cuenta? registrate aqui
          </Link>
          <p className="h-10">{message}</p>
        </form>
      </div>
    </>
  )
}
