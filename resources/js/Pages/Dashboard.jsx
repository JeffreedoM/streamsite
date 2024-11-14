import React from "react";
import { AdminLayout } from "../layouts/AdminLayout.jsx";

function Dashboard() {
    return <div>Dashboard</div>;
}

Dashboard.layout = (page) => <AdminLayout children={page} title="Dashboard" />;

export default Dashboard;
