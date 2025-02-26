import styles from './TC-progress.module.css'

function TCProgressBar({data,className}){
    return(
        <div className={`${className} ${styles.budget}`}>
            <div className={styles.budgetinfo}>
                <h3>Budget Performance</h3>
                <div className={styles.budgetUsed}>
                    <div ></div>
                    <p>Budget Used</p>
                </div>
                <div className={styles.totalbudget}>
                    <div ></div>
                    <p>Budget</p>
                </div>
                <div className={styles.totalcost}>
                    <p>Total Cost </p>
                    <p>$1.2M</p>
                </div>
            </div>
            {data.map((budgetitem,i) => (
                <div key={i} className={styles.budgetContainer}>
                <p className={styles.countryName}>
                    {budgetitem.country.toLowerCase() === 'south africa' ? 'SA' : 
                     budgetitem.country.toLowerCase() === 'netherlands' ? 'NL' :
                     budgetitem.country
                    }
                </p>
                <progress key={i} value={budgetitem.actualSpending} max={budgetitem.budget}>

                </progress>
                <p className={styles.percentage}>{budgetitem.percentageUsed} %</p>
                
                </div>
            ))}
        </div>
    )
}
export default TCProgressBar