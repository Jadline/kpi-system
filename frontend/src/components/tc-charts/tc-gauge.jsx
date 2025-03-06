import { arc,scaleLinear} from "d3"
import { useRef,useEffect,useState } from "react"
import { useDimensions } from "../../reusable-components/useDimensions"

function Gauge({totalCost,budget,className}){
   const {containerRef,width,height} = useDimensions()
    
    const startAngle = -Math.PI / 2
    const endAngle = Math.PI / 2
    const budgetbands = [
        {
            range : [0,70],
            color : 'green'
        },
        {
            range : [70,90],
            color : 'yellow'
        },
        {
            range : [90,100],
            color : 'red'
        }]
    const angleScale = scaleLinear()
                      .domain([0,100])
                      .range([startAngle,endAngle])
    const budgetArc = arc()
                    .innerRadius(Math.min(width , height) / 3.5)
                    .outerRadius(Math.min(width,height) / 2 - 20)
                    .startAngle(startAngle)
                    .endAngle(endAngle)
    
    
      
         return(
        <div
        className={className}
        ref={containerRef}
        style={{
            display : 'flex',
            alignItems : 'center',
            justifyContent : 'center',
            boxShadow : '-0.2rem -0.2rem 1rem rgba(0,0,0,0.2)',
            borderRadius : '1rem',
            minHeight : '400px',
            width : '100%',
            height : '100%'
        }}
        >
            <svg
            width ='100%'
            height ='100%'
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="xMidYMid meet"
            >
                <text
                x={width / 2}
                y={25}
                textAnchor={'middle'}
                alignmentBaseline={'middle'}
                fontWeight={700}
                fontSize={16}
                >
                    Transportation cost utilization

                </text>
                <g transform={`translate(${width / 2},${height  * 0.65})`}>
                {budgetbands.map(({range,color} ,i) => {
                    const bandArc = arc()
                                    .innerRadius(Math.min(width,height) / 3.5)
                                    .outerRadius(Math.min(width,height) / 2 - 20)
                                    .startAngle(angleScale(range[0]))
                                    .endAngle(angleScale(range[1]))
                    return(
                        <path
                        key={i}
                        d={bandArc()}
                        fill={color}
                        />
                    )
                })}
                
                </g>

            </svg>


        </div>
    )
}
export default Gauge
