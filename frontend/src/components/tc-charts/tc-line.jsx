import { line, max, scaleBand, scaleLinear } from "d3"
import { useRef, useState,useEffect } from "react"
import { useDimensions } from "../../reusable-components/useDimensions"
const MARGIN = {left : 30,top : 50,right : 30,bottom : 50}
function TCLine({className,data}){
   
    const {containerRef,width,height} = useDimensions(700,500)
   
    const boundsWidth = width - MARGIN.left - MARGIN.right
    const boundsHeight = height - MARGIN.top - MARGIN.bottom
    
    const groups = data?.map((d) => d.month)
    const xScale = scaleBand()
                   .domain(groups)
                   .range([0,boundsWidth])
    const yScale = scaleLinear()
                   .domain([0,max(data,(d) => Math.max(d.airCost,d.seaCost)) + 20  ])
                   .range([boundsHeight,0])
    const lineAirCost = line()
                       .x((d) => xScale(d.month) + xScale.bandwidth()/2)
                       .y((d) => yScale(d.airCost))  
    const LineSeaCost = line()
                        
                        .x((d) => xScale(d.month) + xScale.bandwidth()/2)
                        .y((d) => yScale(d.seaCost))  
    const gridLines = yScale.ticks().map((value,i) => (
        <g key={i}>
            <line
            x1 ={0}
            x2 ={boundsWidth}
            y1 ={yScale(value)}
            y2={yScale(value)}
            stroke={'#ccc'}
            strokeWidth={2}
            opacity ={0.4}
            />
            <text
            x={-18}
            textAnchor={'middle'}
            alignmentBaseline={'middle'}
            y={yScale(value)}
            fontSize={12}
            fill={'#000'}

            >
                {value}

            </text>

        </g>
    ))         
    const xLabels  = groups.map((month,i) => {
        const x = xScale(month)
        if(x === undefined) return null
        return(
            <text
            key ={i}
            alignmentBaseline={'middle'}
            textAnchor={'middle'}
            x ={x + xScale.bandwidth()/ 2}
            y={boundsHeight + 15}
            fontSize={14}
            fill={'#000'}
            >
                {month.slice(0,3)}

            </text>
        )
    })     
    const circlesAir = data.map((d,i) => (
        <circle key={`air-${i}`}
        cx={xScale(d.month) + xScale.bandwidth()/2}
        cy ={yScale(d.airCost)}
        r={4}
        stroke={'#0077b6'}
        fill='#0077b6'
        // strokeWidth={2}
        // fill={'#000'}
        />
    ))
    const cirlesSea = data.map((d,i) => (
        <circle
         key ={`sea-${i}`}
         cx={xScale(d.month) + xScale.bandwidth() / 2}
         cy ={yScale(d.seaCost)}
         stroke={'#ff9000'}
         fill='#ff9000'
       
         r={4}
        />
    ))
    
    return(
        <div
        ref={containerRef}
        className={className}
        style={{
            display : 'flex',
            alignItems : 'center',
            justifyContent : 'center',
            width : '100%',
            height : '100%',
            boxShadow : '-0.2rem -0.2rem 1rem rgba(0,0,0,0.2)',
            borderRadius : '1rem',
            minHeight : '400px'
        }}
        >
            <svg
            width ='100%'
            height = '100%'
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio = 'xMidYMid meet'
            >
                <text
                x ={width / 2 - 100}
                y ={30}
                fontSize={16}
                fontWeight={700}
                >
                    Cost per shipment over time
                </text>
                <g transform={`translate(${MARGIN.left + 30},${MARGIN.top})`}>
                    {gridLines}
                    <path
                    d={lineAirCost(data)}
                    stroke={'#0077b6'}
                    fill='none'
                    strokeWidth={2}

                    />
                    {circlesAir}
                    <path
                    d={LineSeaCost(data)}
                    stroke={'#ff9000'}
                    strokeWidth={2}
                    fill='none'
                    />
                    {cirlesSea}
                    {xLabels}

                </g>
                <text
                x ={width / 2 - 100}
                y ={boundsHeight + 90}
                fontSize={16}
                fontWeight={700}
                >
                    Months
                </text>
                <text
                x ={-160}
                y ={boundsHeight/2 + 5 }
                fontSize={16}
                fontWeight={700}
                transform={`rotate(-90,0,${boundsHeight/2 - 14})`}
                >
                    Cost per shipment(Air Vs Sea)
                </text>
                <rect
                    width ={15}
                    height ={10}
                    fill={'#ff7f0e'}
                    x={boundsWidth}
                    y ={15}
                    /
                    >
                    <text
                    x={boundsWidth + 20}
                    y={24}
                    >
                        Sea


                    </text>
                    <rect
                    x={boundsWidth }
                    y={28}
                    width={15}
                    height ={10}
                    fill ={'#1f77b4'}
                    />
                    <text
                    x={boundsWidth + 20}
                    y ={35}
                    >
                        Air
                    </text>
            </svg>
        </div>
    )
}
export default TCLine