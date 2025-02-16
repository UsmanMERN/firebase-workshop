// src/components/Sidebar.js
import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);

    const menuItems = [
        { key: '1', icon: <PieChartOutlined />, label: <Link to="/dashboard">Home</Link> },
        { key: '2', icon: <DesktopOutlined />, label: <Link to="/dashboard/option2">Option 2</Link> },
        {
            key: 'sub1',
            icon: <UserOutlined />,
            label: 'User',
            children: [
                { key: '3', label: <Link to="/dashboard/user/tom">Tom</Link> },
                { key: '4', label: <Link to="/dashboard/user/bill">Bill</Link> },
                { key: '5', label: <Link to="/dashboard/user/alex">Alex</Link> },
            ],
        },
        {
            key: 'sub2',
            icon: <TeamOutlined />,
            label: 'Team',
            children: [
                { key: '6', label: <Link to="/dashboard/team/1">Team 1</Link> },
                { key: '8', label: <Link to="/dashboard/team/2">Team 2</Link> },
            ],
        },
        { key: '9', icon: <FileOutlined />, label: <Link to="/dashboard/files">Files</Link> },
    ];

    return (
        <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
            <div className="demo-logo-vertical" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={menuItems} />
        </Sider>
    );
};

export default Sidebar;
