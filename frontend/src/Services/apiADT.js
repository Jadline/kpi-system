import axios from "axios";

 export async function fetchDeliveryData(year){
    try {
        const {data} = await axios.get(`http://localhost:4000/api/delivery-time?year=${year}`)
        
        return data
    }
    catch(error){
        console.error('There was an error fetching data',error)
    }
}