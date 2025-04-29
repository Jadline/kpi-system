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
import { useUser } from "../../context/user-Context";
import { getInitials } from "../../helpers/initials";
import { FaUser } from "react-icons/fa";
function Header({ className}) {
  const {userData} = useUser()
  const initials = userData?.initials || 'RC';
  const username = userData?.username || 'Rolling Cargo'
 
  const navigate = useNavigate()
  const {opensidebar,
    setOpenSidebar,
    isdarkmode,
    setIsDarkMode,
    showdropDown,
    setshowdropDown

  } = useUI()
  
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
              setOpenSidebar(prev => !prev);
            }}
           
      />
 
      {pageTitle && <p className={styles.pagetitle}>{pageTitle}</p>}
      </div>
     <div className={styles.rightHeader}>
   
      <div className={styles.imageicons}>
      {!isdarkmode ? (
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
          <div
           className={`${styles.avatar}`}
           onClick={() => {
            setshowdropDown(!showdropDown)
           }}
           role="button" 
          > 
          {initials } 

          </div>
           
           
           {showdropDown && <div className={styles.dropdown}>
           <p><span><FaUser color='orange'/>{username}</span></p>
            <p
            className={styles.logout}
            onClick={() => navigate('/account')}
            ><span><FiLogOut color='orange'/></span>Log Out</p>
            
            </div>}
      </div>
      </div>
     
      
     
      </div>
     
      
    </header>
  );
}
export default Header;
