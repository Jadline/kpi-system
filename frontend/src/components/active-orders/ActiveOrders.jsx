import usePOR from '../../reusable-components/usePOR'
import styles from './ActiveOrders.module.css'
function ActiveOrders({className}){
    const {data,isLoading,error} = usePOR()
    if(isLoading) return <p>Data is Loading</p>
    if(error) return <p>There was an error fetching data ...</p>
   
    return(
        <div className={`${className} ${styles.activeorders}`}>
            <div className={styles.ordersimg}>
                <img src="./icons/active order.png" alt="" />
            </div>
            <div className={styles.orderstext}>
                <p>Perfect Order Rate</p>
                <p className={styles.ordersno}>{data.perfect_order_rate}%</p>
                
                
            </div>

        </div>
    )
}
export default ActiveOrders