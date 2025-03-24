import styles from './ProgressBar.module.css'
import Progress from '../progress/Progress';
import { useUI } from '../../context/UI-Context';
import ModeButton from '../../reusable-components/Button/Button';
import { useState } from 'react';
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
    const[mode,setMode] = useState('sea')
    const {isdarkmode} = useUI()
    const filteredCountries = data?.filter((country) => {
       return selectedCountries.includes(country.name.common)
    })
    // console.log(filteredCountries)
    return(
        <div className={`${className || ''} ${styles.progressInsights}`}>
            <ModeButton mode={mode} setMode={setMode} buttonPadding='.8rem 2.2rem'/>
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