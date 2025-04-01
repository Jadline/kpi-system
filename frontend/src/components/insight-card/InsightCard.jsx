import styles from "./InsightCard.module.css";
import {
  cardsData,
  mainPages,
} from "../../../public/project-data-files/MainPages";
import { useLocation } from "react-router-dom";
import { Query, useQuery } from "@tanstack/react-query";
import { fetchShipments } from "../../Services/apiNOS";
import useShipments from "../../reusable-components/useShipments";

function InsightCard({ className }) {
  const location = useLocation();
  const pageTitle = mainPages[location.pathname] || "";
  const cardsPages = Object.keys(cardsData);
  let cardsInfo = [];

  const {data} = useShipments()

  cardsPages.forEach((cardPage) => {
    
    if (mainPages[cardPage] === pageTitle) {
      cardsInfo = [...cardsData[cardPage]];
    }
  });


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
