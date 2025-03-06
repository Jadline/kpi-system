import { useEffect,useState,useRef } from "react"
export function useDimensions(defaultWidth = 700,defaultHeight = 400){
    const containerRef = useRef(null)
        const [dimensions,setDimensions] = useState({
            width : defaultWidth,
            height : defaultHeight
        })
        useEffect(() => {
            function updateSize(){
                if(containerRef.current){
                    setDimensions({
                        width : containerRef.current.clientWidth,
                        height : containerRef.current.clientHeight
                    })
                }
            }
            updateSize()
            window.addEventListener('resize',updateSize)
            return () => {
                window.removeEventListener('resize',updateSize)
            }
        },[])
    return {containerRef,width : dimensions.width,height : dimensions.height}
}
