import { area, curveBasis, curveMonotoneX, max, scaleBand, scaleLinear } from "d3"
import { useEffect, useRef, useState } from "react"
const MARGIN = {left : 30,top : 50,right : 30,bottom : 50}
function ADTArea({className,data}){
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
        return () => {
            window.removeEventListener('resize',updateSize)
        }
    },[])
    const {width,height} = dimensions
    const boundsWidth = width - MARGIN.left - MARGIN.right
    const boundsHeight = height - MARGIN.top - MARGIN.bottom

    const groups = data.map((d) => d.month)

    const xScale = scaleBand()
                  .domain(groups)
                  .range([0,boundsWidth])
    const yScale = scaleLinear()
                   .domain([0,max(data,(d) => Math.max(d.air,d.sea)) + 10])
                   .range([boundsHeight,0])
    const airArea = area()
                    .x((d) => xScale(d.month) + xScale.bandwidth()/ 2)
                    .y0(boundsHeight)
                    .y1((d) => yScale(d.air)).curve(curveMonotoneX)
    const seaArea = area()
                    .x((d) => xScale(d.month) + xScale.bandwidth() / 2)
                    .y0(boundsHeight)
                    .y1((d) => yScale(d.sea))
                    .curve(curveMonotoneX)
    const gridlines = yScale.ticks().map((value,i) => (
        <g key={i}>
            <line
            x1={0}
            x2={boundsWidth}
            y1={yScale(value)}
            y2={yScale(value)}
            stroke={'#ccc'}
            strokeWidth={2}
            opacity ={0.4}
            />
            <text
            x={-15}
            y={yScale(value)}
            fontSize={12}
            textAnchor={'middle'}
            alignmentBaseline={'middle'}
            >
                {value}

            </text>

        </g>
    ))
    const xLabels = groups.map((month,i) => {
        const x = xScale(month)
        if(x === undefined) return null 
        return (
            <text 
            key={i}
            x={x + xScale.bandwidth() / 2}
            y={boundsHeight + 15}
            textAnchor={'middle'}
            alignmentBaseline={'middle'}
            fontSize={12}
            >
                {month.slice(0,3)}
    
            </text>
        )
    })
    const circlesAir = data.map((d,i) => (
        <circle
        key={`air-${i}`}
        cx={xScale(d.month) + xScale.bandwidth()/ 2}
        cy={yScale(d.air)}
        r={4}
        fill='#3960d1'
        />
    ))
    const circlesSea = data.map((d,i) => (
        <circle
         key={`sea-${i}`}
         cx = {xScale(d.month) + xScale.bandwidth() / 2}
         cy={yScale(d.sea)}
         r={4}
         fill='#00a651'
        />
    ))
    
    return(
        <div
        className={className}
        ref={containerRef}
        style={{
            display : 'flex',
            alignItems : 'center',
            justifyContent : 'center',
            width : '100%',
            height : '100%',
            borderRadius : '1rem',
            boxShadow : '-0.2rem -0.2rem 1rem rgba(0,0,0,0.2)',
            minHeight : '400px'

        }}

        >
            <svg
            width ='100%'
            height='100%'
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio='xMidYMid meet'
            >
                <g transform={`translate(${MARGIN.left},${MARGIN.top})`}>
                    {gridlines}
                    <path
                     d = {airArea(data)}
                     fill={"#3960d1"}
                     fillOpacity={0.3}
                     />
                     {circlesAir}
                     <path
                     d={seaArea(data)}
                     fill={'#00a651'}
                     fillOpacity ={0.3}
                      />
                      {circlesSea}
                     {xLabels}
                </g>
            </svg>

        </div>
    )
}
export default ADTArea