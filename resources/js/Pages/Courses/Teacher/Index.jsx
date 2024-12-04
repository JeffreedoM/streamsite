import React from "react";
import { TeacherLayout } from "../../../layouts/TeacherLayout";
import { CoursesTable } from "./CoursesTable";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
const Index = ({ courses }) => {
  const data = courses;
  //   {
  //     course_name: "Introduction to Computing",
  //     length: "44:52",
  //     status: "published",
  //   },
  //   {
  //     course_name: "Introduction to Computing",
  //     length: "44:52",
  //     status: "published",
  //   },
  //   {
  //     course_name: "Introduction to Computing",
  //     length: "44:52",
  //     status: "published",
  //   },
  //   {
  //     course_name: "sibol",
  //     length: "44:52",
  //     status: "published",
  //   },
  // ];
  return (
    <div>
      <CoursesTable columns={columns} data={data} />
    </div>
  );
};

Index.layout = (page) => (
  <TeacherLayout
    children={page}
    title="Courses"
    breadcrumb={
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbItem href="#" className="text-primary">
              List of Courses
            </BreadcrumbItem>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    }
  />
);
export default Index;
