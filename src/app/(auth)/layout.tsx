import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/Auth-Context";
import { ReactNode } from "react";

const Layout = ({children}:{children:ReactNode})=>{
    return(
    <body className="">
        <Navbar></Navbar>
        <AuthProvider>
        {children}
        </AuthProvider>
    
    </body>)
}

export default Layout;