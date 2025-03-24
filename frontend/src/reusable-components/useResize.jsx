import { useState,useEffect } from "react"
export function useResize(){
    const [screensize,setScreensize] = useState({
        isMobile : window.innerWidth <= 480.98,
        isTablet : window.innerWidth > 481  &&  window.innerWidth <= 768.98,
        isLaptop : window.innerWidth > 769 && window.innerWidth <= 1024.98,
        isDesktop : window.innerWidth > 1025 
    })
    useEffect(() => {
        function handleResize(){
            setScreensize({
                isMobile : window.innerWidth <= 480.98,
                isTablet : window.innerWidth > 481 && window.innerWidth <= 768.98,
                isLaptop : window.innerWidth > 769 && window.innerWidth <=1024.98,
                isDesktop : window.innerWidth > 1025
            })
        }
        handleResize()
        window.addEventListener('resize',handleResize)
        return () => {
            window.removeEventListener('resize',handleResize)
        }
    },[])
    return screensize
        
}