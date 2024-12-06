import { TeacherLayout } from "../../../layouts/TeacherLayout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import ReactPlayer from "react-player";
function CourseDetails({ course, chapter, video_url, chapters }) {
  console.log(chapter);
  console.log(chapters);
  console.log(video_url);
  return (
    <div className="flex gap-x-4">
      <div className="flex w-full flex-col space-y-4">
        <div className="rounded-md">
          <ReactPlayer
            url={video_url}
            controls
            width="100%"
            height="100%"
            className="rounded-md"
          />
        </div>
        <h1 className="text-lg font-semibold">{chapter.chapter_name}</h1>
        <div className="rounded-md bg-muted p-4">
          <p className="text-sm">{chapter.chapter_description}</p>
        </div>
      </div>
      <div className="w-[50%] rounded-md border p-4">
        <h3 className="mb-4 text-xl font-semibold">{course.course_title}</h3>
        <div className="flex flex-col space-y-2">
          {chapters.map((chapter, i) => (
            <div className="-mx-4 flex cursor-pointer p-4 text-sm hover:bg-muted">
              <div className="w-8">{i + 1}</div>
              <span className="font-semibold">{chapter.chapter_name}</span>
            </div>
          ))}
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
