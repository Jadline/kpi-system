import axios from "axios";

export async function fetchPOR(year,mode){
     try {
          
        const {data} = await axios.get(`http://localhost:4000/api/perfect-order?year=${year}&mode=${mode}`)
        return data
    }
    catch(error){
        console.error('There was an error fetching por data',error)
        
    }

}