import ADTBar from "../../components/adt-charts/ADT-bar";
import styles from "./AverageDeliveryTime.module.css";

import ADTArea from "../../components/adt-charts/ADT-area";
import ADTable from "../../components/adt-table/ADT-table";
import useADT from "../../reusable-components/useADT";
import GaugeChart from "../../components/adt-gauges/gauge1";
import Spinner from "../../components/Spinner/Spinner";

function AverageDeliveryTime() {
  const  {data,isLoading,error, ADTdata,shippingtabledata,ADTareadata,avg_ADT_by_air,avg_ADT_by_sea,avg_ADT_goal_by_air,avg_ADT_goal_by_sea} = useADT()

  
  if(isLoading) return <Spinner/>
  if(error) return <p>There was an error ...</p>
  return (
    <div className={styles.container}>
     
      <ADTBar className={styles.chart1} data={ADTdata}/>
     
      <GaugeChart avg_deliverytime={avg_ADT_by_air} goal={avg_ADT_goal_by_air} className={styles.chart21} mode='Air'/>
      <GaugeChart avg_deliverytime={avg_ADT_by_sea} goal={avg_ADT_goal_by_sea} className={styles.chart2} mode='Sea'/>

      
      <ADTable className={styles.chart3} data={shippingtabledata}/>
      <ADTArea className={styles.chart4} data={ADTareadata}/>
     
    </div>
  );
}
export default AverageDeliveryTime;
