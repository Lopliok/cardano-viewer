import { Outlet } from 'react-router'
import Sidebar from './Sidebar'
import Header from './Header'

function Layout() {

  return (
    <>
      <Header />

      <Sidebar />

      <div className="mt-28 sm:ml-64 px-8">
        <Outlet />
      </div>


    </>
  )
}

export default Layout
