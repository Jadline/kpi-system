import styles from "./InsightCard.module.css";
import { mainPages } from "../../../public/project-data-files/MainPages";
import { useLocation } from "react-router-dom";
import useShipments from "../../reusable-components/useShipments";
import { cardMappings } from "../../../public/project-data-files/data";

function InsightCard({ className }) {
  const location = useLocation();
  const pagePath = location.pathname;
  const pageTitle = mainPages[pagePath] || "";

  const shipmentsQuery = useShipments();

  const apiHooks = {
    "/number-of-shipments": shipmentsQuery,
  };

  const { data: apiData, isLoading, error } = apiHooks[pagePath] || { data: null, isLoading: false, error: null };

  if (isLoading) return <p>Loading data...</p>;

  if (error) return <p>{error.message}</p>;

  if (!apiData) return <p>No data available</p>;

  
  const apiProperties = Object.keys(apiData)
    .filter((key) => key !== "countries")
    .slice(0,3)

  console.log(apiProperties)

 
  const cardsInfo = apiProperties.map((key) => {
    
    console.log(`Mapping for key: ${key}`, cardMappings[pagePath]?.[key]);
  
    
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
              <p className={styles.cardTitle}>{card.title}</p>
              <div style={{ backgroundColor: card.backgroundColor }} className={styles.iconContainer}>
                <img src={card.icon} alt="" className={styles.cardIcon} />
              </div>
            </div>
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
          </div>
        ))
      ) : (
        <p>No card data available</p> 
      )}
    </div>
  );
}

export default InsightCard;
