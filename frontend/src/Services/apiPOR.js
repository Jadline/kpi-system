import axios from "axios";

export async function fetchPOR(year,mode){
    if(!year || !mode) throw new Error(`Invalid parameters year=${year} , mode=${mode} `)
    const response = await axios.get(`http://localhost:4000/api/shipments?year=${year}&month=${mode}`)
    return response.data

}