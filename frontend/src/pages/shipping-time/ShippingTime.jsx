import Chart from "../../components/Chart/Chart";
import Header from "../../components/header/Header";
import InsightCard from "../../components/insight-card/InsightCard";
import Sidebar from "../../components/sidebar/Sidebar";
import STLine from "../../components/st-charts/ST-line";
import styles from "./ShippingTime.module.css";
import { shippingTimeData } from "../../../public/project-data-files/MainPages";
import Map from "../../components/st-charts/ST-map";
import STBar from "../../components/st-charts/ST-bar";
import { useEffect, useState } from "react";
import ProgressBar from "../../components/progressbar/ProgressBar";
const MAP_URL = "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"
const COUNTRIES_URL ='https://restcountries.com/v3.1/all'
import { stackedData } from "../../../public/project-data-files/MainPages";
function ShippingTime({isdarkmode}) {
  const [mapdata,setMapdata] = useState(null)
  const [countries,setCountries] = useState([])
  useEffect(() => {
    async function fetchMapdata(){
      try{
        const res = await fetch(MAP_URL)
        if(!res.ok) throw new Error('There was an error fetching data')
        const data = await res.json()
        setMapdata(data.features)
      }catch(error){
        console.log(error)
      }

    }
    fetchMapdata()

  },[])
  useEffect(() => {
    async function fetchCountries(){
      try{
        const res = await fetch(COUNTRIES_URL)
        if(!res.ok) throw new Error('There was an error fetching data')
        const data = await res.json()
        setCountries(data)

      }catch(error){
        console.log(error)
      }

    }
    fetchCountries()
  },[])
  return (
    <div className={styles.container}>

      <STLine className={styles.chart1} data={shippingTimeData}/>
      <STBar className={styles.chart2} data={stackedData}/>
      <Map className={styles.chart3} data={mapdata}/>
      <ProgressBar className={styles.chart4} data={countries} isdarkmode={isdarkmode}/>
     
    </div>
  );
}
export default ShippingTime;
