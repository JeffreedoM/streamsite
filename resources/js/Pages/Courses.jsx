import React from "react";
import { TeacherLayout } from "../layouts/TeacherLayout.jsx";
import { usePage } from "@inertiajs/react";

import TeacherCourse from "./Courses/Teacher/Index.jsx";
import StudentCourse from "./Courses/Student/Index.jsx";
function Courses({ courses }) {
  const { auth } = usePage().props;
  const activeRole = auth.activeRole;

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
