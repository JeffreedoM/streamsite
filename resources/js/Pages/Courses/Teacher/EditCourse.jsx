import React, { useState, useEffect } from "react";
import { AdminLayout } from "../../../layouts/AdminLayout";

// inertia
import { router, useForm } from "@inertiajs/react";

// shadcn
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { Button } from "@/components/ui/button";
import { Pencil, CirclePlus, Image, Trash2 } from "lucide-react";
import { useDropzone } from "react-dropzone";

function EditCourse({ course }) {
  const { id, course_title, course_description } = course;

  const titleForm = useForm({ course_title: course_title });
  const descriptionForm = useForm({
    course_description,
  });
  // const imageForm = useForm({ course_image });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    put(`/course/update/${id}`);
  };

  // Handlers for updating specific fields
  const handleTitleSubmit = (e) => {
    e.preventDefault();
    titleForm.put(`/course/update/${id}`, {
      onSuccess: () => {
        alert("Title updated!"), setToggleCourseTitle(false);
      },
    });
  };

  const handleDescriptionSubmit = (e) => {
    e.preventDefault();
    console.log(descriptionForm.data);
    descriptionForm.put(`/course/update/${id}`, {
      onSuccess: () => {
        alert("Description updated!"), setToggleCourseDescription(false);
      },
    });
  };

  const handleImageSubmit = (e) => {
    e.preventDefault();
    imageForm.put(`/course/update/${id}`, {
      onSuccess: () => alert("Image updated!"),
    });
  };

  console.log(course);
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    noDrag: true,
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
    },
  });

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const [toggleCourseTitle, setToggleCourseTitle] = useState(false);
  const [toggleCourseDescription, setToggleCourseDescription] = useState(false);

  return (
    <div>
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Course Setup</h1>
          <p className="text-sm">Complete all fields (1/6)</p>
        </div>
        <div className="flex items-center gap-1">
          <Button disabled>Publish</Button>
          <Button>
            <Trash2 />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col space-y-4">
          <form
            onSubmit={handleTitleSubmit}
            className="flex flex-col space-y-2 rounded-lg bg-muted px-6 py-4"
          >
            <div className="flex items-center justify-between font-semibold">
              <h3 className="text-lg">Course Title</h3>
              <span
                onClick={() => setToggleCourseTitle(!toggleCourseTitle)}
                className="flex cursor-pointer items-center gap-1 text-sm"
              >
                <Pencil size={16} className="text-sm" /> Edit Title
              </span>
            </div>
            {toggleCourseTitle ? (
              <>
                <Input
                  id="course_title"
                  value={titleForm.data.course_title}
                  onChange={(e) =>
                    titleForm.setData("course_title", e.target.value)
                  }
                />
                {titleForm.errors.course_title && (
                  <div>{titleForm.errors.course_title}</div>
                )}
                <div>
                  <Button>Save</Button>
                </div>{" "}
              </>
            ) : (
              <div>{course_title}</div>
            )}
          </form>

          <form
            onSubmit={handleDescriptionSubmit}
            className="flex flex-col space-y-2 rounded-lg bg-muted px-6 py-4"
          >
            <div className="flex items-center justify-between font-semibold">
              <h3 className="text-lg">Course Description</h3>
              <span
                onClick={() =>
                  setToggleCourseDescription(!toggleCourseDescription)
                }
                className="flex cursor-pointer items-center gap-1 text-sm"
              >
                <Pencil size={16} className="text-sm" /> Edit Description
              </span>
            </div>
            {toggleCourseDescription ? (
              <>
                <Textarea
                  id="course_description"
                  value={descriptionForm.data.course_description}
                  onChange={(e) => {
                    descriptionForm.setData(
                      "course_description",
                      e.target.value,
                    );
                  }}
                />
                <div>
                  <Button>Save</Button>
                </div>
                {descriptionForm.errors.course_description && (
                  <div>{descriptionForm.errors.course_description}</div>
                )}
              </>
            ) : (
              <div>{course_description}</div>
            )}
          </form>

          <div className="flex flex-col space-y-2 rounded-lg bg-muted px-6 py-4">
            <div className="flex items-center justify-between font-semibold">
              <h3 className="text-lg">Course Image</h3>
              <span
                {...getRootProps({ className: "dropzone" })}
                className="flex cursor-pointer items-center gap-1 text-sm"
              >
                {files && files.length >= 1 ? (
                  <>
                    <Pencil size={18} className="text-sm" />
                    <p>Edit Image</p>
                  </>
                ) : (
                  <>
                    <CirclePlus size={18} className="text-sm" />
                    <p>Add Image</p>
                  </>
                )}
                <input {...getInputProps()} />
              </span>
            </div>
            <div className="rounded-sm bg-muted-foreground/20">
              <div>
                {files && files.length >= 1 ? (
                  files.map((file) => (
                    <div key={file.name} className="p-2">
                      <img
                        src={file.preview}
                        alt={file.name}
                        className="max-h-[400px] w-full rounded-lg object-cover shadow-md"
                        onLoad={() => URL.revokeObjectURL(file.preview)}
                      />
                    </div>
                  ))
                ) : (
                  <div className="flex h-[200px] items-center justify-center">
                    <Image size={30} className="text-muted-foreground" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
EditCourse.layout = (page) => <AdminLayout children={page} title="Courses" />;
export default EditCourse;
