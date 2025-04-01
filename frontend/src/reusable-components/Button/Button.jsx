import { useUI } from '../../context/UI-Context';
import { useResize } from '../useResize';
import styles from './Button.module.css';

function ModeButton({className, mode, setMode, buttonPadding = "1rem 4rem" }) {
  const {isMobile} = useResize()
  return (
    <div className={`${styles.buttonContainer} `}>
      <button 
        onClick={() => setMode("air")} 
        className={`${styles.filter} ${className}`}
        style={{
          background: mode === "air" ? "#0077b6" : "gray",
          '--button-padding': buttonPadding,
        }}
      >
        Air
      </button>
      <button 
        onClick={() => setMode("sea")} 
        className={`${styles.filter} ${className}`}
        style={{ 
          background: mode === "sea" ? "#0077b6" : "gray",
          '--button-padding': buttonPadding,
        }}
      >
        Sea
      </button>
    </div>
  );
}

export default ModeButton;
