import React, { useEffect } from "react";
import Chart from "../../components/Chart/Chart";
import Header from "../../components/header/Header";
import InsightCard from "../../components/insight-card/InsightCard";
import Sidebar from "../../components/sidebar/Sidebar";
import STLine from "../../components/st-charts/ST-line";
import styles from "./ShippingTime.module.css";
import { shippingTimeData } from "../../../public/project-data-files/MainPages";
import Map from "../../components/st-charts/ST-map";
import STBar from "../../components/st-charts/ST-bar";
import ProgressBar from "../../components/progressbar/ProgressBar";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import toast from "react-hot-toast";

const MAP_URL = "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson";
const COUNTRIES_URL = 'https://restcountries.com/v3.1/all';
import { stackedData } from "../../../public/project-data-files/MainPages";


async function fetchMapData() {
  try {
    const response = await axios.get(MAP_URL);
    if (response.status !== 200)
      throw new Error('There was an error fetching data');
    return response?.data?.features;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch map data');
  }
}

async function fetchCountriesData() {
  try {
    const response = await axios.get(COUNTRIES_URL);
    if (Array.isArray(response.data)) return response.data;
    if (typeof response.data === 'object' && response.data !== null) return [response.data];
    return [response.data];
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch countries data');
  }
}

function ShippingTime() {
  
  const { data: mapdata, error: mapError, isLoading: isLoadingMapData } = useQuery({
    queryKey: ['Mapdata'],
    queryFn: fetchMapData,
  });

  const { data: countries, error: countriesError, isLoading: isLoadingCountries } = useQuery({
    queryKey: ['Countriesdata'],
    queryFn: fetchCountriesData,
  });

  useEffect(() => {
    if (mapError) toast.error(mapError.message);
    if (countriesError) toast.error(countriesError.message);
  }, [mapError, countriesError]);

  if (isLoadingMapData || isLoadingCountries) return <p>Loading ....</p>;

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