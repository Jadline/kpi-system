import { useEffect, useRef, useState } from "react"
const MARGIN = {left : 30,top : 50,right : 30,bottom : 50}
function AirGauge({className,avg_deliverytime,goal}){
    const containerRef = useRef(null)
    const [dimensions,setDimensions] = useState({
        width : 700,
        height : 400
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
        return() => {
            window.removeEventListener('resize',updateSize)
        }

        
    },[])
    const {height,width} = dimensions
    const boundsWidth = width - MARGIN.left - MARGIN.right
    const boundsHeight = height - MARGIN.top - MARGIN.bottom
    


    return(
        <div>air gauge</div>
    )
}
export default AirGauge