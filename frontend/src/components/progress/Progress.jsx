// import { max } from 'd3';
import styles from './Progress.module.css'
import { useState } from 'react';
const airShippingData = [
    { country: "United Kingdom", averageShippingTime: 3, goal: 2.5 },
    { country: "China", averageShippingTime: 5, goal: 3.5 },
    { country: "South Africa", averageShippingTime: 4, goal: 3.5 },
    { country: "Netherlands", averageShippingTime: 2, goal: 1.8 },
    { country: "Turkey", averageShippingTime: 3, goal: 2.7 },
    { country: "United Arab Emirates", averageShippingTime: 3, goal: 2.8 },
    { country: "Italy", averageShippingTime: 2, goal: 1.7 }
];
  
function Progress({countryName}){
    const countrydata = airShippingData.find((d) => d.country === countryName)
    if(!countrydata) return
    const maxValue = Math.max(countrydata.averageShippingTime, countrydata.goal);
    return(
        <>
        <progress value={countrydata.goal} max={maxValue}>


        </progress>
        {/* <p>Avg: {countrydata.averageShippingTime} days | Goal: {countrydata.goal} days</p> */}
        </>
    )
}
export default Progress
