import ADTBar from "../../components/adt-charts/ADT-bar";
import Chart from "../../components/Chart/Chart";
import Header from "../../components/header/Header";
import InsightCard from "../../components/insight-card/InsightCard";
import Sidebar from "../../components/sidebar/Sidebar";
import styles from "./AverageDeliveryTime.module.css";
import { ADTareadata, ADTdata } from "../../../public/project-data-files/MainPages";
import ADTArea from "../../components/adt-charts/ADT-area";
import { shippingtabledata } from "../../../public/project-data-files/MainPages";
import ADTable from "../../components/adt-table/ADT-table";
// import { ADTdata } from "../../../public/project-data-files/MainPages";
function AverageDeliveryTime() {
  return (
    <div className={styles.container}>
      <Header className={styles.header} />
      <Sidebar className={styles.sidebar} />
      <InsightCard className={styles.card} />
      <ADTBar className={styles.chart1} data={ADTdata}/>
      {/* <Chart className={styles.chart1} /> */}
      <Chart className={styles.chart2} />
      <Chart className={styles.chart21} />
      {/* <Chart className={styles.chart3} /> */}
      <ADTable className={styles.chart3} data={shippingtabledata}/>
      <ADTArea className={styles.chart4} data={ADTareadata}/>
      {/* <Chart className={styles.chart4} /> */}
    </div>
  );
}
export default AverageDeliveryTime;
