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
        const NOSpiedata = [
            { category: "air", no_shipments: data?.shipments_by_air || 0 },
            { category: "sea", no_shipments: data?.shipments_by_sea || 0 },
          ];
          const stackedData = data?.countries?.map(({country,shipments_by_air,shipments_by_sea}) => ({
            name : country,
            air : shipments_by_air,
            sea : shipments_by_sea
          }))
         
    return {data,isLoading,error,NOSpiedata,stackedData}
    
}
export default useShipments 