import { useState } from "react";
import Logo from "../logo/Logo";
import styles from "./Sidebar.module.css";
import { NavLink } from "react-router-dom";
import { useUI } from "../../context/UI-Context";
import { useResize } from "../../reusable-components/useResize";

function Sidebar({ className}){
  const {opensidebar,setOpenSidebar,isdarkmode,setIsDarkMode} = useUI()
  const {isMobile,isTablet} = useResize()
  console.log("Mobile:", isMobile, "Sidebar Open:", opensidebar);
 
  return(
    

     <aside className={`${className} 
      ${isMobile || isTablet ? (!opensidebar ? styles.mobileOpen : styles.mobileClosed) 
                 : (opensidebar ? styles.desktopExpanded : styles.desktopCollapsed)}`}>
     <div className={styles.topsidebar}>
      <div className={styles.upperSidebar}>
      {/* <Logo/> */}
      </div>
      <div className={styles.middleSidebar}>
    
      
      <h3 className={styles.sectionTitle}>
        <img
          src="./icons/metrics.png"
          alt="metrics-icon"
          className={styles.sidebarIcon}
        />
        {!opensidebar && <p>Performance Metrics</p>}
      </h3>
      <ul className={styles.sidebarContent}>
        <li>
          
          <NavLink to="/">
          <img
            src="./icons/perfect-order-rate.png"
            alt="perfect-order-rate-icon"
            className={styles.sidebarIcon}
          />
          {!opensidebar && <span>Perfect Order Rate</span>}
          </NavLink>
        </li>
        <li>
         
          <NavLink to="/number-of-shipments">
          <img
            src="./icons/number-of-shipments.png"
            alt="number-of-shipments-icon"
            className={styles.sidebarIcon}
          />
          {!opensidebar && <span>Number Of Shipments</span>}
        </NavLink>
        </li>
        <li>
         
          <NavLink to="/shipping-time">
          <img
            src="./icons/shipping-time.png"
            alt="shipping-time-icon"
            className={styles.sidebarIcon}
          />
          {!opensidebar && <span>Shipping Time</span>}
          </NavLink>
        </li>
        <li>
          
          <NavLink to="/average-delivery-time">
          <img
            src="./icons/average-time-delivery.png"
            alt="average-delivery-time-icon"
            className={styles.sidebarIcon}
          />
         {!opensidebar && <span>Average Delivery Time</span>}
          </NavLink>
        </li>
        <li>
          
          <NavLink to="/transportation-cost">
          <img
            src="./icons/transportation-cost.png"
            alt="transportation-cost-icon"
            className={styles.sidebarIcon}
          />
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
      <img
       role="button" 
       src="./icons/dark.png" 
       alt="dark-mode-icon" 
       
        />
        {!opensidebar && <p>Dark Mode</p>}
         
      </div>
      <div className={`${styles.notifications} ${styles.mobileOnly}`}>
      <img role="button" src="./icons/notification.png" alt="notification-icon" />
      {!opensidebar && <p>Notifications</p>}
         
      </div>
      </div>
      
    </aside> 
    
  )
}
export default Sidebar