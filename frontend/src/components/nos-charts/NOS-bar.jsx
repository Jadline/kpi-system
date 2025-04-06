import { geoBounds, max, scaleBand, scaleLinear } from "d3";
import styles from './NOS-bar.module.css'
import { useState ,useEffect, useRef} from "react"
import { useDimensions } from "../../reusable-components/useDimensions";
const MARGIN = {left : 30,top : 50,right : 30,bottom : 50}
const categories = ["air", "sea"];
const colors = { air: "#1f77b4", sea: "#ff7f0e" };
function NOSBar({data,className}){
    const {containerRef,width,height} = useDimensions(700,500)
   
    const[isMobile,setIsMobile] = useState(window.innerWidth <=481)
    
    useEffect(() => {
       function handleResize(){
        setIsMobile(window.innerWidth <= 481)
       }
       handleResize()
       window.addEventListener('resize',handleResize)
       return() => {
        window.removeEventListener('resize',handleResize)
       }
    },[])
    

   
    const boundsWidth = width - MARGIN.left - MARGIN.right
    const boundsHeight = height - MARGIN.top - MARGIN.bottom
    const groups = data.map((d) => d.name)
    const xScale = scaleBand()
                  .domain(groups)
                  .range([0,boundsWidth])
                  .padding(0.3)
    const xsubScale = scaleBand()
                     .domain(categories)
                     .range([0,xScale.bandwidth()])
                     .padding(0.1)
    const yScale = scaleLinear()
                   .domain([0,max(data,(d) => Math.max(d.air,d.sea))])
                   .range([boundsHeight,0])
    const barshapes = data.flatMap((d,i) =>
        categories.map((category,j) => {
            const x = xScale(d.name) + xsubScale(category)
            const y = yScale(d[category])
            const barHeight = boundsHeight - y
            if(x === undefined) return null
            return (
                <g key={`${i} -${j}`}>
                    <rect
                    x ={x}
                    y={y}
                    width ={xsubScale.bandwidth()}
                    height ={barHeight}
                    fill ={colors[category]}
                    rx={4}
                    // rx={xsubScale.bandwidth()/3}
                   
                    />

                </g>
            )
        })
    )
    const gridlines = yScale.ticks().map((value,i) => (
        <g key={i}>
            <line
            x1 ={0}
            x2 ={boundsWidth}
            y1={yScale(value)}
            y2={yScale(value)}
            stroke={'#ccc'}
            />
            <text
            x={-20}
            y={yScale(value)}
            fontSize={12}
            color ={'#000'}
            className={styles.barYlabels}
            
            >
                {value}
            </text>

        </g>
    ))
    const xLabels = groups.map((country,i) => (
        <text
        key={i}
        x={xScale(country) + xScale.bandwidth() / 27 }
        y={boundsHeight + 18}
        color ={'#000'}
        fontSize ={12}
        fontWeight={600}
        
        >
            {country}
        </text>
    ))
    return(
        <div
        className={className}
        ref={containerRef}
        style={{
            display : 'flex',
            width : '100%',
            height : '100%',
            alignItems : 'center',
            justifyContent : 'center',
            borderRadius : '1rem',
            boxShadow : '-0.2rem -0.2rem 1rem rgba(0,0,0,0.2)'
        }}
        >
            <svg
            width ='100%'
            height ='100%'
            viewBox ={`0 0 ${width} ${height}`}
            preserveAspectRatio = 'xMidYMid meet'
            >
                <text
                x={width / 2 - 100}
                y={25}
                fontSize={18}
                fontWeight ={700}
                >
                    Number of Shipments by Country
                </text>
                <g transform={`translate(${MARGIN.left + 20},${MARGIN.top})`}>
                    {gridlines}
                    {barshapes}
                    <g>
                    <rect
                    width ={15}
                    height ={10}
                    fill={'#ff7f0e'}
                    x={boundsWidth - 70}
                    y ={15}
                    /
                    >
                    <text
                    x={boundsWidth - 50}
                    y={24}
                    >
                        Sea


                    </text>
                    <rect
                    x={boundsWidth - 70}
                    y={28}
                    width={15}
                    height ={10}
                    fill ={'#1f77b4'}
                    />
                    <text
                    x={boundsWidth - 50}
                    y ={35}
                    >
                        Air
                    </text>
                    </g>
                    <text
                x ={-70}
                y ={boundsHeight/2 - 40}
                fontSize={16}
                fontWeight={700}
                transform={`rotate(-90,0,${boundsHeight/2 - 14})`}
                >
                    Number of shipments
                </text>
                <text
                x ={width / 2 - 100}
                y ={boundsHeight + 35}
                fontSize={16}
                fontWeight={700}
                >
                   Shipment Routes
                </text>
                    

                   
                    {xLabels}
                </g>

            </svg>

        </div>
    )
}
export default NOSBar
