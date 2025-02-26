import { Tcpiedata } from '../../../public/project-data-files/MainPages'
import Chart from '../../components/Chart/Chart'
import Header from '../../components/header/Header'
import InsightCard from '../../components/insight-card/InsightCard'
import Sidebar from '../../components/sidebar/Sidebar'
import TCLine from '../../components/tc-charts/tc-line'
import TCPie from '../../components/tc-charts/tc-pie'
import styles from './TransportationCost.module.css'
import { transportationCostData } from '../../../public/project-data-files/MainPages'
import { transportCostUsage } from '../../../public/project-data-files/MainPages'
import TCProgressBar from '../../components/tc-progressbar/TC-progressbar'
function TransportationCost(){
    return(
        <div className={styles.container}>
        <Header className={styles.header}/>
        <Sidebar className={styles.sidebar}/>
        <InsightCard className={styles.card}/>
        <TCPie className={styles.chart1} data={Tcpiedata}/>
        <TCLine className={styles.chart2} data={transportationCostData}/>
        <TCProgressBar className={styles.chart3} data={transportCostUsage}/>

        {/* <Chart className={styles.chart1}/> */}
        {/* <Chart className={styles.chart2}/> */}
        {/* <Chart className={styles.chart3}/> */}
        <Chart className={styles.chart4}/>
    </div>
    )
}
export default TransportationCost