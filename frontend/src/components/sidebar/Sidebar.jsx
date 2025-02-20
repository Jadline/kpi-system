import styles from "./Sidebar.module.css";
import { NavLink } from "react-router-dom";
function Sidebar({ className }) {
  return (
    <aside className={`${styles.sidebarcontainer} ${className}`}>
      <h3 className={styles.sectionTitle}>
        <img
          src="./icons/metrics.png"
          alt="metrics-icon"
          className={styles.sidebarIcon}
        />
        <p>Performance Metrics</p>
      </h3>
      <ul className={styles.sidebarContent}>
        <li>
          <img
            src="./icons/perfect-order-rate.png"
            alt="perfect-order-rate-icon"
            className={styles.sidebarIcon}
          />
          <NavLink to="/">Perfect Order Rate</NavLink>
        </li>
        <li>
          <img
            src="./icons/number-of-shipments.png"
            alt="number-of-shipments-icon"
            className={styles.sidebarIcon}
          />
          <NavLink to="/number-of-shipments">Number Of Shipments</NavLink>
        </li>
        <li>
          <img
            src="./icons/shipping-time.png"
            alt="shipping-time-icon"
            className={styles.sidebarIcon}
          />
          <NavLink to="/shipping-time">Shipping Time</NavLink>
        </li>
        <li>
          <img
            src="./icons/average-time-delivery.png"
            alt="average-delivery-time-icon"
            className={styles.sidebarIcon}
          />
          <NavLink to="/average-delivery-time">Average Delivery Time</NavLink>
        </li>
        <li>
          <img
            src="./icons/transportation-cost.png"
            alt="transportation-cost-icon"
            className={styles.sidebarIcon}
          />
          <NavLink to="/transportation-cost">Transportation Cost</NavLink>
        </li>
      </ul>
    </aside>
  );
}
export default Sidebar;
