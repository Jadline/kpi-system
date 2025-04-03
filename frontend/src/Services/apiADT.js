import axios from "axios";

 export async function fetchDeliveryData(year){
    try {
        const {data} = await axios.get(`http://localhost:4000/api/delivery-time?year=${year}`)
        console.log(data)
        return data
    }
    catch(error){
        console.log('There was an error fetching data',error)
    }
}