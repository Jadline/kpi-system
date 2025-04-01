import Chart from "../../components/Chart/Chart";
import Header from "../../components/header/Header";
import InsightCard from "../../components/insight-card/InsightCard";
import NOSBar from "../../components/nos-charts/NOS-bar";
import Sidebar from "../../components/sidebar/Sidebar";
import styles from "./NumberOfShipments.module.css";
// import { NOSpiedata } from "../../project-data-files/MainPages";
// import { NOSpiedata } from "../../../public/project-data-files/MainPages";
import { stackedData } from "../../../public/project-data-files/MainPages";
import NOSPie from "../../components/nos-charts/NOS-pie";
import { useDashboard } from "../../context/state-Context";
import { useQuery } from "@tanstack/react-query";
import { fetchShipments } from "../../Services/apiNOS";
import useShipments from "../../reusable-components/useShipments";
function NumberOfShipments() {
  
    const {isLoading,data,error} = useShipments()

    if (isLoading) return <p>Loading...</p>;
    if (error) {
      console.error("Error fetching shipments:", error);
      return <p>Error loading data! {error.message}</p>;
    }
    if (!data) return <p>No data available.</p>;
  
    const NOSpiedata = [
      { category: "air", no_shipments: data.shipments_by_air || 0 },
      { category: "sea", no_shipments: data.shipments_by_sea || 0 },
    ];
  
    console.log("Pie chart data:", NOSpiedata);
  // : [];

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
