import { curveBasis, line, max, scaleBand, scaleLinear } from "d3"
import {useEffect,useState,useRef} from 'react'
import { useDimensions } from "../../reusable-components/useDimensions"
const MARGIN = {left : 30,top : 50,right : 30,bottom : 50}
function STLine({data,className}){
    const {containerRef,width,height} = useDimensions(700,500)
   
    const groups = data.map((d) => d.month)

   
   
    const boundsWidth = width - MARGIN.left - MARGIN.right
    const boundsHeight = height - MARGIN.top - MARGIN.bottom
    const xScale = scaleBand()
                  .domain(groups)
                  .range([0,boundsWidth])
    const yScale = scaleLinear()
                  .domain([0,max(data,(d)=> Math.max(d.air,d.sea))])
                  .range([boundsHeight,0])
    const lineAir = line()
                    .x((d) => xScale(d.month))
                    .y((d) => yScale(d.air))
                    .curve(curveBasis)
    const lineSea = line()
                    .x((d) => xScale(d.month))
                    .y((d) => yScale(d.sea))
                    .curve(curveBasis)
    const gridLines = yScale.ticks().map((value,i) => (
        <g key={i}>
            <line
            x1 ={0}
            x2 ={boundsWidth}
            y1={yScale(value)}
            y2={yScale(value)}
            stroke={'#ccc'}
            strokeWidth ={2}
            opacity ={0.4}
    
            />
            <text
            textAnchor={'end'}
            alignmentBaseline={'middle'}
            x={-10}
            y={yScale(value)}
            fontSize ={12} 

            >
                {value}

            </text>
        </g>
    ))
    const xLabels = groups.map((month,i) => {
        const x = xScale(month)
        if(x === undefined) return
        return(
            <g key={i}>
                <text
                x={x + xScale.bandwidth() / 2}
                y={boundsHeight + 15}
                textAnchor={'middle'}
                alignmentBaseline={'middle'}
                >
                    {month.slice(0,3)}
                </text>

            </g>
        )
    })
    

    return (
        <div
        ref={containerRef}
        style={{
            display : 'flex',
            width  :'100%',
            height : '100%',
            borderRadius : '1rem',
        
            boxShadow : '-0.4rem -0.4rem 1rem rgba(0,0,0,0.2)'
        }}
        className={className}
        >
           
          
            <svg
            width='100%'
            height ='100%'
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio='xMidYMid meet'
            >
                 <rect width={width} height={height} rx={10} fill={'#f8ffff'}/>
                  <text 
            x={width / 2 -10}
            y={20}
            textAnchor={'middle'}
            alignmentBaseline={'middle'}
            fontSize ={16}
            fontWeight ={800}
            >
                Monthly Shipping Time 2024
            </text>
                <g transform={`translate(${MARGIN.left + 20},${MARGIN.top})`}>
                    {gridLines}
                    <path
                    d={lineAir(data)}
                    fill='none'
                    stroke={'rgba(0, 150, 199,0.2)'}
                    strokeWidth={10}
                    strokeLinecap='round'
                    />
                    <path
                    d={lineAir(data)}
                    fill='none'
                    stroke={'rgb(0, 150, 199)'}
                    strokeWidth={3}
                    strokeLinecap='round'
                    />
                    <path
                    d={lineSea(data)}
                    fill='none'
                    stroke={'#fb896b'}
                    strokeWidth={3}
                    strokeLinecap='round'
                    />
                    
                    <path
                    d={lineSea(data)}
                    fill='none'
                    stroke={'rgba(251, 137, 107,0.2)'}
                    strokeWidth={10}
                    strokeLinecap='round'
                    />
                    <g>
                        <rect
                        width={15}
                        height={15}
                        x={boundsWidth - 160}
                        y={2}
                        fill={'rgb(0, 150, 199)'}
                        />
                        <text
                        x={boundsWidth - 80}
                        y ={9}
                        textAnchor={'middle'}
                        alignmentBaseline={'middle'}
                        fontWeight ={700}
                        fontSize={14}
                        >
                            Shipping by Air
                        </text>
                        <rect
                        width={15}
                        height ={15}
                        x={boundsWidth - 160}
                        y = {25}
                        fill={'#fb896b'}
                        />
                        <text
                        x={boundsWidth - 80}
                        y ={35}
                        fontWeight={600}
                        fontSize={14}
                        textAnchor={'middle'}
                        alignmentBaseline={'middle'}
                        >
                            Shipping by Sea
                        </text>
                    </g>
                    {xLabels}
                </g>
                <text
                x ={-90}
                y ={boundsHeight/2 +5}
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
                  Months
                </text>
                    

            </svg>
        </div>
    )
}
export default STLine