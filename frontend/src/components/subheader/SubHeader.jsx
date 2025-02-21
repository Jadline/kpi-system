import styles from './SubHeader.module.css'
function SubHeader(){
    return(
        <div className={styles.subheader}>
            <div className={styles.modes}>
                <p role='button'>Air</p>
                <p role ='button'>Sea</p>
            </div>
            <div className={styles.filters}>
                <img src='./icons/filter.png' alt='' role='button'/>
                <p>filter by date</p>
            </div>
        </div>
    )
}
export default SubHeader