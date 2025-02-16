// src/layouts/DashboardLayout.js
import React from 'react';
import { Layout } from 'antd';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';


const DashboardLayout = () => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sidebar />
            <Layout>
                <Outlet />
            </Layout>
        </Layout>
    );
};

export default DashboardLayout;
