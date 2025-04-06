
import PORLine from '../../components/por-charts/por-line'
import styles from './PerfectOrderRate.module.css'
import PORBar from '../../components/por-charts/por-bar'
import PORDonut from '../../components/por-charts/por-donut'
import ActiveOrders from '../../components/active-orders/ActiveOrders'
import usePOR from '../../reusable-components/usePOR'
import Spinner from '../../components/Spinner/Spinner'

function PerfectOrderRate(){
    const{isLoading,error,porData,januaryPOR,donutData} = usePOR()

    if(isLoading) return <Spinner/>
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