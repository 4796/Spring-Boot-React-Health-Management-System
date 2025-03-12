import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../services/session";
import Spinner from "./Spinner";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // isLoggedIn().then((data) => {
    //   setUser(data);
    //   setLoading(false);
    // });
    setUser(isLoggedIn());
    setLoading(false);
  }, []);

  if (loading) return <Spinner loading={loading} />;
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
