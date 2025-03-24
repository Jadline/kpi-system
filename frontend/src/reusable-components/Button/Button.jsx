import styles from './Button.module.css';

function ModeButton({ mode, setMode, buttonPadding = "1rem 4rem" }) {
  return (
    <div className={styles.buttonContainer}>
      <button 
        onClick={() => setMode("air")} 
        className={styles.filter}
        style={{
          background: mode === "air" ? "#0077b6" : "gray",
          padding: buttonPadding,
        }}
      >
        Air
      </button>
      <button 
        onClick={() => setMode("sea")} 
        className={styles.filter}
        style={{ 
          background: mode === "sea" ? "#0077b6" : "gray",
          padding: buttonPadding,
        }}
      >
        Sea
      </button>
    </div>
  );
}

export default ModeButton;
