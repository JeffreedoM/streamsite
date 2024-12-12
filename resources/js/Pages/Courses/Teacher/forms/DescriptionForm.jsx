import React, { useState } from "react";

// inertia
import { useForm } from "@inertiajs/react";

// shadcn
import { Textarea } from "@/components/ui/textarea";

import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { SnackbarProvider, useSnackbar } from "notistack";

function DescriptionForm({ course }) {
  const { id, course_description } = course;
  const descriptionForm = useForm({ course_description });
  const [toggleCourseDescription, setToggleCourseDescription] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleDescriptionSubmit = (e) => {
    e.preventDefault();
    descriptionForm.put(`/course/update/${id}`, {
      onSuccess: () => {
        enqueueSnackbar("Description successfully updated!", {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        });
        setToggleCourseDescription(false);
      },
    });
  };

  return (
    <form
      onSubmit={handleDescriptionSubmit}
      className="flex flex-col space-y-2 rounded-lg bg-muted px-6 py-4"
    >
      <div className="flex items-center justify-between font-semibold">
        <h3 className="text-lg">Course Description</h3>
        <span
          onClick={() => setToggleCourseDescription(!toggleCourseDescription)}
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
              descriptionForm.setData("course_description", e.target.value);
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
  );
}

export default DescriptionForm;
