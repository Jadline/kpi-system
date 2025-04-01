import styles from "./InsightCard.module.css";
import {
  cardsData,
  mainPages,
} from "../../../public/project-data-files/MainPages";
import { useLocation } from "react-router-dom";
import { Query, useQuery } from "@tanstack/react-query";
import { fetchShipments } from "../../Services/apiNOS";
import useShipments from "../../reusable-components/useShipments";

import { cardMappings } from "../../../public/project-data-files/data";


function InsightCard({ className }) {
  const location = useLocation();
  const pagePath = location.pathname
  const pageTitle = mainPages[pagePath] || "";

  const shipmentsQuery = useShipments()

  const apiHooks = {
    "/number-of-shipments": shipmentsQuery,
   
  };
 
  const {data : apiData,isLoading,error} =  apiHooks[pagePath]  || { data: null, isLoading: false, error: null }
 
  if(isLoading) return <p>Loading data...</p>

  if(error) return <p>{error.message}</p>
  if(!apiData) return <p>No data available</p>

 const cardsInfo = Object.keys(apiData).map((key) => {
  if(!cardMappings[pagePath]|| !cardMappings[pagePath][key]) return null 
  return {
    ...cardMappings[pagePath][key],
    value : apiData[key]
  }
 })

 
  // const cardsPages = Object.keys(cardsData);
  // let cardsInfo = [];

  

  // cardsPages.forEach((cardPage) => {
    
  //   if (mainPages[cardPage] === pageTitle) {
  //     cardsInfo = [...cardsData[cardPage]];
  //   }
  // });


  return (
    <div  className={`${styles.cardcontainer} ${className}`}>
      {cardsInfo.map((card,i) => (
        <div key ={i} className={styles.cardItem}>
           <div>
            <p className={styles.cardTitle}>{card.title}</p>
            <div style={{backgroundColor :card.backgroundColor }} className={styles.iconContainer}>
              <img src={card.icon} alt="" className={styles.cardIcon}/>
            </div>
            </div>
            <div className={styles.cardText}>
            {card.type === 'number'? 
              <p className={`${styles.cardValue}`}>{card.value}</p> :
                <p className={`${styles.cardInsight} ${
                (card.title === 'Worst Shipping Route' || card.title === 'Slowest Shipping Route') 
                ? styles.redinsight 
                  : ''
                }`}>{card.value}</p>}
    
            </div>
        </div>
      ))}
      
      
    </div>
  );
}
export default InsightCard;
