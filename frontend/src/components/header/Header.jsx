import styles from "./Header.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { mainPages } from "../../../public/project-data-files/MainPages";
import Logo from "../logo/Logo";
import SearchBox from "../searchbox/SearchBox";
import { MdOutlineLightMode } from "react-icons/md";
import SubHeader from "../subheader/SubHeader";
import { useUI } from "../../context/UI-Context";
import { useGetLocation } from "../../reusable-components/useGetLocation";
import User from "../user/User";
import { FiLogOut } from "react-icons/fi";
import { MdHelpOutline } from "react-icons/md";
function Header({ className}) {
  const navigate = useNavigate()
  const {opensidebar,
    setOpenSidebar,
    isdarkmode,
    setIsDarkMode,
    showdropDown,
    setshowdropDown

  } = useUI()
  // const location = useLocation();
  // const pageTitle = mainPages[location.pathname] || "";
  const pageTitle = useGetLocation()
  return (
    <header className={className}>
      <div className={styles.headContainer}>
      <Logo/>
      <div className={styles.title}>

      
      <img 
            src="./icons/list.png" 
            alt="" className={`${styles.menubar}`} 
            role='button' 
            onClick={() => {
              console.log("Toggle Clicked! Current State:", opensidebar); // Debugging
              setOpenSidebar(prev => !prev);
            }}
           
      />
 
      {pageTitle && <p className={styles.pagetitle}>{pageTitle}</p>}
      </div>
     <div className={styles.rightHeader}>
     <SearchBox className={`${styles.searchbox}`}/>
      <div className={styles.imageicons}>
      {isdarkmode ? (
  <MdOutlineLightMode 
        size ={50}
    className={`${styles.darkmode} ${styles.mobilehidden}`} 
    onClick={() => setIsDarkMode(!isdarkmode)}
  />
) : (
  <img 
    role="button" 
    src="./icons/dark.png" 
    alt="dark-mode-icon" 
    className={`${styles.darkmode} ${styles.mobilehidden}`} 
    onClick={() => setIsDarkMode(!isdarkmode)} 
  />
)}
          <img role="button" src="./icons/notification.png" alt="notification-icon" className={`${styles.notification} ${styles.mobilehidden}`} />
           <img 
           onClick={() => {
            setshowdropDown(!showdropDown)
           }}
           role="button" 
           src="./avatar/avatar.svg" 
           alt="avatar-icon" 
           className={`${styles.avatar} ${isdarkmode ? 'dark-avatar'  : ''}`}  />
           {/* <User/> */}
           {showdropDown && <div className={styles.dropdown}>
            <p
            className={styles.logout}
            onClick={() => navigate('/account')}
            ><span><FiLogOut color='orange'/></span>Log Out</p>
            <p><span><MdHelpOutline color='orange'/></span>help & support</p>
            </div>}
      </div>
      </div>
     
      
     
      </div>
     
      
    </header>
  );
}
export default Header;
