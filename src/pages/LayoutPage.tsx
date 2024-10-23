import { ReactNode } from "react";
import HeaderComponent from "../components/header/Header.component";

interface ProductLayoutProps{
  children: ReactNode
}

const Layout: React.FC<ProductLayoutProps> = ({ children }) => (
  <>
    <HeaderComponent />
    {children}
  </>
);

export default Layout;
