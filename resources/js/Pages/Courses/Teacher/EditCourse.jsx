import React, { useState, useEffect } from "react";
import { AdminLayout } from "../../../layouts/AdminLayout";

// inertia
import { router, useForm, usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Pencil, CirclePlus, Image, Trash2 } from "lucide-react";
import { useDropzone } from "react-dropzone";

import TitleForm from "./forms/TitleForm";
import DescriptionForm from "./forms/DescriptionForm";
import ImageForm from "./forms/ImageForm";
import ChapterForm from "./forms/ChapterForm";

function EditCourse({
  course,
  completedFields,
  course_image_url,
  errors,
  course_chapters,
}) {
  return (
    <div>
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Course Setup</h1>
          <p className="text-sm">Complete all fields ({completedFields}/6)</p>
        </div>
        <div className="flex items-center gap-1">
          <Button disabled={completedFields < 6}>Publish</Button>
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
        <div>
          <ChapterForm course={course} course_chapters={course_chapters}/>
        </div>
      </div>
    </div>
  );
}
EditCourse.layout = (page) => <AdminLayout children={page} title="Courses" />;
export default EditCourse;
