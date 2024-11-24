import React from "react";
import { TeacherLayout } from "../../../layouts/TeacherLayout";
import { CoursesTable } from "./CoursesTable";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";

function Courses() {
  const data = [
    {
      course_name: "Introduction to Computing",
      length: "44:52",
      status: "published",
    },
    {
      course_name: "Introduction to Computing",
      length: "44:52",
      status: "published",
    },
    {
      course_name: "Introduction to Computing",
      length: "44:52",
      status: "published",
    },
    {
      course_name: "sibol",
      length: "44:52",
      status: "published",
    },
  ];
  return (
    <div>
      <CoursesTable columns={columns} data={data} />
    </div>
  );
}

Courses.layout = (page) => <TeacherLayout children={page} title="Courses" />;
export default Courses;
