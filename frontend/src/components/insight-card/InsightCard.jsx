import styles from './InsightCard.module.css'

function InsightCard({className}){
    return(
        <div className={`${styles.cardcontainer} ${className}`}>
             <div className={styles.carditem}>Total damages</div>
            <div className={styles.carditem}>Complete Orders</div>
            <div className={styles.carditem}>Incomplete Orders</div>
            <div className={styles.carditem}>untimely deliveries</div>
        </div>
    )
}
export default InsightCard