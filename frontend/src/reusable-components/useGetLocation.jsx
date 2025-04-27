import { useLocation } from "react-router-dom";
import { mainPages } from "../../public/project-data-files/MainPages";
export function useGetLocation(){
    const location = useLocation();
    
    
    const pageTitle = mainPages[location.pathname] || "";
   
    return pageTitle
}
