import styles from "./InsightCard.module.css";
import {
  cardsData,
  mainPages,
} from "../../../public/project-data-files/MainPages";
import { useLocation } from "react-router-dom";
function InsightCard({ className }) {
  const location = useLocation();
  const pageTitle = mainPages[location.pathname] || "";
  const cardsPages = Object.keys(cardsData);
  let cardsInfo = [];
  console.log(cardsPages);

  cardsPages.forEach((cardPage) => {
    if (mainPages[cardPage] === pageTitle) {
      cardsInfo = [...cardsData[cardPage]];
    }
  });
  // console.log(cardsInfo);
  return (
    <div className={`${styles.cardcontainer} ${className}`}>
      {cardsInfo.map((card, i) => (
        <div key={i} className={styles.carditem}>
          <p>{card.icon}</p>
          <p>{card.title}</p>
          <p>{card.value}</p>
        </div>
      ))}
    </div>
  );
}
export default InsightCard;
