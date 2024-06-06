import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userData, setUserData] = useState(localStorage.getItem("userData"));
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [readyData, setReadyData] = useState(false);
  const [services, setServices] = useState([]);
  const API = import.meta.env.VITE_APP_API_URL;
  const Stripe_Publishable_Key = import.meta.env
    .VITE_APP_Stripe_Publishable_Key;
  const authorizationToken = `Bearer ${token}`;

  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    localStorage.setItem("token", serverToken);
  };

  const storeUserDataInLS = (userData) => {
    setUserData(userData);
    localStorage.setItem("userData", userData);
  };

  const isLoggedIn = !!token;

  const LogoutUser = () => {
    setToken("");
    setUserData("");
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
  };

  const userAuthentication = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API}/api/auth/user`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data.userData);
        setLoading(false);
        setReadyData(true);
      } else {
        console.log("Error fetching userdata...");
        setLoading(false);
      }
    } catch (error) {
      console.log("Error fetching user data", error);
    }
  };

  useEffect(() => {
    userAuthentication();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        storeTokenInLS,
        storeUserDataInLS,
        LogoutUser,
        user,
        services,
        authorizationToken,
        loading,
        API,
        Stripe_Publishable_Key,
        setUser,
        readyData,
        setReadyData,
        userData,
        setUserData,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("Error in authContext...");
  }
  return authContextValue;
};
