import { TeacherLayout } from "../../../layouts/TeacherLayout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link, usePage } from "@inertiajs/react";
import ReactPlayer from "react-player";
function CourseDetails({ course, chapter, video_url, chapters }) {
  console.log(chapter);
  console.log(chapters);
  console.log(video_url);

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
          />
        </div>

        <div className="order-3 flex flex-col space-y-2 xl:order-2 xl:col-span-2">
          <h1 className="text-lg font-semibold">{chapter.chapter_name}</h1>
          <div className="rounded-md bg-muted p-4">
            <p className="text-sm">{chapter.chapter_description}</p>
          </div>
        </div>

        <div className="rounded-md border xl:col-span-1">
          <h3 className="p-4 text-xl font-semibold">{course.course_title}</h3>

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
                    isActive ? "bg-muted" : ""
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
            <BreadcrumbItem href="#" className="text-primary">
              Courses
            </BreadcrumbItem>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    }
  />
);
export default CourseDetails;
