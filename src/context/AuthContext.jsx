import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";

// Create Context
const AuthContext = createContext();

// Auth Provider Component
export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Listen to auth state changes
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);


    // Logout
    const logout = async () => {
        return signOut(auth);
    };

    // console.log("user", user?.uid)
    // Provide Auth Context
    return (
        <AuthContext.Provider value={{ user, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom Hook to use Auth Context
export const useAuth = () => {
    return useContext(AuthContext);
};
