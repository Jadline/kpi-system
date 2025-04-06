import { fetchCountriesData } from "../Services/apiST";
import { fetchMapData } from "../Services/apiST";
import { useQuery } from "@tanstack/react-query";
function useMapdata(){

    const { data: mapdata, error: mapError, isLoading: isLoadingMapData } = useQuery({
        queryKey: ['Mapdata'],
        queryFn: fetchMapData,
      });
      const { data: countries, error: countriesError, isLoading: isLoadingCountries } = useQuery({
        queryKey: ['Countriesdata'],
        queryFn: fetchCountriesData,
      });
      return{mapdata,countries,mapError,countriesError,isLoadingCountries,isLoadingMapData}
    
}
export default useMapdata