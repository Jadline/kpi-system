import { arc, pie } from "d3"
import { useState,useRef, useEffect } from "react"
import { useDimensions } from "../../reusable-components/useDimensions";
const colors =['#5388d8','#f4be37']
const MARGIN = {left : 30,top : 50,right : 30,bottom : 50}
function NOSPie({data,className}){
 

    const {containerRef,width,height} = useDimensions()
    
    const boundsWidth = width - MARGIN.left - MARGIN.right
    const boundsHeight = height - MARGIN.top - MARGIN.bottom
    const no_shipmentsArc = arc()
                             .innerRadius(0)
                             .outerRadius(Math.min(width,height) / 2 - 60)
    const no_shipmentsPie = pie().value((d) => d.no_shipments)
    return(
        <div
        style={{
            display : 'flex',
            alignItems : 'center',
            justifyContent : 'center',
            borderRadius : '1rem',
            boxShadow : '-0.2rem -0.2rem 1rem rgba(0,0,0,0.2)'
        }}
        ref={containerRef}
        className={className}
        >
            <svg
            width='100%'
            height='100%'
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="xMidYMid meet"
            >
                <text
                x = {width / 2 - 130}
                y ={50}
                fontWeight ={700}
                fontSize={20}
                >
                    Number of Shipments (Air vs Sea)
                </text>
                <g transform ={`translate(${width/ 2},${height / 2 + 40})`}>
                {no_shipmentsPie(data).map((d,i) =>(
                    <path
                    key={i}
                    d={no_shipmentsArc(d)}
                    fill ={colors[i]}
                    />
                ))}
                <g>
                    <rect
                    fill={'#5388d8'}
                    width={15}
                    height={10}
                    x={420}
                    y= {-100}
                    />
                    <text
                    x={ 450}
                    y = {-90}
                    textAnchor={'middle'}
                    fontWeight ={500}
                    >
                        Air
                    </text>
                    <rect
                    x={420}
                    y={-70}
                    width={15}
                    height={10}
                    fill={'#f4be37'}
                    />
                    <text
                    x={450}
                    y ={-60}
                    textAnchor={'middle'}
                    fontWeight={500}
                    >
                        Sea
                    </text>
                </g>

                </g>
            </svg>
        </div>
    )
}
export default NOSPie