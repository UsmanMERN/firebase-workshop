import { Route, Routes } from 'react-router-dom'

import Frontend from "./frontend";
import Dashboard from "./dashboard";
import Auth from "./auth";


import "bootstrap/dist/js/bootstrap.bundle"
import 'bootstrap/dist/css/bootstrap.min.css'


export default function Index() {
    return (
        <>
            <Routes>
                <Route path='/*' element={<Frontend />} />
                <Route path='dashboard/*' element={<Dashboard />} />
                <Route path='auth/*' element={<Auth />} />
            </Routes>

        </>
    )
}
