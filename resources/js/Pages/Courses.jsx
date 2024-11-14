import React from "react";
import { AdminLayout } from "../layouts/AdminLayout.jsx";
function Courses() {
    return <div>Courses</div>;
}

Courses.layout = (page) => <AdminLayout children={page} title="Courses" />;
export default Courses;
