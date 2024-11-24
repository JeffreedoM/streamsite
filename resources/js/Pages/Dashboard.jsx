import React from "react";
import { TeacherLayout } from "../layouts/TeacherLayout.jsx";

function Dashboard() {
  return <div>Dashboard</div>;
}

Dashboard.layout = (page) => (
  <TeacherLayout children={page} title="Dashboard" />
);

export default Dashboard;
