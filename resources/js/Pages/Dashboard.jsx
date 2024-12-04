import React from "react";
import { TeacherLayout } from "../layouts/TeacherLayout.jsx";
import { usePage } from "@inertiajs/react";
import TeacherCourse from "./Courses/Teacher/Index.jsx";
import StudentCourse from "./Courses/Student/Index.jsx";
function Dashboard() {
  const { auth } = usePage().props; // Get the shared data
  const activeRole = auth.activeRole; // Extract activeRole
  return (
    <div>{activeRole == "teacher" ? "Hello, Teacher" : "Hello, Student"}</div>
  );
  // return <>{isTeacher ? <TeacherCourse /> : <StudentCourse />}</>;
}

Dashboard.layout = (page) => (
  <TeacherLayout children={page} title="Dashboard" />
);

export default Dashboard;
