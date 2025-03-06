import { geoNaturalEarth1, geoPath } from "d3";
import { useEffect, useRef, useState } from "react";
import { useDimensions } from "../../reusable-components/useDimensions";
const MARGIN = {top : 30,left : 50,right : 50,bottom : 30}
const countries = {
    "China": "red",
    "South Africa": "green",
    "Netherlands": "blue",
    "Turkey": "purple",
    "United Arab Emirates": "orange",
    "United Kingdom": "yellow",
    "Italy": "pink"
  };

  const ukRegions = ["England", "Scotland", "Wales", "Northern Ireland"];

  const shippingTimes = {
    "United Kingdom": { air: "3 days", sea: "20 days" },
    "China": { air: "5 days", sea: "30 days" },
    "South Africa": { air: "4 days", sea: "25 days" },
    "Netherlands": { air: "2 days", sea: "15 days" },
    "Turkey": { air: "3 days", sea: "18 days" },
    "United Arab Emirates": { air: "3 days", sea: "20 days" },
    "Italy": { air: "2 days", sea: "15 days" }
  };

function Map({data,className}){
    const[tooltip,setTooltip] = useState({
        visible : false,
        name : '',
        x : '',
        y : '',
        Air : '',
        Sea : ''
    })
    const {containerRef,width,height} = useDimensions(700,500);
   
    const boundsWidth = width - MARGIN.left - MARGIN.right
    const boundsHeight = height - MARGIN.top - MARGIN.bottom

    const projection = geoNaturalEarth1().scale(140).translate([width/2,height/2])
    const pathGenerator = geoPath().projection(projection)
    return(
        <div 
        className={className} 
        ref={containerRef}
        style={{
            display : 'flex',
            alignItems:'center',
            justifyContent:'center',
            width : '100%',
            height : '100%',
            position : 'relative',
            borderRadius : '1rem',
            boxShadow : '-0.2rem -0.2rem 1rem rgba(0,0,0,0.2)'
        }}
        >
            <svg
            width ="100%"
            height ="100%"
            viewBox ={`0 0 ${width} ${height}`}
            preserveAspectRatio="xMidYMid meet"
            >
                <rect width={width} height={height} fill={'#f8ffff'} />
                <g transform={`translate(${MARGIN.left -200},${MARGIN.right})`}>
                    {data && data.map((feature,i) => {
                        let countryName = feature.properties.name
                        let displayName = countryName
                        let shippingInfo = shippingTimes[countryName]

                        if(ukRegions.includes(countryName)) {
                            displayName = 'United Kingdom'
                            shippingInfo = shippingTimes['United Kingdom']
                        }
                        const fillColor =  ukRegions.includes((countryName)) ? 'yellow' : countries[countryName] || '#fff'

                        return(
                            <g key={i}>
                                <path
                                d ={pathGenerator(feature)}
                                fill ={fillColor}
                                stroke={'rgba(0, 0, 0,0.2)'}
                                onMouseEnter ={(e) => {
                                    if(shippingInfo){
                                        const { offsetX, offsetY } = e.nativeEvent;
                                        setTooltip({
                                            visible : true,
                                            name : displayName,
                                            Air : shippingInfo.air,
                                            Sea : shippingInfo.sea,
                                            x : offsetX,
                                            y : offsetY
                                        })
                                    }
                                    else {
                                        setTooltip({
                                            visible : false
                                        })
                                    }
                                }}
                                onMouseMove ={(e) => {
                                    const{offsetX,offsetY} = e.nativeEvent
                                    setTooltip((prev) => ({
                                        ...prev,
                                        x :offsetX,
                                        y : offsetY
                                    }))
                                }}
                                onMouseLeave={() => {
                                    setTooltip({
                                        visible : false,
                                        name : '',
                                        x:'',
                                        y:'',
                                        Air : '',
                                        Sea : ''
                                        
                                    })
                                }}
                                

                                />

                            </g>
                        )
                    })}

                </g>

            </svg>
            {tooltip.visible && (
                <div
                style={{
                    position : 'absolute',
                    left : tooltip.x + 10,
                    top : tooltip.y - 40,
                    paddingInline : '2.4rem',
                    paddingBlock : '1.2rem',
                    // border:'.2rem solid rgba(0, 0, 0,0.2)',
                    borderRadius : '1rem',
                    backgroundColor : 'hsl(216, 33%, 87%)',
                    fontSize : '1.2rem',
                    color : '#000',
                    boxShadow : '0.4rem 0.4rem 1rem rgba(0,0,0,0.2)'
                }}
                >
                    <b style={{
                        whiteSpace : 'nowrap'
                    }}>Country : {tooltip.name}</b>
                    <p>Air : {tooltip.Air}</p>
                    <p>Sea : {tooltip.Sea}</p>
                    
                </div>
            )}

        </div>
    )
}
export default Map