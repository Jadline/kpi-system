import { useQuery } from '@tanstack/react-query'
import ModeButton from '../../reusable-components/Button/Button'
import MonthDropDown from '../../reusable-components/MonthDropDown'
import { useGetLocation } from '../../reusable-components/useGetLocation'
import YearDropDown from '../../reusable-components/YearDropDown'
import styles from './SubHeader.module.css'
import { useEffect, useState } from 'react'
import { fetchShipments } from '../../Services/apiNOS'
import { useDashboard } from '../../context/state-Context'
function SubHeader({className}){
    
  
    const {filters,setFilters} = useDashboard()
    const pageTitle = useGetLocation()
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
    const dropdowns  = {
        'Perfect Order Rate' : (
            <div className={`${styles.subheader} ${className} ${styles.por}`}>
                <span><p className={styles.mobilehidden}>Sort by Year</p>
                <YearDropDown
                 year={filters.perfectorders.year} 
                 setYear={(value) => handleFiltersChange('perfectorders','year',value)}/>
                </span>
                <ModeButton 
                mode={filters.perfectorders.mode} 
                setMode={(value) => handleFiltersChange('perfectorders','mode',value)} 
                className={styles.sidebarfilters}/>
            </div>
        ),
        'Number of Shipments' : (
            <div className={`${styles.subheader} ${className}`}>
                <MonthDropDown 
                month={filters.numberofshipments.month} 
                setMonth={(value) => handleFiltersChange('numberofshipments','month',value)}
                />
                <YearDropDown
                 year={filters.numberofshipments.year} 
                 setYear={(value) => handleFiltersChange('numberofshipments','year',value)}/>
            </div>
        ),
        'Average Delivery Time': (
            <div className={`${styles.subheader} ${className}`}>
                <span><p>Sort by Year</p>
                <YearDropDown
                year={filters.deliverytime.year}
                setYear={(value) => handleFiltersChange('deliverytime','year',value)}
                />
                </span>
            </div>
        ),
        'Shipping Time' :(
            <div className={`${styles.subheader} ${className}`}>
                <MonthDropDown 
                month={filters.shippingtime.month}
                setMonth={(value) => handleFiltersChange('shippingtime','month',value)}
                />
                <YearDropDown
                year={filters.shippingtime.year}
                setYear={(value) => handleFiltersChange('shippingtime','year',value)}
                />
            </div>
        ),
        'Transportation Cost': (
            <div className={`${styles.subheader} ${className}`}>
                <span>Sort by Year<YearDropDown
                year={filters.transportationcost.year}
                setYear={(value) => handleFiltersChange('transportationcost','year',value)}
                /></span>
            </div>
        )

        
    }
    
    return (
        dropdowns[pageTitle] || null
    )
   
}
export default SubHeader