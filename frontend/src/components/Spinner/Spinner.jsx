import styles from './Spinner.module.css';

function Spinner() {
    return (
        <div className={styles.SpinnerContainer}>
            <div className={styles.spinner}></div>
        </div>
    );
}

export default Spinner;
