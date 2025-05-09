import { groupSort, max, scaleBand, scaleLinear } from "d3";
import { useEffect, useRef, useState } from "react"
import { useDimensions } from "../../reusable-components/useDimensions";
const MARGIN = {left : 30,top : 50,right : 30,bottom : 50}
const colors = { air: "#1f77b4", sea: "#ff7f0e" };
const categories = ["air", "sea"];

function ADTBar({className,data}){
    const {containerRef,width,height} = useDimensions()
    
    const boundsWidth = width - MARGIN.left - MARGIN.right
    const boundsHeight = height - MARGIN.top - MARGIN.bottom
    const groups = data.map((d) => d.name)
    const xScale = scaleBand()
                  .domain(groups)
                  .range([0,boundsWidth]).padding(0.3)
    const xsubScale = scaleBand()
                     .domain(categories)
                     .range([0,xScale.bandwidth()]).padding(0.1)
    const yScale = scaleLinear()
                  .domain([0,max(data,(d) => Math.max(d.sea,d.air))])
                  .range([boundsHeight,0])
    const barShapes = data.flatMap((d,i) => (
        categories.map((category,j) => {
            const x = xScale(d.name) + xsubScale(category)
            const y = yScale(d[category])
            const barHeight = boundsHeight - y
            if(x === undefined) return null

            return(
                <g key ={`${i} - ${j}`}>
                    <rect
                    x={x}
                    y ={y}
                    width={xsubScale.bandwidth()}
                    height ={barHeight}
                    fill={colors[category]}
                    />

                </g>
            )
        })
    ) )
    const gridlines = yScale.ticks().map((value,i) => (
        <g key={i}>
            <line 
            x1={0}
            x2={boundsWidth}
            y1={yScale(value)}
            y2={yScale(value)}
            
            stroke={'#ccc'}
            opacity ={0.4}
            strokeWidth={2}
            />
            <text
            x={-15}
            y={yScale(value)}
            textAnchor={'middle'}
            alignmentBaseline={'middle'}
            fontSize={12}

            >
                {value}
                
            </text>
        </g>
    ))
    const xLabels = groups.map((country,i) => {
        const x = xScale(country)
        if(x===undefined) return null 
        return(
            <text
            key={i}
            x={x + xScale.bandwidth() / 2}
            y ={boundsHeight + 10}
            textAnchor={'middle'}
            alignmentBaseline={'middle'}
            fontSize={12}
            >
                 {country.includes(" ") ? country.split(" ").map((word, index) => (
    <tspan key={index} x={x + xScale.bandwidth() / 2} dy={index * 12}>
      {word}
    </tspan>
  )) : country}

            </text>
        )
    })
    return(
        <div
        className={className}
        ref={containerRef}
        style={{
            display : 'flex',
            alignItems : 'center',
            justifyContent : 'center',
            minHeight : '400px',
            boxShadow : '-0.2rem -0.2rem 1rem rgba(0,0,0,0.2)',
            borderRadius : '1rem',
            width : '100%',
            height : '100%'

        }}
        >
            <svg
            width='100%'
            height ='100%'
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio={'xMidYMid meet'}
            >
                <text
                x={width / 2 - 130}
                y={25}
                fontSize={18}
                fontWeight ={700}
                >
                    Average Delivery Time by Route
                </text>
                <g transform={`translate(${MARGIN.left + 20},${MARGIN.top})`}>
                    {gridlines}
                    {barShapes}
                    {xLabels}

                </g>
                <text
                x ={-90}
                y ={boundsHeight/2 + 5 }
                fontSize={16}
                fontWeight={700}
                transform={`rotate(-90,0,${boundsHeight/2 - 14})`}
                >
                    Days
                </text>
                <text
                x ={width / 2 - 100}
                y ={boundsHeight + 90}
                fontSize={16}
                fontWeight={700}
                >
                   Delivery Routes
                </text>

            </svg>

        </div>
    )
}
export default ADTBar