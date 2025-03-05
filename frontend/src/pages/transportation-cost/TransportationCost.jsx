import { Tcpiedata } from '../../../public/project-data-files/MainPages'
import TCLine from '../../components/tc-charts/tc-line'
import TCPie from '../../components/tc-charts/tc-pie'
import styles from './TransportationCost.module.css'
import { transportationCostData } from '../../../public/project-data-files/MainPages'
import { transportCostUsage } from '../../../public/project-data-files/MainPages'
import TCProgressBar from '../../components/tc-progressbar/TC-progressbar'
import Gauge from '../../components/tc-charts/tc-gauge'
import { budgetdata } from '../../../public/project-data-files/MainPages'
function TransportationCost(){
    return(
        <div className={styles.container}>
        <TCPie className={styles.chart1} data={Tcpiedata}/>
        <TCLine className={styles.chart2} data={transportationCostData}/>
        <TCProgressBar className={styles.chart3} data={transportCostUsage}/>
        <Gauge data={budgetdata} className={styles.chart4}/>
    
    </div>
    )
}
export default TransportationCost