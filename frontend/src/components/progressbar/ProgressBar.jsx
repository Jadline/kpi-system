import styles from './ProgressBar.module.css'
import Progress from '../progress/Progress';
import { useUI } from '../../context/UI-Context';
import ModeButton from '../../reusable-components/Button/Button';
import { useState } from 'react';
import { useDashboard } from '../../context/state-Context';
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
    console.log('progress data',data)
    const {filters,setFilters} = useDashboard()
    const mode = filters?.shippingtime.mode
    const {isdarkmode} = useUI()
    const filteredCountries = data?.filter((country) => {
       return selectedCountries.includes(country.name.common)
    })
    // console.log(filteredCountries)
    function handleFiltersChange(section,key,value){
        setFilters((prev) =>(
            {
                ...prev,
                [section] : {
                    ...prev[section],
                    [key] : value
                }
            }
        ))
        
    }
    return(
        <div className={`${className || ''} ${styles.progressInsights}`}>
            <ModeButton mode={mode} setMode={(value) => handleFiltersChange('shippingtime','mode',value)} buttonPadding='.8rem 2.2rem'/>
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