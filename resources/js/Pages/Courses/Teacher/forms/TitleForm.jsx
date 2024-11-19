import React, { useState, useEffect } from "react";

// inertia
import { useForm } from "@inertiajs/react";

// shadcn
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

function TitleForm({ course }) {
  const { id, course_title } = course;
  const titleForm = useForm({ course_title });
  const [toggleCourseTitle, setToggleCourseTitle] = useState(false);

  const handleSubmit = (form, successCallback) => (e) => {
    e.preventDefault();
    form.put(`/course/update/${id}`, {
      onSuccess: successCallback,
    });
  };
  const handleTitleSubmit = handleSubmit(titleForm, () => {
    alert("Title updated!");
    setToggleCourseTitle(false);
  });

  return (
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
            onChange={(e) => titleForm.setData("course_title", e.target.value)}
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
  );
}

export default TitleForm;
