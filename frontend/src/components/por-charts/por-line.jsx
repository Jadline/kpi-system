import { line, max, scaleBand, scaleLinear } from "d3";
import { useRef,useState,useEffect } from "react";

// const width = 700;
// const height= 400;

const MARGIN = {top : 30,left : 50,bottom : 30,right : 50}



function PORLine({data,className}){
    const [dimensions,setDimensions] = useState({
        width : 700,
        height : 400
    })
    const containerRef = useRef(null)

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
    const {height ,width} = dimensions
    const boundsWidth = width - MARGIN.left - MARGIN.right
    const boundsHeight =height - MARGIN.top - MARGIN.bottom

    const groups = data.map((poritem) => poritem.month)

    const xScale =  scaleBand()
                    .domain(groups)
                    .range([0,boundsWidth])
    const yScale = scaleLinear()
                    .domain([0,max(data,(d) => d.por ) + 7])
                    .range([boundsHeight,0])
    const linePath = line()
                .x((d) => xScale(d.month))
                .y((d) => yScale(d.por))
    const gridLines = yScale.ticks().map((value,i) => (
        <g key={i}>
            <line
            x1 ={0}
            x2 ={boundsWidth}
            y1 ={yScale(value)}
            y2 ={yScale(value)}
            stroke ={'#ccc'}
            strokeWidth ={2}
            opacity={0.2}
            />
            <text
            textAnchor ={'end'}
            alignmentBaseline={'middle'}
            fontSize={12}
            color ={'#000'}
            x ={-10}
            y={yScale(value)}
            >
                {value}

            </text>
        </g>
    ))
    const xLabels = groups.map((month,i) => {
        const x = xScale(month)
        if(x === undefined) return
        return(
            <text 
            key={i}
            x = {x + xScale.bandwidth() / 2}
            y = {boundsHeight + 15}
            textAnchor={'middle'}
            alignmentBaseline ={'middle'}
            fontSize={12}
            >
                {month.slice(0,3)}
            </text>
        )
    })
    
    return (
        <div 
        style ={{
            display : 'flex',
            width:'100%',
            height : '100%',
            minHeight : '300px',
            borderRadius : '1rem',
             boxShadow: '-0.2rem -0.2rem 1rem rgba(0, 0, 0, 0.2)'
        }}
         className ={className}
         ref={containerRef}
        >
            <svg width='100%' height='100%' viewBox={`0 0 ${width} ${height}`} preserveAspectRatio='xMidyMid meet' >
                <rect width ={width} height={height} rx={10} fill={'#f8ffff'}/>
                <text
                x={boundsWidth - width / 2 -10}
                y ={30}
                fontSize ={16}
                color ={'#000'}
                fontWeight ={800}
                >
                    Perfect Order Rate 2024 %
                </text>
                <g transform={`translate(${MARGIN.left},${MARGIN.top})`}>
                {gridLines}
                <path
                d={line(data)}
                fill='none'
                stroke={'rgba(237, 161, 13,0.2)'}
                strokeWidth ={10}
                />
                <path 
                d={linePath(data)}
                fill ='none'
                stroke={'#eda10d'}
                strokeWidth ={3}
                />
                <g>
                    <rect
                    width={15}
                    height ={15}
                    x={boundsWidth -100}
                    y ={20}
                    fill={'#eda10d'}
                    />
                    <text
                    x ={boundsWidth - 80}
                    y={30}
                    fontSize ={14}
                    fill={'#000'}
                    fontWeight ={600}

                    >
                        por rate

                    </text>

                </g>
                <g>
                {xLabels}
                </g>
                
                </g>

            </svg>

        </div>
    )
}
export default PORLine