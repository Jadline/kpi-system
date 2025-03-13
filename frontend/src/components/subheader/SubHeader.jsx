import ModeButton from '../../reusable-components/Button'
import MonthDropDown from '../../reusable-components/MonthDropDown'
import { useGetLocation } from '../../reusable-components/useGetLocation'
import YearDropDown from '../../reusable-components/YearDropDown'
import styles from './SubHeader.module.css'
import { useEffect, useState } from 'react'
function SubHeader({className}){
    const [mode,setMode] = useState('air')
    const pageTitle = useGetLocation()
    const dropdowns  = {
        'Perfect Order Rate' : (
            <div className={`${styles.subheader} ${className}`}>
                <span>Sort by Year<YearDropDown/></span>
                <ModeButton mode={mode} setMode={setMode}/>
            </div>
        ),
        'Number of Shipments' : (
            <div className={`${styles.subheader} ${className}`}>
                <MonthDropDown/>
                <YearDropDown/>
            </div>
        ),
        'Average Delivery Time': (
            <div className={`${styles.subheader} ${className}`}>
                <span>Sort by Year<YearDropDown/></span>
            </div>
        ),
        'Shipping Time' :(
            <div className={`${styles.subheader} ${className}`}>
                <MonthDropDown/>
                <YearDropDown/>
            </div>
        ),
        'Transportation Cost': (
            <div className={`${styles.subheader} ${className}`}>
                <span>Sort by Year<YearDropDown/></span>
            </div>
        )

        
    }
    return (
        dropdowns[pageTitle] || null
    )
   
}
export default SubHeader