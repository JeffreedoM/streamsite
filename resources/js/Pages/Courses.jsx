import React from "react";
import { TeacherLayout } from "../layouts/TeacherLayout.jsx";
function Courses() {
    return <div>Courses</div>;
}

Courses.layout = (page) => <TeacherLayout children={page} title="Courses" />;
export default Courses;
