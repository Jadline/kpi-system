import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { useDimensions } from "../../reusable-components/useDimensions";

const MARGIN = { left: 30, top: 30, right: 30, bottom: 30 };

function GaugeChart({ avg_deliverytime, goal, className }) {
  const { containerRef, width, height } = useDimensions();

  const size = Math.min(width, height); 
  const bounds = size - MARGIN.left - MARGIN.right;  
  const radius = bounds / 2.2;  
  const arcWidth = radius * 0.25; 
  const startAngle = -Math.PI / 2; 
  const endAngle = Math.PI * 1.5;  
  const percentage = avg_deliverytime / goal;
  const filledAngle = startAngle + percentage * (endAngle - startAngle); 

 
  const arc = d3.arc()
    .innerRadius(radius - arcWidth)
    .outerRadius(radius)
    .startAngle(startAngle)
    .endAngle(endAngle);

  
  const progressArc = d3.arc()
    .innerRadius(radius - arcWidth)
    .outerRadius(radius)
    .startAngle(startAngle)
    .endAngle(filledAngle);

  return (
    <div
      className={className}
      ref={containerRef}
      style={{
        width: "100%",
        textAlign: "center",
         boxShadow : '-0.2rem -0.2rem 1rem rgba(0,0,0,0.2)',
         borderRadius : '1rem',
         display : 'flex',
         alignItems : 'center',
         justifyContent : 'center'
      }}
    >
        {/* <h3 style={{ fontSize: "20px", fontWeight: "bold", color: "#333",textAlign : 'center',display : 'flex'}}>
         title
        </h3> */}
       
       
      <svg
        width="100%"
        height={size}
        viewBox={`0 0 ${size} ${size}`} 
        
        preserveAspectRatio="xMidYMid meet"
      >
      
        
        <g transform={`translate(${size / 2}, ${size / 2})`}> 
        
         
          <path d={arc()} fill="#ff7f0e" />
          
          <path d={progressArc()} fill="#007bff" />
         
          <text textAnchor="middle" dy="-10" fontSize="24px" fontWeight="bold">
            {Math.round(percentage * 100)}%
          </text>
         
          <text textAnchor="middle" dy="20" fontSize="16px" fill="#666">
            {avg_deliverytime > goal ? "Overdue" : "On Track"}
          </text>
        </g>
      </svg>
    </div>
  );
}

export default GaugeChart;
