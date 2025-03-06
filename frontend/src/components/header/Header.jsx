import styles from "./Header.module.css";
import { useLocation } from "react-router-dom";
import { mainPages } from "../../../public/project-data-files/MainPages";
import Logo from "../logo/Logo";
import SearchBox from "../searchbox/SearchBox";
import { MdOutlineLightMode } from "react-icons/md";
import SubHeader from "../subheader/SubHeader";
import { useUI } from "../../context/UI-Context";
function Header({ className}) {
  const {opensidebar,setOpenSidebar,isdarkmode,setIsDarkMode} = useUI()
  const location = useLocation();
  const pageTitle = mainPages[location.pathname] || "";
  return (
    <header className={className}>
      <div className={styles.headContainer}>
      <img 
            src="./icons/list.png" 
            alt="" className={`${styles.menubar}`} 
            role='button' 
            onClick={() => setOpenSidebar(!opensidebar)}
      />
 
      {pageTitle && <p className={styles.pagetitle}>{pageTitle}</p>}
      
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
           <img role="button" src="./avatar/avatar.svg" alt="avatar-icon" className={`${styles.avatar} ${isdarkmode ? 'dark-avatar'  : ''}`}  />
      </div>
      </div>
     
      
     
      </div>
     
      <SubHeader/>
       
    </header>
  );
}
export default Header;
