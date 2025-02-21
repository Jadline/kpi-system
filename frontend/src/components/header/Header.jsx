import styles from "./Header.module.css";
import { useLocation } from "react-router-dom";
import { mainPages } from "../../../public/project-data-files/MainPages";
import Logo from "../logo/Logo";
import SearchBox from "../searchbox/SearchBox";
import SubHeader from "../subheader/SubHeader";
function Header({ className }) {
  const location = useLocation();
  const pageTitle = mainPages[location.pathname] || "";
  return (
    <header className={className}>
      <div className={styles.headContainer}>
      <Logo/>
      {pageTitle && <p>{pageTitle}</p>}
      
      <SearchBox/>
      <img role="button" src="./icons/dark.png" alt="dark-mode-icon" className={styles.darkmode}/>
      <img role="button" src="./icons/notification.png" alt="notification-icon" className={styles.notification} />
      <img role="button" src="./avatar/avatar.svg" alt="avatar-icon" className={styles.avatar} />
      </div>
      <SubHeader/>
      
    </header>
  );
}
export default Header;
