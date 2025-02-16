import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useAuth } from "../../context/AuthContext";

export default function PrivateRoute({ Compoenent }) {
    const { user } = useAuth();
    const [isAdmin, setIsAdmin] = useState(null);

    useEffect(() => {
        if (user) {
            const fetchUserRole = async () => {
                const userRef = doc(db, "users", user.uid);
                const userSnap = await getDoc(userRef);

                if (userSnap.exists() && userSnap.data().role.includes("admin")) {
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);
                }
            };
            fetchUserRole();
        } else {
            setIsAdmin(false);
        }
    }, [user]);

    // Loading state while checking role
    if (isAdmin === null) return <h2>Loading...</h2>;

    return isAdmin ? <Compoenent /> : <Navigate to="/" replace />;
}
