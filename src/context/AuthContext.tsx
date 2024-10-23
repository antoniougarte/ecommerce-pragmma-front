import { createContext, useState, ReactNode, useContext, useEffect } from "react";
import { loginRequest, registerRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";
import { Product } from "../components/product/ProductCard.component";

export interface User {
  id: string;
  name: string;
  email: string;
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

interface ProductToCart {
  id: number;
  name: string;
  imageLight: string;
  imageDark: string;
  totalPrice: number;
  amount: number;
}
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  signUp: (user: registerUser) => void;
  signIn: (user: loginUser) => void;
  addToCart: (product: Product) => void;
  productsToCart: ProductToCart[]
}

const defaultAuthContextValue: AuthContextType = {
  user: null,
  isAuthenticated: false,
  loading: true,
  signUp: async () => {},
  signIn: async () => {},
  addToCart: () => {},
  productsToCart: []
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
  const [productsToCart, setProductsToCart] = useState<ProductToCart[]>([]);

  // buy actions
  const addToCart = (product: Product) => {
    setProductsToCart((prevProducts) => {
      const productsMap = new Map(prevProducts.map(p => [p.id, { ...p }]));
  
      if (productsMap.has(product.id)) {
        const existingProduct = productsMap.get(product.id);
        existingProduct!.amount += 1; 
        existingProduct!.totalPrice = existingProduct!.amount * product.price;
        productsMap.set(product.id, existingProduct!);
        console.log("Updated product amount:", existingProduct);
      } else {
        const newProduct = {
          id: product.id,
          name: product.name,
          imageDark: product.imageDark,
          imageLight: product.imageLight,
          totalPrice: product.price,
          amount: 1
        };
        productsMap.set(product.id, newProduct);
        console.log("Adding new product:", newProduct);
      }
      const updatedProducts = Array.from(productsMap.values());
      // set to localStorage
      localStorage.setItem('productsToCart', JSON.stringify(updatedProducts));

      return updatedProducts;
    });
  };

  useEffect(() => {  
    const storedProducts = localStorage.getItem('productsToCart');
    if (storedProducts) {
      setProductsToCart(JSON.parse(storedProducts));
    }
  }, []);

  useEffect(() => {
    console.log("Current products in cart:", productsToCart);
  }, [productsToCart]);
  // finish buy actions


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
      setUser(response.data?.data);
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
        if (!res.data) {
          setIsAuthenticated(false);
          setLoading(false);
          return
        }
        setIsAuthenticated(true);
        setUser(res.data?.data);
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
        isAuthenticated,
        addToCart,
        productsToCart
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
