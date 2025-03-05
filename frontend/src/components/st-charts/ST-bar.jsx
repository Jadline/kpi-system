import { scaleBand, scaleLinear , max, stack} from "d3";
import { useEffect, useRef, useState } from "react";
const MARGIN = {left : 30,top : 50,right : 30,bottom : 50}
const categories = ["air", "sea"];
const colors = { air: "#0096c7", sea: "#e9ecf1" };

function STBar({data,className}){
    const containerRef = useRef(null)
    const [dimensions,setDimensions] = useState({
        width : 700,
        height : 500
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
    const {width,height} = dimensions
    const boundsWidth = width - MARGIN.left - MARGIN.right
    const boundsHeight = height - MARGIN.top - MARGIN.bottom

    const groups = data.map((d) => d.name)

    const xScale = scaleBand()
                .domain(groups)
                .range([0,boundsWidth])
                .padding(0.3)
    const yScale = scaleLinear()
                  .domain([0,max(data,(d) => d.air + d.sea)])
                  .range([boundsHeight,0])
    const stackeddata = stack().keys(categories)(data)
    const shapes = stackeddata.map((category,i) => (
        category.map((d,j) => {
            const x = xScale(d.data.name)
            const y = yScale(d[1])
            const height = yScale(d[0]) - yScale(d[1])
            if(x === undefined) return null
            return(
                <g key={`${i} -${j}`}>
                    <rect
                    x={x}
                    y={y}
                    height={height}
                    width ={xScale.bandwidth()}
                    fill={colors[category.key]}
                    />
                    {/* <text
                    fontSize={12}
                    color ={'#000'}
                    x={x + xScale.bandwidth() /2}
                    y={y + height/2}
                    textAnchor={'middle'}
                    alignmentBaseline={'middle'}
                    >
                        {d[1] - d[0]}

                    </text> */}

                </g>
            )
        })
   
    ))
    const xLabels = groups.map((country,i) =>{
        const x = xScale(country)
        if(x === undefined) return null
        return(
            <g key={i}>
                <text
                x={x + xScale.bandwidth()/2 }
                y={boundsHeight + 15}
                color ={'#000'}
                textAnchor={'middle'}
                alignmentBaseline={'middle'}
                
                >
                    {country}
                </text>
                
            </g>
        )
    })
    const gridLines = yScale.ticks().map((value,i) => (
        <g key={i}>
            <line 
            x1={0}
            x2={boundsWidth}
            y1={yScale(value)}
            y2={yScale(value)}
            stroke={'#rgba(0,0,0,0.2)'}
            strokeWidth={1}
            />
            <text
            textAnchor={'middle'}
            alignmentBaseline={'middle'}
            x ={-10}
            y={yScale(value)}
            fontSize={12}
            color ={'#000'}
            >
                {value}
            </text>

        </g>
    ))
    return(
        <div
        ref={containerRef}
        style={{
            display :'flex',
            alignItems : 'center',
            justifyContent:'center',
            width :'100%',
            height : '100%',
            borderRadius : '1rem',
            boxShadow : '-0.2rem -0.2rem 1rem rgba(0,0,0,0.2)'

        }}
        className={className}
        >
            <svg
            width ='100%'
            height ='100%'
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="xMidYMid meet"
            >
                <text
                x={ width / 2 }
                y={20}
                textAnchor={'middle'}
                alignmentBaseline={'middle'}
                fontWeight={800}
                fontSize={14}
                >
                    Performance by country(Air vs Sea)
                </text>
                <g transform={`translate(${MARGIN.left},${MARGIN.top})`}>
                    {gridLines}
                    {shapes}
                    {xLabels}
                    <g>
                        <rect
                        width={15}
                        height={10}
                        x={boundsWidth - 40}
                        fill={'#0096c7'}
                        />
                        <text 
                        x={boundsWidth - 20}
                        y={8}
                        
                        >Air</text>
                        <rect
                        width={15}
                        height={10}
                        fill={'#e9ecf1'}
                        x ={boundsWidth - 40}
                         y={15}
                         fontWeight={600}
                        />
                        <text
                        y={25}
                        x ={boundsWidth - 20}
                        fontWeight ={600}
                        >Sea</text>
                    </g>
                </g>

            </svg>


        </div>
    )
}
export default STBar