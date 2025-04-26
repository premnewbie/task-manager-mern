import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore.js";
import { useEffect, useState } from "react";

const RedirectUnAuthenticatedUsers = ({ children }) => {
  const { user,isLoading } = useAuthStore();
  const navigate = useNavigate();

  const [isMounted, setIsMounted] = useState(false);


  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if(isMounted && !user && !isLoading){
      navigate('/login')
    }
  },[isMounted,navigate,user,isLoading])


  if (!user) {
    return null;
  }

  return <>{children}</>;
};

export default RedirectUnAuthenticatedUsers;
