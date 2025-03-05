import Chart from "../../components/Chart/Chart";
import Header from "../../components/header/Header";
import InsightCard from "../../components/insight-card/InsightCard";
import NOSBar from "../../components/nos-charts/NOS-bar";
import Sidebar from "../../components/sidebar/Sidebar";
import styles from "./NumberOfShipments.module.css";
// import { NOSpiedata } from "../../project-data-files/MainPages";
import { NOSpiedata } from "../../../public/project-data-files/MainPages";
import { stackedData } from "../../../public/project-data-files/MainPages";
import NOSPie from "../../components/nos-charts/NOS-pie";
function NumberOfShipments() {
  return (
    <div className={styles.container}>
      <NOSBar className={styles.chart1} data={stackedData}/>
      <NOSPie className={styles.chart2} data={NOSpiedata}/>
    </div>
  );
}
export default NumberOfShipments;
