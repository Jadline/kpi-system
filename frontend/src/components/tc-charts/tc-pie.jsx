import { arc, pie } from "d3"
import { useEffect, useRef, useState } from "react"
const colors =['#00b4d8','#ff9000']

function TCPie({className,data}){
    const containerRef = useRef(null)
    const[dimensions,setDimensions] = useState({
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
    const transportationArc = arc().innerRadius(0).outerRadius(Math.min(width,height) / 2 - 22)
    const transportationPie = pie().value((d) => d.average_cost)


    return(
        <div
        ref={containerRef}
        className ={className}
        style={{
            display : 'flex',
            width : '100%',
            height : '100%',
            alignItems : 'center',
            justifyContent : 'center',
            borderRadius : '1rem',
            boxShadow : '-0.2rem -0.2rem 1rem  rgba(0,0,0,0.2)'
        }}
        >
            <svg
             width ='100%'
             height ='100%'
             viewBox={`0 0 ${width} ${height}`}
             preserveAspectRatio = 'xMidYMid meet'
            >
                <text
                x ={width / 2 - 100}
                y ={30}
                fontSize={16}
                fontWeight={700}
                >
                    Total Cost (Air vs Sea)
                </text>
                <g transform={`translate(${width / 2},${height /2})`}>
                 { transportationPie(data).map((d,i) => {
                    const [x,y] = transportationArc.centroid(d)
                    return (
                       <g key={i}>
                         <path
                        d={transportationArc(d)}
                        fill={colors[i]}
                        />

                       </g>
                     )
                 })}

                </g>

            </svg>
        </div>
    )
}
export default TCPie