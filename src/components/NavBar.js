import React, {useState} from "react";
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import './NavBar.css';
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import { IconContext } from "react-icons";
import Submenu from "./Submenu";

const NavBar = (props) => {
  const [sidebar, setSidebar] = useState(false)

  const showSidebar = () => setSidebar(!sidebar)

  return(
    <>
    <IconContext.Provider value={{color:'#000'}}>
      <div className="navbar">
        <Link to="#" className="menu-bars-open">
          <FaIcons.FaBars onClick={showSidebar} />
        </Link>
      </div>
      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className="nav-menu-items" onClick={showSidebar}>
          <li className="navbar-toggle">
            <Link to="#" className='menu-bars-close'>
              <AiIcons.AiOutlineClose />
            </Link>
          </li>
          {SidebarData.map((item, index) => {
            return <Submenu item={item} key={index} />;
            // (
             


              // <li key={index} className={item.cName}>
              //   <Link to={item.path}>
              //     {item.icon}
              //     <span>{item.title}</span>
              //   </Link>
              // </li>
            // )
          })}
        </ul>
      </nav>
    </IconContext.Provider>
    </>
  )
}

export default NavBar