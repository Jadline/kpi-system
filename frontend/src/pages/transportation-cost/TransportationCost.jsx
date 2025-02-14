import Chart from '../../components/Chart/Chart'
import Header from '../../components/header/Header'
import InsightCard from '../../components/insight-card/InsightCard'
import Sidebar from '../../components/sidebar/Sidebar'
import styles from './TransportationCost.module.css'
function TransportationCost(){
    return(
        <div className={styles.container}>
        <Header className={styles.header}/>
        <Sidebar className={styles.sidebar}/>
        <InsightCard className={styles.card}/>
        <Chart className={styles.chart1}/>
        <Chart className={styles.chart2}/>
        <Chart className={styles.chart3}/>
        <Chart className={styles.chart4}/>
    </div>
    )
}
export default TransportationCost