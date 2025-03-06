import { useState,useEffect } from "react"
export function useResize(){
    const [screensize,setScreensize] = useState({
        isMobile : window.innerWidth <= 480,
        isTablet : window.innerWidth > 480  &&  window.innerWidth <= 768,
        isLaptop : window.innerWidth > 768 && window.innerWidth <= 1024,
        isDesktop : window.innerWidth > 1024 
    })
    useEffect(() => {
        function handleResize(){
            setScreensize({
                isMobile : window.innerWidth <= 480,
                isTablet : window.innerWidth > 480 && window.innerWidth <= 768,
                isLaptop : window.innerWidth > 768 && window.innerWidth <=1024,
                isDesktop : window.innerWidth > 1024
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