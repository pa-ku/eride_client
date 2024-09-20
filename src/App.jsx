import Home from './pages/Home'
import './global.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import About from './pages/About'
import Favorites from './pages/Favorites'
/* import CreateProduct from './pages/CreateProduct' */
import Layout from './pages/Layout'
import Register from './pages/Register'
import Login from './pages/Login'
import AllProducts from './pages/AllProducts'
import ProductShowcase from './pages/ProductShowcase'
import ProtectedRoute from './ProtectedRoute'
import { AuthContextProvider } from './context/AuthContext'

{
  /* <Route path='create' element={<CreateProduct />} /> */
}
function App() {
  return (
    <>
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index path="/" element={<Home />} />

              <Route path="/product">
                <Route path="scooters" element={<AllProducts />} />
                <Route path="id/:id" element={<ProductShowcase />} />

                <Route element={<ProtectedRoute />}>
                  <Route path="favorites" element={<Favorites />} />
                </Route>
              </Route>

              <Route path="/user">
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
              </Route>

              <Route path="/about" element={<About />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </>
  )
}

export default App
