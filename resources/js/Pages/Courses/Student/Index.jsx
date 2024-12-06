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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import img from "../../../../../storage/app/public/course_images/img-placeholder.jpg";
import { Link } from "@inertiajs/react";

const Index = ({ courses }) => {
  console.log("courses:", courses);
  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-3 xl:grid-cols-4">
      {courses.map((course) => (
        <Link
          href={`courses/${course.id}`}
          className="group flex max-h-[280px] cursor-pointer flex-col gap-y-2 overflow-hidden bg-background"
        >
          <img
            src={course.course_image ? course.course_image : img}
            alt=""
            className="h-[150px] origin-bottom overflow-hidden object-cover transition-transform duration-150 group-hover:scale-110 md:h-[200px]"
          />
          <div className="flex flex-grow flex-col justify-between space-y-2">
            <h3 className="line-clamp-2 text-sm font-semibold">
              {course.course_title}
            </h3>
            {/* <p className="text-xs">3 Chapters</p> */}
          </div>
        </Link>
      ))}
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
              Courses
            </BreadcrumbItem>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    }
  />
);
export default Index;
