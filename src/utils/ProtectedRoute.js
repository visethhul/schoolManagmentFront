import { Navigate } from "react-router-dom"
import { getIsLogin } from "./userAuth"



const ProtectedRoute = ({children}) =>{
 const isLogin = getIsLogin()

 if(!isLogin){
  // Redirect to the login page if not logged in
  return <Navigate to="/login" />
 }
 // Render the children if logged in 
 return children
}
export default ProtectedRoute