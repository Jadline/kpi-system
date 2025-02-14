import Chart from '../../components/Chart/Chart'
import Header from '../../components/header/Header'
import InsightCard from '../../components/insight-card/InsightCard'
import Sidebar from '../../components/sidebar/Sidebar'
import styles from './NumberOfShipments.module.css'
function NumberOfShipments(){
    return(
        <div className={styles.container}>
        <Header className={styles.header}/>
        <Sidebar className={styles.sidebar}/>
        <InsightCard className={styles.card}/>
        <Chart className={styles.chart1}/>
        <Chart className={styles.chart2}/>
        
    </div>
    )
}
export default NumberOfShipments