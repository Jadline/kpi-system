import STLine from "../../components/st-charts/ST-line";
import styles from "./ShippingTime.module.css";
import Map from "../../components/st-charts/ST-map";
import STBar from "../../components/st-charts/ST-bar";
import ProgressBar from "../../components/progressbar/ProgressBar";
import useST from "../../reusable-components/useST";
import useMapdata from "../../reusable-components/useMapdata";
import Spinner from "../../components/Spinner/Spinner";
import { useEffect } from "react";

function ShippingTime() {

  const {isLoading,error,shippingTimeData,stackedData} = useST()
  const {mapdata,countries,mapError,countriesError,isLoadingCountries,isLoadingMapData} = useMapdata()

  
  useEffect(() => {
    if(mapError || countriesError) console.error('There was an error')
  }, [mapError, countriesError]);

  
  if(isLoading) return <Spinner/>
  if (isLoadingMapData || isLoadingCountries) return <Spinner/>;
  if(error) return <p>Error....</p>

  

  return (
    <div className={styles.container}>
      <STLine className={styles.chart1} data={shippingTimeData} />
      <STBar className={styles.chart2} data={stackedData} />
      <Map className={styles.chart3} data={mapdata} />
      <ProgressBar className={styles.chart4} data={countries} />
    </div>
  );
}

export default ShippingTime;