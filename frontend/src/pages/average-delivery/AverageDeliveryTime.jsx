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
import AirGauge from "../../components/adt-gauges/airgauge";
import { adtgaugeairdata } from "../../../public/project-data-files/MainPages";
// import { ADTdata } from "../../../public/project-data-files/MainPages";
function AverageDeliveryTime() {
  
  return (
    <div className={styles.container}>
     
      <ADTBar className={styles.chart1} data={ADTdata}/>
      <AirGauge data={adtgaugeairdata} className={styles.chart2}/>
      <Chart className={styles.chart21} />
      <ADTable className={styles.chart3} data={shippingtabledata}/>
      <ADTArea className={styles.chart4} data={ADTareadata}/>
     
    </div>
  );
}
export default AverageDeliveryTime;
