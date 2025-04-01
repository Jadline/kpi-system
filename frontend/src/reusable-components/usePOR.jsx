import { useQuery } from "@tanstack/react-query"
import { useDashboard } from "../context/state-Context"
import { useState } from "react"
import { fetchPOR } from "../Services/apiPOR"
function usePOR(){
    const [mode,setMode] = useState('air')
    const{filters,setFilters} = useDashboard()
    
    const{data,isLoading,error} = useQuery({
        queryKey : ['perfectorders',filters.perfectorders?.year,mode],
        queryFn : () => fetchPOR(filters.perfectorders?.year,mode),
        enabled : !!filters.perfectorders?.year && !! mode
    })

    return {data,isLoading,error}




    
}
export default usePOR