import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { useDimensions } from "../../reusable-components/useDimensions";

const MARGIN = { left: 30, top: 30, right: 30, bottom: 30 };

function GaugeChart({ avg_deliverytime, goal, className,mode }) {
 

  const { containerRef, width, height } = useDimensions();
  const size = Math.min(width, height); 
  const bounds = size - MARGIN.left - MARGIN.right;  
  const radius = bounds / 2.2;  
  const arcWidth = radius * 0.25; 
  const startAngle = -Math.PI / 2; 
  const endAngle = Math.PI * 1.5;  


  const safeGoal = goal > 0 ? goal : 1;
  const safeAvg = avg_deliverytime ?? 0;

 
  const percentage = safeAvg <= safeGoal 
    ? (safeAvg / safeGoal) * 100 
    : (safeGoal / safeAvg) * 100; 

  const filledAngle = startAngle + (percentage / 100) * (endAngle - startAngle);

  
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

  
  const statusText =
    safeAvg <= safeGoal
      ? `On Track (${Math.round(100 - percentage)}% remaining)`
      : `Behind Schedule (${Math.round(100 - percentage)}% left)`;

  
  const progressColor = safeAvg <= safeGoal ? "#28a745" : "#ff3b30";

  return (
    <div
      className={className}
      ref={containerRef}
      style={{
        width: "100%",
        textAlign: "center",
        boxShadow: "-0.2rem -0.2rem 1rem rgba(0,0,0,0.2)",
        borderRadius: "1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <svg
        width="100%"
        height={size}
        viewBox={`0 0 ${size} ${size}`} 
        preserveAspectRatio="xMidYMid meet"
      >
          <foreignObject x="0" y="0" width={size} height="30">
          <div xmlns="http://www.w3.org/1999/xhtml" style={{ fontSize: "18px", fontWeight: "700", textAlign: "center" }}>
            Performance by {mode}
          </div>
        </foreignObject>
        <g transform={`translate(${size / 2}, ${size / 2})`}> 
          
          <path d={arc()} fill="#ddd" />
          
         
          <path d={progressArc()} fill={progressColor} />

         
          <text textAnchor="middle" dy="15" fontSize="24px" fontWeight="bold">
            {Math.round(percentage)}%
          </text>

       
         
        </g>
      </svg>
    </div>
  );
}

export default GaugeChart;
