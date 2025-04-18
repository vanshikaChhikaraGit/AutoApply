"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { syncUserToDB } from "@/app/actions/syncUserToDB";
import { useAuth } from "@clerk/nextjs";

type AuthContextType = {
  success: boolean;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { isSignedIn } = useAuth();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      if (!isSignedIn) return;
      setLoading(true);
      try {
        const result = await syncUserToDB();
       
        console.log("Backend response:", result);
  
        if ("success" in result && result.success === true) {
          
          setSuccess(true);
        }
      } catch (error) {
        console.error("Error syncing user to DB:", error);
      }
      setLoading(false);
    }
  
    fetchUser();
  }, [isSignedIn]);
  

  return (
    <AuthContext.Provider value={{ success, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
