import Chart from '../../components/Chart/Chart'
import Header from '../../components/header/Header'
import InsightCard from '../../components/insight-card/InsightCard'
import PORLine from '../../components/por-charts/por-line'
import Sidebar from '../../components/sidebar/Sidebar'
import styles from './PerfectOrderRate.module.css'
import { porData,countriesporData } from '../../../public/project-data-files/MainPages'
import PORBar from '../../components/por-charts/por-bar'
import { porbardata,donutData} from '../../../public/project-data-files/MainPages'
import PORDonut from '../../components/por-charts/por-donut'
import ActiveOrders from '../../components/active-orders/ActiveOrders'
import { useEffect, useState } from 'react'

function PerfectOrderRate(){
    const januaryPOR = countriesporData.map((dataitem) => {
        return {
            country : dataitem.country,
            por : dataitem.data.find((d) => d.month.toLowerCase() === 'january')?.por || 0
        }
    })
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