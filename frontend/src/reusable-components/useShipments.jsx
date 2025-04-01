import { useQuery } from "@tanstack/react-query"
import { fetchShipments } from "../Services/apiNOS"
import { useDashboard } from "../context/state-Context"
function useShipments(){
    const {filters,setFilters} = useDashboard()
    const monthshipments = filters?.numberofshipments?.month
    const yearshipments = filters?.numberofshipments?.year

     const{data,isLoading,error} = useQuery({
            queryKey : ['shipments',yearshipments,monthshipments],
            queryFn : () => fetchShipments(yearshipments,monthshipments),
            enabled : !!monthshipments && !!yearshipments
        })
    return {data,isLoading,error}
    
}
export default useShipments 