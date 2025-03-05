import { arc, pie, scaleOrdinal } from "d3";
import { useRef, useState,useEffect } from "react";
import styles from './por-donut.module.css'

// const width = 700;
// const height= 400;

const MARGIN = {top : 30,left : 50,bottom : 30,right : 50}
// const boundsWidth = width - MARGIN.left - MARGIN.right
// const boundsHeight =height - MARGIN.top - MARGIN.bottom
const colors = ['#03045e','#0077b6','#00b4d8']
function PORDonut({data,className}){
    const containerRef = useRef(null)
    const[dimensions,setDimensions] = useState({
        width : 700,
        height : 400
    })
    const [isMobile,setIsMobile] = useState(window.innerWidth <= 480)
    
    useEffect(() => {
        function handleResize(){
            setIsMobile(window.innerWidth <= 481)
        }
        handleResize()
        window.addEventListener('resize',handleResize)
        return ()  => {
            window.removeEventListener('resize',handleResize)
        }
    },[])

    useEffect(()=> {
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
        return() => window.removeEventListener('resize',updateSize)
    },[])
    const {height,width} = dimensions
    const radius = Math.min(width,height)/2 -40
    const boundsWidth = width - MARGIN.left - MARGIN.right
    const boundsHeight =height - MARGIN.top - MARGIN.bottom
    const porArc = arc()
                  .innerRadius(radius * 0.6)
                  .outerRadius(radius)
    const porPie = pie().value((d) => d.value)
    
    return(
        <div 
        ref={containerRef}
        className={className} style={{
            width: '100%',
            height : '100%',
            display : 'flex',
            justifyContent:'center',
            alignItems :'center',
            borderRadius : '1rem',
            boxShadow: '-0.2rem -0.2rem 1rem rgba(0, 0, 0, 0.2)'
            
        }}>
            <svg
            width = '100%'
            height = '100%'
            viewBox ={`0 0 ${width} ${height}`}
            preserveAspectRatio="xMidYMid meet"
            
        
            >
            <rect 
            rx={10}
            width ={width}
            height={height}
            fill='#f8ffff'
            />
            <text
            x={boundsWidth - width / 2 +20}
            y={25}
            fontWeight ={800}
            fontSize={16}
            className={styles.ordersummary}
            >
                Order summary
            </text>
            <g transform={`translate(${width / 2}, ${height / 2 + 30})`}>
                {porPie(data).map((d,i) => (
                    <path
                     key={i}
                     d={porArc(d)}
                     fill ={colors[i] ||'#fff'}

                    />
                ))}
                
            </g>
            <g>
                <rect
                width={15}
                height={15}
                x={10}
                y={32}
                fill={'#0077b6'}
                rx={2}
                />
                <text
                textAnchor={'middle'}
                alignmentBaseline={'middle'}
                x={isMobile ? 73 : 82}
                y={40}
                fontWeight={800}
                fontSize={12}
                className={styles.ordertitle}
                >
                    untimely deliveries
                </text>
                <rect
                width={15}
                height={15}
                x={isMobile ? boundsWidth - width / 2 + 60 : boundsWidth - width / 2 + 47}
                y={32}
                fill={'#00b4d8'}
                rx={2}
                />
                <text
                textAnchor={'middle'}
                alignmentBaseline={'middle'}
                x={isMobile ? boundsWidth - width / 2 + 118 : boundsWidth - width / 2 + 110}
                y={40}
                fontWeight={800}
                fontSize={12}
                className={styles.ordertitle}
                >
                    complete orders
                </text>
                <rect
                width={15}
                height={15}
                x={boundsWidth - width / 2 + 165}
                y={32}
                fill={'#03045e'}
                rx={2}
                />
                <text
                textAnchor={'middle'}
                alignmentBaseline={'middle'}
                x={isMobile ? boundsWidth - width / 2 + 221 : boundsWidth - width / 2 + 230}
                y={40}
                fontWeight={800}
                fontSize={12}
                className={styles.ordertitle}
                >
                    timely deliveries
                </text>
            </g>

            </svg>

        </div>
    )
}
export default PORDonut