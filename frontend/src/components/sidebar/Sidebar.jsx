import { useState } from "react";
import Logo from "../logo/Logo";
import styles from "./Sidebar.module.css";
import { NavLink } from "react-router-dom";
import { useUI } from "../../context/UI-Context";
import { useResize } from "../../reusable-components/useResize";
import { FaBoxOpen, FaChartBar, FaDollarSign, FaMoneyBill, FaShoppingBag } from 'react-icons/fa';
import { FaClipboardList } from 'react-icons/fa';
import { FaTruck ,  FaRegClock,FaBox} from 'react-icons/fa';
import { FaBell } from 'react-icons/fa';
import { FaSun } from 'react-icons/fa';
import { FaMoon } from 'react-icons/fa';


function Sidebar({ className}){
  const {opensidebar,setOpenSidebar,isdarkmode,setIsDarkMode} = useUI()
  const {isMobile,isTablet,isLaptop} = useResize()
 
 
  return(
    

     <aside className={`${className} 
      ${isMobile|| isLaptop || isTablet ? (!opensidebar ? styles.mobileOpen : styles.mobileClosed) 
                 : (opensidebar ? styles.desktopExpanded : styles.desktopCollapsed)}`}>
     <div className={styles.topsidebar}>
      <div className={styles.upperSidebar}>
     
      </div>
      <div className={styles.middleSidebar}>
    
      
      <h3 className={styles.sectionTitle}>
      
        <FaChartBar size='30' />
        {!opensidebar && <p>Performance Metrics</p>}
      </h3>
      <ul className={styles.sidebarContent}>
        <li>
          
          <NavLink to="/">
          
          <FaClipboardList size='30'/>
          {!opensidebar && <span>Perfect Order Rate</span>}
          </NavLink>
        </li>
        <li>
         
          <NavLink to="/number-of-shipments">
        
         <FaTruck size='30'/>
          {!opensidebar && <span>Number Of Shipments</span>}
        </NavLink>
        </li>
        <li>
         
          <NavLink to="/shipping-time">
    
          < FaRegClock size='30'/>
          {!opensidebar && <span>Shipping Time</span>}
          </NavLink>
        </li>
        <li>
          
          <NavLink to="/average-delivery-time">
         
          <FaBoxOpen size='30'/>
         {!opensidebar && <span>Average Delivery Time</span>}
          </NavLink>
        </li>
        <li>
          
          <NavLink to="/transportation-cost">
         
         <div style={{ display: 'flex', alignItems: 'center',position:'relative' }}>
         <FaMoneyBill size='30'/>
      </div>
          {!opensidebar && <span>Transportation Cost</span>}
          </NavLink>
        </li>
      </ul>


      </div>
      </div>
      <div className={styles.lowerSidebar}>
      <div 
      className={`${styles.darkmode} 
      ${styles.mobileOnly}`}
      onClick={() => setIsDarkMode(!isdarkmode)}
      >
        {!isdarkmode ? <FaSun size='30'/> : <FaMoon size='30'/>}
        {!opensidebar && <p>{!isdarkmode ? 'Light Mode' : 'Dark Mode'}</p>}
         
      </div>
      <div className={`${styles.notifications} ${styles.mobileOnly}`}>
        <FaBell size='30'/>
     
      {!opensidebar && <p>Notifications</p>}
         
      </div>
      </div>
      
    </aside> 
    
  )
}
export default Sidebar