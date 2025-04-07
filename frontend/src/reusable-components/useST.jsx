import { useDashboard } from "../context/state-Context"
import { useQuery } from "@tanstack/react-query"
import { fetchShippingData } from "../Services/apiST"
function useST(){
    const{filters} = useDashboard()
    const monthlyshippingtime = filters.shippingtime?.month
    const yearlyshippingtime = filters.shippingtime?.year
    const mode = filters.shippingtime?.mode
    
    const {data,isLoading,error} = useQuery({
        queryKey : ['shippingtime',yearlyshippingtime,monthlyshippingtime,mode],
        queryFn : () => fetchShippingData(yearlyshippingtime,monthlyshippingtime,mode),
        enabled : !!yearlyshippingtime && !! monthlyshippingtime && !! mode
    })
    const shippingTimeData = data?.monthly_shipping_time?.map(({month,average_shipping_time_air,average_shipping_time_sea}) => ({
        month : month,
        air : average_shipping_time_air,
        sea : average_shipping_time_sea
      }))
      const stackedData = data?.country_shipping_time?.map(({country,average_shipping_time_air,average_shipping_time_sea}) => ({
        name: country === 'Netherlands' ? 'Nether lands' : country,
        air : average_shipping_time_air,
        sea : average_shipping_time_sea
      }))

     
    const normalizedMode = mode?.charAt(0).toUpperCase() + mode?.slice(1).toLowerCase();

    const averageKey = `average_shipping_time_${normalizedMode}`;
    const goalKey = `goal_${normalizedMode}`;

    const shippingData = data?.country_progress?.map((item) => ({
      country: item.country,
      averageShippingTime: item[averageKey],
      goal: item[goalKey],
    })) || [];

   return {data,isLoading,error,shippingTimeData,stackedData,shippingData}
}
export default useST