import React from "react";
import { AdminLayout } from "../../../layouts/AdminLayout";
import { CoursesTable } from "./CoursesTable";
import { columns } from "./columns";
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

Courses.layout = (page) => <AdminLayout children={page} title="Courses" />;
export default Courses;
