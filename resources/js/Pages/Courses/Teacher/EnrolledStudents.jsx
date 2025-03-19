import React from "react";

function EnrolledStudents() {
  return <div>EnrolledStudents</div>;
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
