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

function EnrolledStudents({ course, enrolledStudents }) {
  return (
    <div>
      EnrolledStudents
      {enrolledStudents &&
        enrolledStudents.map((student) => (
          <div key={student.id}>{student.name}</div>
        ))}
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
