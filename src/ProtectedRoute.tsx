
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext.tsx";

const ProtectedRoute = () => {
  const { user, isAuthenticated, loading} = useAuth();
  console.log(user, isAuthenticated, loading);
  
  if(loading){
    return <h1>Cargando...</h1>
  }
  if (!loading && !isAuthenticated) return <Navigate to ='/login' replace />

  return(
    <>
      <Outlet/>
    </>
  )
}

export default ProtectedRoute;