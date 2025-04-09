import React, { useState, useEffect } from "react";
import { TeacherLayout } from "../../../layouts/TeacherLayout";

// inertia
import { router, useForm, usePage, Link } from "@inertiajs/react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { EnhrolledStudentsTable } from "../../../components/data-table/enrolledStudentsTable";
import { enrolledStudentsColumns } from "../../../components/data-table/enrolledStudentsColumns";

function EnrolledStudents({ course, enrolledStudents }) {
  console.log("enrolled students: ", enrolledStudents);
  return (
    <div>
      <EnhrolledStudentsTable
        columns={enrolledStudentsColumns}
        data={enrolledStudents}
      ></EnhrolledStudentsTable>
    </div>
  );
}

EnrolledStudents.layout = (page) => (
  <TeacherLayout
    children={page}
    title="Enrolled Students"
    breadcrumb={
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbLink>
              <Link href="/teacher/courses">Courses</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="hidden md:block" />
          <BreadcrumbItem>
            <BreadcrumbPage>{page.props.course.course_title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    }
  />
);
export default EnrolledStudents;
