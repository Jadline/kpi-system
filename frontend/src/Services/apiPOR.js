import axios from "axios";

export async function fetchPOR(year,mode){
     try {
        console.log(`Fetching POR data for year=${year}, mode=${mode}...`);  
        const {data} = await axios.get(`http://localhost:4000/api/perfect-order?year=${year}&mode=${mode}`)
        return data
    }
    catch(error){
        console.log('There was an error fetching por data',error)
        // if(!year || !mode) throw new Error(`Invalid parameters year=${year} , mode=${mode} `)
    }

}