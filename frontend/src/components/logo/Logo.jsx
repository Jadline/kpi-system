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
        <div className={`${styles.logoContainer} ${className} ${opensidebar && styles.shrinkedlogo}`}>
           
            <img 
            src="./logo/rolling-cargo.png" alt=""  
            className={`${isMobile ? styles.onMobile : ''} ${opensidebar ? styles.menubar : ''}`} /> 
           
           {!opensidebar && <h2><span>Rolling Cargo</span><span>Shipping Company</span> </h2>}
        </div>

    )
}
export default Logo