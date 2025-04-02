import { useQuery } from "@tanstack/react-query"
import { useDashboard } from "../context/state-Context"
import { useState } from "react"
import { fetchPOR } from "../Services/apiPOR"
function usePOR(){
    const [mode,setMode] = useState('air')
    const{filters,setFilters} = useDashboard()
    const yearOrders = filters.perfectorders?.year

    console.log('filters',filters)
    console.log('year orders',yearOrders)
    console.log('mode',mode)
    
    const{data,isLoading,error} = useQuery({
        queryKey : ['perfectorders',yearOrders,mode],
        queryFn : () => fetchPOR(yearOrders,mode),
        enabled : !!yearOrders && !! mode
    })
    console.log('fetched data',data)
    return {data,isLoading,error}




    
}
export default usePOR