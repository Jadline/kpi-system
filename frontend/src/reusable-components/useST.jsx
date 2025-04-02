import { useDashboard } from "../context/state-Context"
import { useQuery } from "@tanstack/react-query"
import { fetchShippingData } from "../Services/apiST"
function useST(){
    const{filters,setFilters} = useDashboard()
    const monthlyshippingtime = filters.shippingtime?.month
    const yearlyshippingtime = filters.shippingtime?.year
    
    const {data,isLoading,error} = useQuery({
        queryKey : ['shippingtime',yearlyshippingtime,monthlyshippingtime],
        queryFn : () => fetchShippingData(yearlyshippingtime,monthlyshippingtime),
        enabled : !!yearlyshippingtime && !! monthlyshippingtime
    })
   return {data,isLoading,error}
}
export default useST