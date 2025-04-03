import { useDashboard } from "../context/state-Context"
import { useQuery } from "@tanstack/react-query"
import { fetchDeliveryData } from "../Services/apiADT"
function useADT(){
    const{filters} = useDashboard()
    const yeardeliverytime = filters?.deliverytime?.year
    const {data,isLoading,error} = useQuery({
        queryKey : ['deliverytime',yeardeliverytime],
        queryFn : () => fetchDeliveryData(yeardeliverytime),
        enabled : !!yeardeliverytime
    })
    
    return {data,isLoading,error}
}
export default useADT