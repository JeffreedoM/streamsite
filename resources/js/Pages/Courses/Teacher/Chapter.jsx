import React, { useState } from "react";
import { TeacherLayout } from "../../../layouts/TeacherLayout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link, useForm, router, usePage } from "@inertiajs/react";
import { Pencil } from "lucide-react";
import { SnackbarProvider, useSnackbar } from "notistack";
import ChapterVideoForm from "./forms/ChapterVideoForm";

function Chapter({ course, course_chapter, video_url }) {
  const { id, chapter_name, chapter_description } = course_chapter;
  const { errors } = usePage().props;
  const [toggleEdit, setToggleEdit] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { data, setData } = useForm({
    chapter_name,
    chapter_description,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    router.post(
      `/chapter/${id}`,
      { _method: "put", ...data },
      {
        onSuccess: () => {
          setToggleEdit(false);
          enqueueSnackbar("Chapter successfully updated!", {
            variant: "success",
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          });
        },
        onError: (error) => {
          console.error("Error updating chapter:", error);
          enqueueSnackbar(error.chapter_description, {
            variant: "error",
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          });
        },
      },
    );
  };

  return (
    <div className="flex flex-col space-y-2 rounded-lg px-6 py-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col space-y-4">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col space-y-4 rounded-lg bg-muted px-6 py-4"
          >
            <div className="flex items-center justify-between font-semibold">
              <h3 className="text-lg">Course Chapter</h3>
              <div
                onClick={() => setToggleEdit(!toggleEdit)}
                className="flex cursor-pointer items-center gap-1 text-sm"
              >
                {toggleEdit ? (
                  <div className="rounded-sm bg-muted-foreground px-2 py-1 text-background">
                    Cancel
                  </div>
                ) : (
                  <>
                    <Pencil size={14} className="text-sm" />
                    Edit Chapter
                  </>
                )}
              </div>
            </div>
            {toggleEdit ? (
              <>
                <div>
                  <Label htmlFor="chapter_name">Chapter Name</Label>
                  <Input
                    id="chapter_name"
                    value={data.chapter_name}
                    onChange={(e) => setData("chapter_name", e.target.value)}
                  />
                  {errors && errors.chapter_name && (
                    <div className="text-sm text-destructive">
                      {errors.chapter_name}
                    </div>
                  )}
                </div>
                <div>
                  <Label htmlFor="chapter_description">Description</Label>
                  <Input
                    id="chapter_description"
                    value={data.chapter_description}
                    onChange={(e) =>
                      setData("chapter_description", e.target.value)
                    }
                  />
                  {errors && errors.chapter_description && (
                    <div className="text-sm text-destructive">
                      {errors.chapter_description}
                    </div>
                  )}
                </div>
                <div>
                  <Button type="submit">Save</Button>
                </div>
              </>
            ) : (
              <>
                <div className="text-sm">
                  <h3 className="font-semibold">Chapter Name</h3>
                  <div className="rounded-md bg-muted-foreground/20 px-4 py-3">
                    {chapter_name}
                  </div>
                </div>
                <div className="text-sm">
                  <h3 className="font-semibold">Chapter Description</h3>
                  <div className="rounded-md bg-muted-foreground/20 px-4 py-3">
                    {chapter_description}
                  </div>
                </div>
              </>
            )}
          </form>
        </div>
        <div>
          <ChapterVideoForm
            course_chapter={course_chapter}
            video_url={video_url}
          />
        </div>
      </div>
    </div>
  );
}

Chapter.layout = (page) => (
  <TeacherLayout
    children={page}
    title="Chapter"
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
            <BreadcrumbLink>
              <Link href={`/course/create/${page.props.course.id}`}>
                {page.props.course.course_title}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              {page.props.course_chapter.chapter_name}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    }
  />
);
export default Chapter;
