import React from "react";
import { TeacherLayout } from "../../../layouts/TeacherLayout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
const Index = ({ courses }) => {
  return <div>Student Courses</div>;
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
              Enrolled Courses
            </BreadcrumbItem>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    }
  />
);
export default Index;
