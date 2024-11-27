import React, { useState, useEffect } from "react";

// inertia
import { router, useForm, usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Pencil, CirclePlus, Image } from "lucide-react";
import { useDropzone } from "react-dropzone";

function ImageForm({ course, course_image_url, errors }) {
  const { id, course_image } = course;
  const { flash } = usePage().props;
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

  const { data, setData } = useForm({
    course_image,
  });

  const imageForm = useForm({
    course_image,
  });

  const handleImageSubmit = (e) => {
    e.preventDefault();

    // setData("course_image", files[0]);
    router.post(
      `/course/updateImage/${id}`,
      {
        _method: "put",
        course_image: data.course_image,
      },
      {
        onSuccess: () => {
          alert("Image updated!");
          setFiles([]);
        },
        onError: (error) => {
          console.error("Error updating image:", error);
        },
      },
    );
  };

  return (
    <form
      onSubmit={handleImageSubmit}
      encType="multipart/form-data"
      className="flex flex-col space-y-2 rounded-lg bg-muted px-6 py-4"
    >
      <div className="flex items-center justify-between font-semibold">
        <h3 className="text-lg">Course Image</h3>
        <span
          {...getRootProps({ className: "dropzone" })}
          className="flex cursor-pointer items-center gap-1 text-sm"
        >
          {course_image || (files && files.length >= 1) ? (
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
                  onLoad={() => {
                    URL.revokeObjectURL(file.preview);
                    setData("course_image", file);
                  }}
                />
              </div>
            ))
          ) : course_image ? (
            <div>
              <img
                src={course_image_url}
                alt="Course Image"
                className="max-h-[400px] w-full rounded-md object-cover"
              />
            </div>
          ) : (
            <div className="flex h-[200px] items-center justify-center">
              <Image size={30} className="text-muted-foreground" />
            </div>
          )}
        </div>
      </div>
      {errors.course_image && (
        <div className="text-sm text-red-500">{errors.course_image}</div>
      )}
      {flash.status == null && files && files.length >= 1 && (
        <div>
          <Button>Save</Button>
        </div>
      )}
    </form>
  );
}

export default ImageForm;
