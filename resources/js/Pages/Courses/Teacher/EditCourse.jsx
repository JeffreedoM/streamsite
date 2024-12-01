import React, { useState, useEffect } from "react";
import { TeacherLayout } from "../../../layouts/TeacherLayout";

// inertia
import { router, useForm, usePage, Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Pencil, CirclePlus, Image, Trash2 } from "lucide-react";
import { useDropzone } from "react-dropzone";

import TitleForm from "./forms/TitleForm";
import DescriptionForm from "./forms/DescriptionForm";
import ImageForm from "./forms/ImageForm";
import ChapterForm from "./forms/ChapterForm";
import { Input } from "@/components/ui/input";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import PasswordForm from "./forms/PasswordForm";
function EditCourse({
  course,
  completedFields,
  course_image_url,
  errors,
  course_chapters,
}) {
  const publishCourse = (e) => {
    e.preventDefault();

    router.put(
      `/course/update/${course.id}`,
      { status: "published" },
      {
        onSuccess: () => console.log("Course published successfully!"),
        onError: (errors) => console.error(errors),
      },
    );
  };
  const unPublishCourse = (e) => {
    e.preventDefault();

    router.put(
      `/course/update/${course.id}`,
      { status: "draft" },
      {
        onSuccess: () => console.log("Course unpublished successfully!"),
        onError: (errors) => console.error(errors),
      },
    );
  };

  return (
    <div>
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Course Setup</h1>
          <p className="text-sm">Complete all fields ({completedFields}/4)</p>
        </div>
        <div className="flex items-center gap-1">
          {course.status === "draft" ? (
            <Button
              onClick={publishCourse}
              type="submit"
              disabled={completedFields < 4}
            >
              Publish
            </Button>
          ) : (
            <Button onClick={unPublishCourse} type="submit">
              Unpublish
            </Button>
          )}

          <Button>
            <Trash2 />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col space-y-4">
          <TitleForm course={course} />
          <DescriptionForm course={course} />
          <ImageForm
            course={course}
            course_image_url={course_image_url}
            errors={errors}
          />
        </div>
        <div className="flex flex-col space-y-4">
          <ChapterForm course={course} course_chapters={course_chapters} />
          <PasswordForm course={course} />
        </div>
      </div>
    </div>
  );
}

EditCourse.layout = (page) => (
  <TeacherLayout
    children={page}
    title="Courses"
    breadcrumb={
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbLink>
              <Link href="/courses">Courses</Link>
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
export default EditCourse;
