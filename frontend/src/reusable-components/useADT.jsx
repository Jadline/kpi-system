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
    const ADTdata = data?.countryData?.map(({country,average_delivery_air,average_delivery_sea}) => ({
        name : country === "Netherlands" ? 'Nether Lands' : country,
        air : average_delivery_air,
        sea : average_delivery_sea
      }))
      const shippingtabledata = data?.countryData?.map(({country,average_delivery_air,average_delivery_sea,goal_air,goal_sea,status}) => ({
        country : country,
        avgByAir : average_delivery_air,
        goalByAir : goal_air,
        avgBySea : average_delivery_sea,
        goalBySea : goal_sea,
        status : status
      }))
      
      
    const ADTareadata = data?.monthlyData?.map(({month,average_delivery_air,average_delivery_sea}) => ({
      month : month,
      air : average_delivery_air,
      sea : average_delivery_sea
    }))
    const avg_ADT_by_air = data?.average_delivery_time_by_air
    const avg_ADT_goal_by_air = data?.average_goal_by_air
    const avg_ADT_by_sea = data?.average_delivery_time_by_sea
    const avg_ADT_goal_by_sea = data?.average_goal_by_sea
    return {data,isLoading,error, ADTdata,shippingtabledata,ADTareadata,avg_ADT_by_air,avg_ADT_by_sea,avg_ADT_goal_by_air,avg_ADT_goal_by_sea}
}
export default useADT