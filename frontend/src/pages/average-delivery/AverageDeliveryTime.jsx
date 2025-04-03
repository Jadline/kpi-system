import ADTBar from "../../components/adt-charts/ADT-bar";
import Chart from "../../components/Chart/Chart";
import Header from "../../components/header/Header";
import InsightCard from "../../components/insight-card/InsightCard";
import Sidebar from "../../components/sidebar/Sidebar";
import styles from "./AverageDeliveryTime.module.css";
import { ADTareadata} from "../../../public/project-data-files/MainPages";
import ADTArea from "../../components/adt-charts/ADT-area";
// import { shippingtabledata } from "../../../public/project-data-files/MainPages";
import ADTable from "../../components/adt-table/ADT-table";
import AirGauge from "../../components/adt-gauges/airgauge";
import { adtgaugeairdata } from "../../../public/project-data-files/MainPages";
import useADT from "../../reusable-components/useADT";
import GaugeChart from "../../components/adt-gauges/gauge1";
import GaugeContainer from "../../components/adt-gauges/gauge1";
// import { ADTdata } from "../../../public/project-data-files/MainPages";
// export const shippingtabledata = [
//   { country: "UAE", avgByAir: 5, goalByAir: 4, avgBySea: 20, goalBySea: 18, status: "100%" },
//   { country: "Netherlands", avgByAir: 6, goalByAir: 5, avgBySea: 22, goalBySea: 20, status: "50%" },
//   { country: "Turkey", avgByAir: 7, goalByAir: 5, avgBySea: 25, goalBySea: 22, status: "20%" },
//   { country: "China", avgByAir: 10, goalByAir: 8, avgBySea: 30, goalBySea: 28, status: "100%" },
//   { country: "UK", avgByAir: 6, goalByAir: 5, avgBySea: 21, goalBySea: 18, status: "50%" },
//   { country: "South Africa", avgByAir: 8, goalByAir: 7, avgBySea: 28, goalBySea: 25, status: "20%" },
//   { country: "Italy", avgByAir: 7, goalByAir: 6, avgBySea: 26, goalBySea: 24, status: "100%" }
// ];
function AverageDeliveryTime() {
  const {data : apiData,isLoading,error} = useADT()

  const ADTdata = apiData?.countryData?.map(({country,average_delivery_air,average_delivery_sea}) => ({
    name : country === "Netherlands" ? 'Nether Lands' : country,
    air : average_delivery_air,
    sea : average_delivery_sea
  }))
  const shippingtabledata = apiData?.countryData?.map(({country,average_delivery_air,average_delivery_sea,goal_air,goal_sea,status}) => ({
    country : country,
    avgByAir : average_delivery_air,
    goalByAir : goal_air,
    avgBySea : average_delivery_sea,
    goalBySea : goal_sea,
    status : status



  }))
  if(isLoading) return <p>Data is loading....</p>
  if(error) return <p>There was an error ...</p>
  return (
    <div className={styles.container}>
     
      <ADTBar className={styles.chart1} data={ADTdata}/>
     
      <GaugeChart avg_deliverytime={85} goal={100} className={styles.chart21}/>
      <GaugeChart avg_deliverytime={85} goal={100} className={styles.chart2}/>

      
      <ADTable className={styles.chart3} data={shippingtabledata}/>
      <ADTArea className={styles.chart4} data={ADTareadata}/>
     
    </div>
  );
}
export default AverageDeliveryTime;
