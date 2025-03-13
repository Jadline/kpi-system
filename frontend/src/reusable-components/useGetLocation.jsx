import { useLocation } from "react-router-dom";
import { mainPages } from "../../public/project-data-files/MainPages";
export function useGetLocation(){
    const location = useLocation();
    console.log("Current Path:", location.pathname); 
    
    const pageTitle = mainPages[location.pathname] || "";
    console.log("Page Title:", mainPages[location.pathname]); 

    return pageTitle
}
