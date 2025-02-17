import styles from "./InsightCard.module.css";
import {
  cardsData,
  mainPages,
} from "../../../public/project-data-files/MainPages";
import { useLocation } from "react-router-dom";
function InsightCard({ className }) {
  const location = useLocation();
  const pageTitle = mainPages[location.pathname] || "";
  const cardspages = Object.keys(cardsData);
  let cardinfo = [];
  //   console.log(cardspages);

  cardspages.forEach((cardpage) => {
    if (mainPages[cardpage] === pageTitle) {
      cardinfo = [...cardsData[cardpage]];
    }
  });
  console.log(cardinfo);
  return (
    <div className={`${styles.cardcontainer} ${className}`}>
      {cardinfo.map((card, i) => (
        <div key={i} className={styles.carditem}>
          {/* {console.log({ ...card })} */}
          <p>{card.icon}</p>
          <p>{card.title}</p>
          <p>{card.value}</p>
        </div>
      ))}

      {/* <div className={styles.carditem}>Total damages</div>
            <div className={styles.carditem}>Complete Orders</div>
            <div className={styles.carditem}>Incomplete Orders</div>
            <div className={styles.carditem}>untimely deliveries</div> */}
    </div>
  );
}
export default InsightCard;
