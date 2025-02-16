// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import Home from './Home';
import User from './Users';

const App = () => {
    return (
        <Routes>
            {/* Dashboard Layout Wrapping Dashboard Routes */}
            <Route path="/" element={<DashboardLayout />}>
                <Route index element={<Home />} />
                <Route path="user/:name" element={<User />} />
            </Route>
        </Routes>
    );
};

export default App;
