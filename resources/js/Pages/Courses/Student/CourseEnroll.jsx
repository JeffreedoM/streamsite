import { TeacherLayout } from "../../../layouts/TeacherLayout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Link, usePage } from "@inertiajs/react";

function CourseEnroll({ course, course_image_url }) {
  const { id, course_title } = course;
  let { course_image } = course;
  course_image = course_image_url;

  console.log(course);
  console.log(course_image);

  return (
    <div className="rounded-md bg-muted p-4">
      <div className="mx-auto flex max-w-screen-lg flex-col items-center justify-center">
        <AspectRatio ratio={16 / 9} className="bg-muted">
          <img
            src={course_image}
            alt="Course Image"
            fill
            className="mx-auto max-w-[500px] rounded-md object-cover"
          />
        </AspectRatio>
        <h3>{course_title}</h3>
      </div>
    </div>
  );
}

CourseEnroll.layout = (page) => (
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
export default CourseEnroll;
