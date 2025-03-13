import styles from './ActiveOrders.module.css'
function ActiveOrders({className}){
    return(
        <div className={`${className} ${styles.activeorders}`}>
            <div className={styles.ordersimg}>
                <img src="./icons/active order.png" alt="" />
            </div>
            <div className={styles.orderstext}>
                <p>Active Orders</p>
                <p className={styles.ordersno}>Air : 500</p>
                <p className={styles.ordersno}>Sea : 500</p>
                
            </div>

        </div>
    )
}
export default ActiveOrders