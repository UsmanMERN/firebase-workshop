import { Navigate, Route, Routes } from 'react-router-dom'

import Frontend from "./frontend";
import Dashboard from "./dashboard";
import Auth from "./auth";


import "bootstrap/dist/js/bootstrap.bundle"
import 'bootstrap/dist/css/bootstrap.min.css'
import { useAuth } from '../context/AuthContext';
import PrivateRoute from './private/PrivateRoute';


export default function Index() {
    const { user } = useAuth()
    return (
        <>
            <Routes>
                <Route path='/*' element={<Frontend />} />
                <Route path='dashboard/*' element={<PrivateRoute Compoenent={Dashboard} />} />
                <Route path='auth/*' element={user ? <Navigate to={"/"} /> : <Auth />} />
            </Routes>

        </>
    )
}
