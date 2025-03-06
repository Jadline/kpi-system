import styles from './ProgressBar.module.css'
import Progress from '../progress/Progress';
import { useUI } from '../../context/UI-Context';
const selectedCountries = [
    "China",
    "United Kingdom",
    "United Arab Emirates",
    "Italy",
    "Turkey",
    "Netherlands",
    "South Africa",
  ];
function ProgressBar({className,data}){
    const {isdarkmode} = useUI()
    const filteredCountries = data?.filter((country) => {
       return selectedCountries.includes(country.name.common)
    })
    // console.log(filteredCountries)
    return(
        <div className={`${className || ''} ${styles.progressInsights}`}>
            {filteredCountries.map((country,i) => (
                <div key={i} className={styles.progressContainer}>
                    <img src={country.flags.png} alt="" className={isdarkmode ? "dark-avatar" : ''} />
                    <Progress countryName={country.name.common}/>

                </div>
            ))}
        </div>
    )
}
export default ProgressBar