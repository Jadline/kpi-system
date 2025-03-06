import { useUI } from '../../context/UI-Context';
import styles from './Logo.module.css'
import { useState,useEffect } from 'react';
function Logo({className}){
        const {opensidebar,setOpenSidebar} = useUI()
    
        const [isMobile, setIsMobile] = useState(window.innerWidth <= 481);
    
        useEffect(() => {
            const handleResize = () => {
                setIsMobile(window.innerWidth <= 481);
            };
    
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }, []);
    return(
        <div className={`${styles.logoContainer} ${className}`}>
            {!opensidebar ? 
            <img src="./logo/rolling-cargo.png" alt=""  className={isMobile && `${styles.onMobile}` } /> :
             <img 
                  src="./icons/list.png" 
                  alt=""
                  className={`${styles.menubar}`} 
                  role='button' 
                  
                  onClick={() => setOpenSidebar(!opensidebar)}
                  /> 
            }
            {!opensidebar && <h2>Rolling Cargo Shipping Company</h2>}
        </div>

    )
}
export default Logo