import styles from "./InsightCard.module.css";
import { mainPages } from "../../../public/project-data-files/MainPages";
import { useLocation } from "react-router-dom";
import useShipments from "../../reusable-components/useShipments";
import { cardMappings } from "../../../public/project-data-files/data";
import usePOR from "../../reusable-components/usePOR";
import PerfectOrderRate from "../../pages/perfect-order-rate/PerfectOrderRate";
import useST from "../../reusable-components/useST";
import useADT from "../../reusable-components/useADT";
import Spinner from "../Spinner/Spinner";
import useTC from "../../reusable-components/useTC";
import { FaInfo } from "react-icons/fa";

import { Tooltip } from 'react-tooltip';



function InsightCard({ className }) {
  const location = useLocation();
  const pagePath = location.pathname;
  const pageTitle = mainPages[pagePath] || "";



  const shipmentsQuery = useShipments();
  const PerfectordersQuery = usePOR()
  const shippingtimeQuery = useST()
  const deliverytimeQuery = useADT()
  const transportationQuery = useTC()

  const apiHooks = {
    "/number-of-shipments": shipmentsQuery,
    '/' : PerfectordersQuery,
    '/shipping-time' : shippingtimeQuery,
    '/average-delivery-time' : deliverytimeQuery,
    '/transportation-cost' : transportationQuery
  };

  const { data: apiData, isLoading, error } = apiHooks[pagePath] || { data: null, isLoading: false, error: null };

  if (isLoading) return <Spinner/>;

  if (error) return <p>{error.message}</p>;

  if (!apiData) return <p>No data available</p>;

  
  

  

 
  const cardsInfo = Object.keys(apiData)?.map((key) => {
    
   
    
    if (!cardMappings[pagePath] || !cardMappings[pagePath][key]) return null;
  
   
    return {
      ...cardMappings[pagePath][key],
      value: apiData[key],
    };
  }).filter(Boolean);

  return (
    <div className={`${styles.cardcontainer} ${className}`}>
      {cardsInfo.length > 0 ? (
        cardsInfo.map((card, i) => (
          <div key={i} className={styles.cardItem}>
            <div>
              <p className={styles.cardTitle}>
                {card.title}
              
              </p>
              <div style={{ backgroundColor: card.backgroundColor }} className={styles.iconContainer}>
                <img src={card.icon} alt="" className={styles.cardIcon} />
              </div>
            </div>
            <div className={styles.moreinfo}>
    
            <div className={styles.cardText}>
              {card.type === "number" ? (
                <p className={`${styles.cardValue}`}>{card.value}</p>
              ) : (
                <p
                  className={`${styles.cardInsight} ${
                    card.title === "Worst Shipping Route" || card.title === "Slowest Shipping Route"
                      ? styles.redinsight
                      : ""
                  }`}
                >
                  {card.value}
                </p>
              )}
            </div>
            {card.tooltip && <span 
  className={styles.tooltipIcon}
  data-tooltip-id={`tooltip-${i}`}
  data-tooltip-content={card.tooltip}
>
  <FaInfo color="#fff" />
</span>}
<Tooltip 
  id={`tooltip-${i}`} 
  place="top"
  style={{ backgroundColor: "#333", color: "#fff" ,fontSize:'1.6rem'}}
/>

            </div>
            
          </div>
        ))
      ) : (
        <p>No card data available</p> 
      )}
    </div>
  );
}

export default InsightCard;
