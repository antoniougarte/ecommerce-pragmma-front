import { createContext, useState, ReactNode, useContext, useEffect } from "react";
import { loginRequest, registerRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";

export interface User {
  name?: string;
}

export interface registerUser {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface loginUser {
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  signUp: (user: registerUser) => void;
  signIn: (user: loginUser) => void;
}

const defaultAuthContextValue: AuthContextType = {
  user: null,
  isAuthenticated: false,
  loading: true,
  signUp: async () => {},
  signIn: async () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContextValue);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an authProvider");
  }
  return context;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const signUp = async (user: registerUser) => {
    console.log('input here', user);
    try {
      const response = await registerRequest(user);
      console.log("response here", response);
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error during sign up", error);
      setIsAuthenticated(false);
    }
  };

  const signIn = async (user: loginUser) => {
    // console.log('input login here', user);
    try {
      const response = await loginRequest(user);
      // console.log("response login here", response);
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error during sign up", error);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();
      if(!cookies.token) {
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
        return;
      }
      try {
        const res = await verifyTokenRequest();
        console.log("response verify token", res);
        if (!res.data) {
          setIsAuthenticated(false);
          setLoading(false);
          return
        }
        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error){
        console.error(error)
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
        console.error("Error during verify token request", error);
      }
    }
    checkLogin();
  },[]);

  return (
    <AuthContext.Provider
      value={{
        user,
        signUp,
        signIn,
        loading,
        isAuthenticated
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
