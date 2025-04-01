import axios from "axios"
export async function fetchShipments(year,month){
    if(!year || !month){
        throw new Error(`Invalid parameters: year=${year}, month=${month}`);
    }
    const {data} = await axios.get(`http://localhost:4000/api/shipments?year=${year}&month=${month}`)

    return data

}