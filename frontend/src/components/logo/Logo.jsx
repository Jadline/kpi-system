import styles from './Logo.module.css'
function Logo(){
    return(
        <div className={styles.logoContainer}>
            <img src="./logo/rolling-cargo.png" alt="" />
            <h2>Rolling Cargo Shipping Company</h2>
        </div>
    )
}
export default Logo