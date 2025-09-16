import { Route, Routes } from 'react-router-dom'
import './Styles/App.css'
import Home from './Pages/Home.tsx'
import AboutCompany from './Pages/About_company.tsx'
import Shop from './Pages/Shop.tsx'
import Navbar from './Components/Navbar.tsx'
import Footer from './Components/Footer.tsx'

function App() {

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutCompany />} />
      <Route path="/shop" element={<Shop />} />
    </Routes>
    <Footer/>
    </>
  )
}
export default App
