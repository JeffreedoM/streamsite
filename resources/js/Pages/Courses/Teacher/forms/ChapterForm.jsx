import React, { useEffect, useState } from "react";

import { Reorder, useDragControls } from "framer-motion";
import { Grip, Plus, Pencil, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, router, useForm } from "@inertiajs/react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SnackbarProvider, useSnackbar } from "notistack";
// const chapters = [
//   {
//     id: 1,
//     chapter_name: "Introduction",
//     chapter_description: "some description here",
//     order: 1,
//   },
//   {
//     id: 2,
//     chapter_name: "HTML Basics",
//     chapter_description: "some description here",
//     order: 2,
//   },
//   {
//     id: 3,
//     chapter_name: "HTML Basics 2",
//     chapter_description: "some description here",
//     order: 3,
//   },
// ];
function ChapterForm({ course, course_chapters }) {
  const [chapters, setChapters] = useState(course_chapters);
  const chapterCreateForm = useForm({ chapter_name: "", course_id: course.id });
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    console.log(chapters);
  }, [chapters]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Post the form data to create a new chapter
    chapterCreateForm.post("/chapter/create", {
      onSuccess: (response) => {
        // Once the request is successful, update the chapters list
        // Response will contain the updated chapters
        setChapters(response.props.course_chapters);

        // clear chapter_name input
        chapterCreateForm.setData("chapter_name", "");

        enqueueSnackbar("Chapters successfully added!", {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        });
      },
    });
  };

  const handleReorder = (newOrder) => {
    // Update the `order` property based on the array index
    const updatedChapters = newOrder.map((chapter, index) => ({
      ...chapter,
      order: index + 1, // Set order to 1-based index
    }));

    setChapters(updatedChapters);

    // Send the updated list to the backend
    updateChapterOrders(updatedChapters);
  };

  const updateChapterOrders = (updatedChapters) => {
    router.post(
      `/chapter/${course.id}/updateOrder`,
      {
        chapters: updatedChapters,
      },
      {
        onSuccess: () => {
          enqueueSnackbar("Chapters successfully updated!", {
            variant: "success",
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          });
        },
        onError: () => {},
      },
    );
  };

  return (
    <div className="flex flex-col space-y-4 rounded-lg bg-muted px-6 py-4">
      <div className="flex items-center justify-between font-semibold">
        <h3 className="text-lg">Chapters</h3>
        <AlertDialog>
          <AlertDialogTrigger className="flex cursor-pointer items-center gap-1 text-sm">
            <PlusCircle size={16} className="text-sm" /> Add Chapter
          </AlertDialogTrigger>
          <AlertDialogContent>
            <form onSubmit={handleSubmit} action="">
              <AlertDialogHeader>
                <AlertDialogTitle>
                  What would you like to name this chapter?
                </AlertDialogTitle>
              </AlertDialogHeader>
              <div className="mb-4 mt-3 flex flex-col space-y-2">
                <Label htmlFor="chapter_name">Chapter Name</Label>
                <Input
                  type="chapter_name"
                  id="chapter_name"
                  placeholder="e.g. Introduction"
                  value={chapterCreateForm.data.chapter_name}
                  onChange={(e) =>
                    chapterCreateForm.setData("chapter_name", e.target.value)
                  }
                />
                {chapterCreateForm.errors.email && (
                  <div>{chapterCreateForm.errors.email}</div>
                )}
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  type="submit"
                  disabled={chapterCreateForm.processing}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </form>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      {chapters.length > 0 ? (
        <Reorder.Group
          values={chapters}
          onReorder={handleReorder}
          className="flex flex-col space-y-4"
        >
          {chapters.map((chapter) => (
            <Reorder.Item
              id={chapter.id}
              key={chapter.id}
              value={chapter}
              className="flex cursor-grab items-center justify-between rounded-sm bg-primary/20 active:cursor-grabbing"
            >
              <h4 className="p-4 pl-6 font-semibold">{chapter.chapter_name}</h4>
              <Link
                href={`/chapter/${chapter.id}`}
                className="mr-2 cursor-pointer p-2 text-xs"
              >
                <Pencil size={18} />
              </Link>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      ) : (
        <div className="py-5 text-center">No Chapters yet. Add one.</div>
      )}

      {chapters.length > 0 && (
        <footer className="text-sm">Drag and drop to reorder chapters</footer>
      )}
    </div>
  );
}

export default ChapterForm;
