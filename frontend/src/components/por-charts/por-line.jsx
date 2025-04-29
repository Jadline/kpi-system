import { line, max, scaleBand, scaleLinear } from "d3";
import { useRef, useState, useEffect, useMemo } from "react";
import styles from './por-line.module.css'
import { FaEllipsisH } from "react-icons/fa";
import usePOR from "../../reusable-components/usePOR";
import { useDashboard } from "../../context/state-Context";




const MARGIN = { top: 30, left: 50, bottom: 30, right: 50 };

function PORLine({ data, className }) {
  

  const {filters} = useDashboard()
  

  const [dimensions, setDimensions] = useState({
    width: 700,
    height: 500,
  });
  const [isMobile,setIsMobile] = useState(window.innerWidth <= 481)
  useEffect(() => {
    function handleResize(){
      setIsMobile(window.innerWidth <=480)
    }
    handleResize()
    window.addEventListener('resize',handleResize)
    return() => {
      window.removeEventListener('resize',handleResize)
    }
  },[])
  const containerRef = useRef(null);
  const timeoutidRef = useRef(null);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };

    const handleResize = () => {
      clearTimeout(timeoutidRef.current);
      timeoutidRef.current = setTimeout(updateSize, 200);
    };

    updateSize(); 
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutidRef.current);
    };
  }, []);

  const { width, height } = dimensions;
  const boundsWidth = width - MARGIN.left - MARGIN.right;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  const groups = data.map((poritem) => poritem.month);

  const xScale = useMemo(() => (
    scaleBand()
      .domain(groups)
      .range([0, boundsWidth]).padding(0.1)
  ), [groups, boundsWidth]);

  const yScale = useMemo(() => (
    scaleLinear()
      .domain([0, max(data, (d) => d.por) + 7])
      .range([boundsHeight, 0])
  ), [data, boundsHeight]);

  const linePath = useMemo(() => (
    line()
      .x((d) => xScale(d.month))
      .y((d) => yScale(d.por))
  ), [xScale, yScale]);

  const gridLines = yScale.ticks().map((value, i) => (
    <g key={i}>
      <line
        x1={0}
        x2={boundsWidth}
        y1={yScale(value)}
        y2={yScale(value)}
        stroke="#ccc"
        strokeWidth={2}
        opacity={0.2}
      />
      <text
        textAnchor="end"
        alignmentBaseline="middle"
        fontSize={12}
        fill="#000"
        x={-10}
        y={yScale(value)}
      >
        {value}
      </text>
    </g>
  ));

  const xLabels = groups.map((month, i) => {
    const x = xScale(month);
    if (x === undefined) return null;
    return (
      <text
        key={i}
        x={x + xScale.bandwidth() / 2}
        y={boundsHeight + 15}
        textAnchor="middle"
        alignmentBaseline="middle"
        fontSize={12}
        className={styles.pormonth}
        
      >
        {month.slice(0, 3)}
      </text>
    );
  });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        minWidth: '300px',
        minHeight: '300px',
        borderRadius: '1rem',
        boxShadow: '-0.2rem -0.2rem 1rem rgba(0, 0, 0, 0.2)',
      }}
      className={className}
      ref={containerRef}
    >
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
      >
       
        <text
          x={boundsWidth - width / 2 }
          y={27}
          fontSize={16}
          fill="#000"
          fontWeight={800}
          className={styles.portitle}
        >
          Perfect Order Rate (%) {filters.perfectorders?.year} 
        </text>

        
        <g transform={`translate(${MARGIN.left},${MARGIN.top})`}>
          {gridLines}
          <path
            d={linePath(data)}
            fill="none"
            stroke="rgba(237, 161, 13, 0.2)"
            strokeWidth={10}
          />
          <path
            d={linePath(data)}
            fill="none"
            stroke="#eda10d"
            strokeWidth={3}
          />
          <g>
            <rect
              width={15}
              height={15}
              x={isMobile ? boundsWidth - 80 : boundsWidth - 40}
              dy={-3}
              fill="#eda10d"
            />
            <text
              x={isMobile ? boundsWidth - 60 : boundsWidth - 20}
              y={10}
              fontSize={14}
              fill="#000"
              fontWeight={600}
            >
              por rate
            </text>
          </g>
          <g>{xLabels}</g>
        </g>
      </svg>
    </div>
  );
}

export default PORLine;