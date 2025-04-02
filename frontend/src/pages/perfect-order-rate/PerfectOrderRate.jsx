import Chart from '../../components/Chart/Chart'
import Header from '../../components/header/Header'
import InsightCard from '../../components/insight-card/InsightCard'
import PORLine from '../../components/por-charts/por-line'
import Sidebar from '../../components/sidebar/Sidebar'
import styles from './PerfectOrderRate.module.css'
import {countriesporData } from '../../../public/project-data-files/MainPages'
import PORBar from '../../components/por-charts/por-bar'
// import { porbardata,donutData} from '../../../public/project-data-files/MainPages'
import PORDonut from '../../components/por-charts/por-donut'
import ActiveOrders from '../../components/active-orders/ActiveOrders'
import { useEffect, useState } from 'react'
import usePOR from '../../reusable-components/usePOR'

function PerfectOrderRate(){
    const{data : apiData,isLoading,error} = usePOR()

    const porData = apiData?.pefect_order_rate_by_year 
    ? apiData.pefect_order_rate_by_year.map(({ month, perfect_order_rate }) => ({
        month,
        por: parseFloat(perfect_order_rate) || 0
    })) 
    : [];

    const januaryPOR = apiData?.perfect_order_rate_by_route
    .reduce((acc, { country, perfect_order_rate }) => {
        const por = parseFloat(perfect_order_rate);

        if (!acc[country]) {
            acc[country] = [];
        }

        acc[country].push(por);

        return acc;
    }, {}) 
   
    ? Object.entries(apiData?.perfect_order_rate_by_route.reduce((acc, { country, perfect_order_rate }) => {
        const por = parseFloat(perfect_order_rate);

        if (!acc[country]) {
            acc[country] = [];
        }

        acc[country].push(por);

        return acc;
    }, {}))
        .map(([country, rates]) => ({
            country,
            por: (rates.reduce((sum, rate) => sum + rate, 0) / rates.length).toFixed(2),
        }))
    : [];  

    const donutData = [
        {category : 'Timely Deliveries', value : apiData?.timely_deliveries},
        {category : 'Untimely Deliveries',value : apiData?.untimely_deliveries},
        {category : 'Complete Orders', value : apiData?.complete_orders}
    ]
 

    // export const donutData = [
    //     { category: "Timely Deliveries", value: 65 },
    //     { category: "Untimely Deliveries", value: 13 },
    //     { category: "Complete Orders", value: 75 }
    //   ];

    if(isLoading) return <p>The data is loading...</p>
    if(error) return <p>There is an error fetching data....`</p>

 

    
    return(
       
        <div className={styles.container}>
            <PORLine className={styles.chart1} data ={porData}/>
            <ActiveOrders className={styles.chart2}  />
            <PORBar className={styles.chart3} data={januaryPOR}/>
            <PORDonut  className={styles.chart4} data={donutData}/>
        </div>
    )
}
export default PerfectOrderRate