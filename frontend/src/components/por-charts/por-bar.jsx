import { max, scaleBand, scaleLinear, schemeCategory10 } from "d3";
import { useEffect, useState,useRef } from "react";
import styles from './por-bar.module.css'
import { useDimensions } from "../../reusable-components/useDimensions";
import { useResize } from "../../reusable-components/useResize";

// const width = 700;
// const height = 400;
const BAR_PADDING = 0.3

const MARGIN = {top : 30,left : 50,bottom : 30,right : 50}


const colors = ['#03045e','#023e8a','#0077b6','#0096c7','#00b4d8','#48cae4','#8aebff']

function PORBar({className,data}){
    const {containerRef,width,height} = useDimensions(700,500)
    const {isMobile,isTablet,isLaptop,isDesktop} = useResize()

    const boundsWidth = width - MARGIN.left - MARGIN.right
    const boundsHeight = height - MARGIN.top - MARGIN.bottom
    const groups = data.sort((a,b) => b.por - a.por).map((d) => d.country)

    const xScale = scaleLinear()
                   .domain([0,max(data,(d) => d.por)])
                   .range([0,boundsWidth])
    const yScale = scaleBand()
                   .domain(groups)
                   .range([0,boundsHeight])
                   .padding(BAR_PADDING)
    
    const bars = data.map((d,i) => {
        const y = yScale(d.country)
        if(y === undefined) return
        return(
            <g key={i}>
                <rect
                x={0}
                y={y}
                width={xScale(d.por)}
                height={yScale.bandwidth()}
                fill ={colors[i % colors.length]}
                />
                <text
                x={xScale(d.por - 6)}
                y={y + yScale.bandwidth() / 2 + 3}
                fill ={'#fff'}
                fontSize={12}
                className={styles.porvalue}
                >
                    {d.por}

                </text>
                <text
                x ={xScale(0) + 7}
                y ={y + yScale.bandwidth() / 2 + 3}
                fill= {'#fff'}
                fontSize ={12}
                className={styles.porvalue}
                >
                    {d.country}
                </text>
            </g>
        )
    })
    const gridLines = xScale.ticks().map((value,i) => (
        <g key={i}>
            <line
            x1 ={xScale(value)}
            x2={xScale(value)}
            y1 ={0}
            y2 ={boundsHeight}
            strokeWidth={2}
            stroke={'#000'}
            opacity ={0.2}
            />
            <text
            x={xScale(value)}
            y={boundsHeight + 15}
            fontSize={12}
            fill ={'#000'}
            >
                {value}
            </text>

        </g>
    ))
    
    return(
        <div
         className={className} 
        style={{
            width : '100%',
            height : '100%',
            display : 'flex',
            borderRadius : '1rem',
            
            boxShadow: '-0.2rem -0.2rem 1rem rgba(0, 0, 0, 0.2)'

        }}
        ref={containerRef}
        >
            <svg
            width ='100%'
            height ='100%'
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio='xMidYMid meet'
            >
                
                <text
                x={boundsWidth - width / 2 }
                y={isMobile ? 20 : 30}
                fontSize={18}
                fontWeight={800}
                fill={'000'}
                className={styles.portitle}
                >
                    Perfect Order Rate by Route
                </text>
                <g transform={`translate(${MARGIN.left},${MARGIN.top})`}>
                    {gridLines}
                    {bars}
                </g>

            </svg>
        </div>
    )
}
export default PORBar