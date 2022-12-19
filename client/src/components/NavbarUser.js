import React , {useState}from 'react'
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import { Link } from 'react-router-dom'
import  {SidebarData}  from './SidebarData'
import "../styles/main.css";

function NavbarUser() {
    const [sidebar, setSidebar] = useState(false)

    const showSidebar = () => setSidebar(!sidebar)
  return (
    <>
    <div className="navbarUser">
    <Link to="#" className='menu-bars'>
        <FaIcons.FaBars onClick={showSidebar}/>
    </Link>
    </div>
    <nav className={sidebar ? 'nav-menu-user active': 'nav-menu-user'} >
        <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toogle'>
            <Link to="#" className='menu-bars'>
                <AiIcons.AiOutlineClose/>
            </Link>
            </li>
            {SidebarData.map((item,index)=>{
                return(
                    <li key={index} className={item.cName}>
                      <Link to={item.path}>
                        {item.icon}
                        <span className='spanUser'>{item.title}</span>
                        </Link>   
                    </li>
                )
                })}
        </ul>
    </nav>

    </>
  )
}

export default NavbarUser
