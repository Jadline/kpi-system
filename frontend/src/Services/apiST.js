import axios from "axios";
const MAP_URL = "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson";
const COUNTRIES_URL = 'https://restcountries.com/v3.1/all';
export async function fetchShippingData(year,month,mode){
    try {
        const {data} = await axios.get(`http://localhost:4000/api/shipping-time?year=${year}&month=${month}&mode=${mode}`)
        return data
    }
    catch(error){
        console.log('There was an error fetching data',error)
    }
    
}

export async function fetchMapData() {
  try {
    const response = await axios.get(MAP_URL);
    if (response.status !== 200)
      throw new Error('There was an error fetching data');
    return response?.data?.features;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch map data');
  }
}

export async function fetchCountriesData() {
  try {
    const response = await axios.get(COUNTRIES_URL);
    if (Array.isArray(response.data)) return response.data;
    if (typeof response.data === 'object' && response.data !== null) return [response.data];
    
    return [response.data];
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch countries data');
  }
}