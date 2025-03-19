import { TeacherLayout } from "../../../layouts/TeacherLayout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Link, router, usePage } from "@inertiajs/react";
import ReactPlayer from "react-player";
import { CircleCheckBig, CircleX } from "lucide-react";
import { useSnackbar } from "notistack";
function CourseDetails({
  course,
  chapter,
  video_url,
  chapters,
  is_completed,
  progress,
  completionPercentage,
}) {
  // console.log(chapter);
  // console.log(chapters);
  // console.log(video_url);
  // console.log(chapter.id);
  console.log(`${completionPercentage}% finished`);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  console.log(progress);
  const markComplete = (forceComplete = false) => {
    router.post(
      `/chapter/${chapter.id}/complete`,
      { forceComplete },
      {
        onSuccess: (page) => {
          // Optional: Handle successful completion
          // console.log("Chapter marked as complete:", page.props);
          const message = page.props.is_completed
            ? "Chapter successfully marked as complete!"
            : "Chapter completion undone.";
          enqueueSnackbar(message, {
            variant: "success",
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          });
        },
        onError: (errors) => {
          // Optional: Handle errors
          // console.error("Error marking chapter as complete:", errors);
          enqueueSnackbar(errors.error, {
            variant: "error",
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "right",
            },
          });
        },
      },
    );
  };

  const { url } = usePage();
  return (
    <div className="">
      <div className="grid gap-4 xl:grid-cols-3">
        <div className="relative rounded-md bg-muted pt-[56.25%] xl:col-span-2">
          <ReactPlayer
            url={video_url}
            controls
            width="100%"
            height="100%"
            className="absolute left-0 top-0 overflow-hidden rounded-md"
            onEnded={() => {
              if (!is_completed) {
                markComplete(true); // Only mark as complete if it's not already completed
              }
            }}
          />
        </div>

        <div className="order-3 flex flex-col space-y-6 xl:order-2 xl:col-span-2">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold">{chapter.chapter_name}</h1>
            {!is_completed ? (
              <Button className="text-xs" onClick={() => markComplete()}>
                Mark as complete <CircleCheckBig />
              </Button>
            ) : (
              <Button
                variant="outline"
                className="text-xs"
                onClick={() => markComplete()}
              >
                Undo completion
                <CircleX />
              </Button>
            )}
          </div>
          <div className="rounded-md bg-muted p-4">
            <p className="text-sm">{chapter.chapter_description}</p>
          </div>
        </div>

        <div className="rounded-md border xl:col-span-1">
          <h3 className="p-4 text-xl font-semibold">{course.course_title}</h3>

          {/* percentage of finished */}
          <div className="mb-5 px-4 text-green-700 dark:text-green-600">
            <div className="mb-2 rounded-md bg-muted">
              <div
                className="h-[8px] rounded-md bg-green-700 dark:bg-green-600"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
            <h4 className="text-sm font-semibold">{`${completionPercentage}% Complete`}</h4>
          </div>

          <div className="flex h-[300px] flex-col space-y-2 overflow-y-auto overflow-x-hidden xl:h-auto">
            {chapters.map((chapter, i) => {
              // Determine if this chapter's link matches the current URL
              const isActive =
                url === `/courses/${course.id}/${chapter.id}` ||
                (!url.includes(`${course.id}/`) && i === 0); // Fallback to first index if no chapter ID in URL
              return (
                <Link
                  href={`/courses/${course.id}/${chapter.id}`}
                  className={`flex cursor-pointer p-4 text-sm hover:bg-muted ${
                    isActive ? "border-l-4 border-l-green-500 bg-muted" : ""
                  }`}
                >
                  <div className="w-6">{i + 1}.</div>
                  <span className="line-clamp-1 font-semibold">
                    {chapter.chapter_name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

CourseDetails.layout = (page) => (
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
        </BreadcrumbList>
      </Breadcrumb>
    }
  />
);
export default CourseDetails;
