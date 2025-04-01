import { createContext, useContext } from "react"
import { useState } from "react"

const dashboard = createContext()
function DashboardProvider({children}){
    const [filters,setFilters] = useState({
            'numberofshipments' : {
                'month' : 'March',
                'year' : '2024'
            },
            'perfectorders' : {
                'year' : '2021'




            }
        })
    return(
        <dashboard.Provider
        value={{
            filters,
            setFilters
        }}
        >
            {children}

        </dashboard.Provider>
        
    )
}
function useDashboard (){
    const context = useContext(dashboard)
    if(context === undefined) throw new Error('You might have used the dashboard context in outside the dashboardprovider')
    return context

}
export {useDashboard,DashboardProvider}