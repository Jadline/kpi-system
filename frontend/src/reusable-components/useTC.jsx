import { useDashboard } from "../context/state-Context";
import { fetchTransportationCost } from "../Services/apiTC";
import { useQuery } from "@tanstack/react-query";
function useTC() {
    const { filters } = useDashboard();
    const year = filters?.transportationcost?.year;

    const { data, isLoading, error } = useQuery({
        queryKey: ['transportationcost', year],
        queryFn: () => fetchTransportationCost(year),
        enabled: !!year,
    });
    const Tcpiedata = [
        {category : 'air',average_cost : data?.total_cost_air},
        {category : 'sea',average_cost : data?.total_cost_sea}
    ]
   
    const transportationCostData = data?.costPerShipmentOverTime?.map(({month,cost_per_shipment_air,cost_per_shipment_sea}) => ({
        month : month,
        airCost : cost_per_shipment_air,
        seaCost : cost_per_shipment_sea
    }))
    
   const transportCostUsage = data?.budgetPerfomance?.map(({country,total_budget,total_budget_used}) => ({
    country:country,
    budget : total_budget,
    actualSpending : total_budget_used,
    percentageUsed : (total_budget_used/total_budget) * 100
   }))
   const total_transportation_cost = data?.total_transportation_cost

    const totalBudget = transportCostUsage?.reduce((sum, item) => sum + (item.budget || 0), 0) || 0;
    const totalUsed = transportCostUsage?.reduce((sum, item) => sum + (item.actualSpending || 0), 0) || 0;


    

    

    return {Tcpiedata, isLoading, error,data,transportationCostData,transportCostUsage,total_transportation_cost,totalBudget,totalUsed};
}
export default useTC
