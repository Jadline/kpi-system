import { Navigate } from "react-router-dom";
import { useUser } from "../context/user-Context";
function ProtectedRoute({children}){
    const {userData} = useUser()
    if(!userData){
        return <Navigate to='/account' replace/>
    }
    return children

}
export default ProtectedRoute