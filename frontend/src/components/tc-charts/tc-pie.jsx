import { arc, pie } from "d3"
import { useDimensions } from "../../reusable-components/useDimensions"
import { useEffect, useRef, useState } from "react"
const colors =['#00b4d8','#ff9000']


function TCPie({className,data}){
    const {containerRef,width,height} = useDimensions()
   
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
            minHeight : '400px',
            maxHeight : '400px',
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
                x ={width / 2 -60}
                y ={30}
                fontSize={16}
                fontWeight={700}
                >
                    Total Cost (Air vs Sea)
                </text>
                <g transform={`translate(${width / 2},${height /2 + 20})`}>
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
                <g>
                    <rect
                    width ={15}
                    height ={10}
                    fill={'#ff7f0e'}
                    x={20}
                    y ={15}
                    /
                    >
                    <text
                    x={37}
                    y={24}
                    >
                        Sea


                    </text>
                    <rect
                    x={20}
                    y={28}
                    width={15}
                    height ={10}
                    fill ={'#1f77b4'}
                    />
                    <text
                    x={37}
                    y ={35}
                    >
                        Air
                    </text>
                    </g>

            </svg>
        </div>
    )
}
export default TCPie