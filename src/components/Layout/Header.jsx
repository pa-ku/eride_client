import styled from 'styled-components'
import imgLogo from '../../assets/icons/logo.webp'
import { device } from '../../responsive'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'

const Logo = styled.img`
  width: 150px;

  @media ${device.mobile} {
    width: 130px;
  }
`

export default function Header() {
  return (
    <>
      <header className='md:flex hidden h-14 items-center bg-slate-800 xl:px-10 justify-between w-full'>
        <Link className='w-max' title='Home' to={'/'}>
          <Logo src={imgLogo} alt='' />
        </Link>
        <div className='flex gap-4 items-center '>
          <SearchBar></SearchBar>
          <Link
            className='text-white px-3 py-1 hover:bg-gray-700 rounded-lg'
            to={'/product/scooters'}
          >
            Monopatines
          </Link>

          {/* <Link className='text-white p-1 rounded-full hover:bg-gray-700'>
            <FavIcon></FavIcon>
          </Link> */}
          <Link
            className='text-white px-3 py-1 hover:bg-gray-700 border hover:text-primary-500 hover:border-primary-500 rounded-lg'
            to={'/user/login'}
          >
            Ingresar
          </Link>
          <Link
            className='text-white px-3 py-1 bg-primary-600 hover:bg-primary-500 rounded-lg'
            to={'/user/register'}
          >
            Registrarse
          </Link>
        </div>
      </header>
    </>
  )
}
