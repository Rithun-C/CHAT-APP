import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { Loader2Icon } from "lucide-react";

function ProtectedRoute(props){
    const {userData,loading}= useAuth();
    const children =props.children;
    if(loading){
      return <div className="w-screen h-screen flex items-center justify-center bg-slate-200">
        <Loader2Icon className="w-10 h-10 animate-spin"/>
      </div>
    }
    if (userData){
      return children
    }
    else{
      return <Navigate to='/login'></Navigate>
    }
  }

  export default ProtectedRoute;