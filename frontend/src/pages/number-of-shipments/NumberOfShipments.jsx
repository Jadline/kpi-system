import NOSBar from "../../components/nos-charts/NOS-bar";
import styles from "./NumberOfShipments.module.css";
import NOSPie from "../../components/nos-charts/NOS-pie";
import useShipments from "../../reusable-components/useShipments";
import Spinner from "../../components/Spinner/Spinner";
function NumberOfShipments() {
  
    const {isLoading,data,error,NOSpiedata,stackedData} = useShipments()

    if (isLoading) return <Spinner/>;
    if (error) {
      console.error("Error fetching shipments:", error);
      return <p>Error loading data! {error.message}</p>;
    }
    if (!data) return <p>No data available.</p>;

  return (
    <div className={styles.container}>
      <NOSBar className={styles.chart1} data={stackedData}/>
      <NOSPie 
      className={styles.chart2} 
      data={NOSpiedata}/> 
      
    </div>
  );
}
export default NumberOfShipments;
