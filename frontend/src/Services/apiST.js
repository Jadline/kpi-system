import axios from "axios";
export async function fetchShippingData(year,month){
    try {
        const {data} = await axios.get(`http://localhost:4000/api/shipping-time?year=${year}&month=${month}`)
        return data
    }
    catch(error){
        console.log('There was an error fetching data',error)
    }
}