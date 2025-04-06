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

      const airShippingData = data?.country_shipping_time?.map(({ country, average_shipping_time_air,goal_air }) => ({
        country: country,
        averageShippingTime: average_shipping_time_air,
        goal: goal_air,
    })) || [];
   return {data,isLoading,error,shippingTimeData,stackedData,airShippingData}
}
export default useST