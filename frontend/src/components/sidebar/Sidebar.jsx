import styles from './Sidebar.module.css'
import {Link} from 'react-router-dom'
function Sidebar({className}){
    return(
        <div className={`${styles.sidebarcontainer} ${className}`}>
            <h3 className ={styles.sectionTitle}>Performance Metrics</h3>
            <Link to='/'>Perfect Order Rate</Link>
            <Link to='/number-of-shipments'>Number Of Shipments</Link>
            <Link to='/average-delivery-time'>Average Delivery Time</Link>
            <Link to='/shipping-time'>Shipping Time</Link>
            <Link to= '/transportation-cost'>Transportation Cost</Link>
           
        </div>
    )
}
export default Sidebar