import { useQuery } from "@tanstack/react-query"
import { useDashboard } from "../context/state-Context"
import { useState } from "react"
import { fetchPOR } from "../Services/apiPOR"
function usePOR(){
    const{filters} = useDashboard()
    const yearOrders = filters.perfectorders?.year
    const mode = filters.perfectorders?.mode

    console.log('filters',filters)
    console.log('year orders',yearOrders)
    console.log('mode',mode)
    
    const{data,isLoading,error} = useQuery({
        queryKey : ['perfectorders',yearOrders,mode],
        queryFn : () => fetchPOR(yearOrders,mode),
        enabled : !!yearOrders && !! mode
    })
    const porData = data?.pefect_order_rate_by_year 
    ? data?.pefect_order_rate_by_year.map(({ month, perfect_order_rate }) => ({
        month,
        por: parseFloat(perfect_order_rate) || 0
    })) 
    : [];

    const januaryPOR = data?.perfect_order_rate_by_route
    .reduce((acc, { country, perfect_order_rate }) => {
        const por = parseFloat(perfect_order_rate);

        if (!acc[country]) {
            acc[country] = [];
        }

        acc[country].push(por);

        return acc;
    }, {}) 
   
    ? Object.entries(data?.perfect_order_rate_by_route.reduce((acc, { country, perfect_order_rate }) => {
        const por = parseFloat(perfect_order_rate);

        if (!acc[country]) {
            acc[country] = [];
        }

        acc[country].push(por);

        return acc;
    }, {}))
        .map(([country, rates]) => ({
            country,
            por: (rates.reduce((sum, rate) => sum + rate, 0) / rates.length).toFixed(2),
        }))
    : [];  

    const donutData = [
        {category : 'Timely Deliveries', value : data?.timely_deliveries},
        {category : 'Untimely Deliveries',value : data?.untimely_deliveries},
        {category : 'Complete Orders', value : data?.complete_orders}
    ]
 
    return {data,isLoading,error,porData,januaryPOR,donutData}




    
}
export default usePOR