import React from "react";
import { TeacherLayout } from "../layouts/TeacherLayout.jsx";
import { usePage } from "@inertiajs/react";

import TeacherCourse from "./Courses/Teacher/Index.jsx";
import StudentCourse from "./Courses/Student/Index.jsx";
function Courses({ courses }) {
  const { auth } = usePage().props; // Get the shared data
  const activeRole = auth.activeRole; // Extract activeRole

  console.log(activeRole);
  return (
    <>
      {activeRole == "teacher" ? (
        <TeacherCourse courses={courses} />
      ) : (
        <StudentCourse courses={courses} />
      )}
    </>
  );
}

Courses.layout = (page) => <TeacherLayout children={page} title="Courses" />;
export default Courses;
