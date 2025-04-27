import { Tcpiedata } from '../../../public/project-data-files/MainPages'
import TCLine from '../../components/tc-charts/tc-line'
import TCPie from '../../components/tc-charts/tc-pie'
import styles from './TransportationCost.module.css'

import TCProgressBar from '../../components/tc-progressbar/TC-progressbar'
import Gauge from '../../components/tc-charts/tc-gauge'
import { budgetdata } from '../../../public/project-data-files/MainPages'
import useTC from '../../reusable-components/useTC'
import Spinner from '../../components/Spinner/Spinner'

function TransportationCost(){
    const {isLoading, error,transportationCostData,transportCostUsage,total_transportation_cost,totalBudget,totalUsed} = useTC()
    if(isLoading) return <Spinner/>
    if(error) return <p>There was an error ....</p>
    
    return(
        <div className={styles.container}>
        <TCPie className={styles.chart1} data={Tcpiedata}/>
        <TCLine className={styles.chart2} data={transportationCostData}/>
        <TCProgressBar className={styles.chart3} data={transportCostUsage} totaltransportationcost={total_transportation_cost}/>
        <Gauge totalCost={totalUsed || budgetdata.totalCost} budget={totalBudget || budgetdata.budget} className={styles.chart4}/>
    
    </div>
    )
}
export default TransportationCost