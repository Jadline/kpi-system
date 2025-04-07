import { arc, scaleLinear } from "d3";
import { useDimensions } from "../../reusable-components/useDimensions";

function Gauge({ totalCost, budget, className }) {
  const { containerRef, width, height } = useDimensions();

  const startAngle = -Math.PI / 2; // -90°
  const endAngle = Math.PI / 2; // 90°
  const utilization = Math.min((totalCost / budget) * 100, 100); // Cap at 100%

  const budgetbands = [
    { range: [0, 70], color: "green" },
    { range: [70, 90], color: "yellow" },
    { range: [90, 100], color: "red" },
  ];

  // Ensure the angle scale maps 0-100% to -90° to 90°
  const angleScale = scaleLinear()
    .domain([0, 100])
    .range([startAngle, endAngle]);

  const outerRadius = Math.min(width, height) / 2 - 20;
  const innerRadius = Math.min(width, height) / 3.5;

  return (
    <div
      className={className}
      ref={containerRef}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "-0.2rem -0.2rem 1rem rgba(0,0,0,0.2)",
        borderRadius: "1rem",
        minHeight: "400px",
        width: "100%",
        height: "100%",
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Title */}
        <text
          x={width / 2}
          y={25}
          textAnchor="middle"
          alignmentBaseline="middle"
          fontWeight={700}
          fontSize={16}
        >
          Transportation cost utilization
        </text>

        {/* Gauge arcs and needle */}
        {width > 0 && height > 0 && (
          <g transform={`translate(${width / 2}, ${height * 0.6})`}>
            {/* Budget bands */}
            {budgetbands.map(({ range, color }, i) => {
              const bandArc = arc()
                .innerRadius(innerRadius)
                .outerRadius(outerRadius)
                .startAngle(angleScale(range[0]))
                .endAngle(angleScale(range[1]));

              return <path key={i} d={bandArc()} fill={color} />;
            })}

            {/* Needle */}
            {/* <line
              x1={0}
              y1={0}
              x2={outerRadius * Math.cos(angleScale(utilization))}
              y2={outerRadius * Math.sin(angleScale(utilization))}
              stroke="black"
              strokeWidth={3}
            /> */}

            {/* Center dot */}
            <circle r={5} fill="black" />
          </g>
        )}

        {/* Utilization label */}
        <text
          x={width / 2}
          y={height - 30}
          textAnchor="middle"
          fontSize={14}
        >
          {`Utilization: ${utilization.toFixed(1)}%`}
        </text>
      </svg>
    </div>
  );
}

export default Gauge;

