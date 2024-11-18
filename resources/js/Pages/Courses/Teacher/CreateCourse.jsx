import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// inertia
import { router } from "@inertiajs/react";

import { useRoute } from "ziggy";
function CreateCourse() {
  const [values, setValues] = useState({
    course_title: "",
  });

  function handleChange(e) {
    const key = e.target.id;
    const value = e.target.value;
    setValues((values) => ({
      ...values,
      [key]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    router.post("/course/create", values);
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div>
        <div className="mb-4">
          <h1 className="text-2xl font-semibold">Name Your Course</h1>
          <p className="text-sm">
            What would you like to name your course? You can always change this
            later.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
          <div>
            <Label htmlFor="course_title">Course title</Label>
            <Input
              type="text"
              id="course_title"
              placeholder="e.g. Web Development"
              value={values.course_title}
              onChange={handleChange}
            />
          </div>
          <div className="ml-auto">
            <Button
              type="cancel"
              variant="outline"
              className="mr-2 border-none"
            >
              Cancel
            </Button>
            <Button type="submit">Continue</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateCourse;
