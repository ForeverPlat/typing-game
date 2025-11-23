import { Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"
import '../styles/style.css'

const Layout = () => {
  return (
    <div>
        <Header />
        <main className="main-content">
            <Outlet />
        </main>
        <Footer />
    </div>
  )
}

export default Layout