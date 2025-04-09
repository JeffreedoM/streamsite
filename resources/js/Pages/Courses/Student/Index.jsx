import React, { useCallback, useState } from "react";
import { TeacherLayout } from "../../../layouts/TeacherLayout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import img from "../../../../../storage/app/public/course_images/img-placeholder.jpg";
import { Link, router, usePage } from "@inertiajs/react";
import { useRoute } from "ziggy";
const Index = ({ enrolledCourses, unenrolledCourses }) => {
  const route = useRoute(Ziggy);
  const [password, setPassword] = useState("");
  const { errors } = usePage().props;

  const enroll = useCallback((id, password) => {
    console.log("course id from enroll fn: ", id);
    router.post(`courses/${id}`, { password });
  }, []);

  const [searchQuery, setSearchQuery] = useState("");

  // Filter courses based on search query
  const filteredEnrolledCourses = enrolledCourses.filter((course) =>
    course.course_title.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const filteredunEnrolledCourses = unenrolledCourses.filter((course) =>
    course.course_title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  console.log(unenrolledCourses);
  console.log("enrolled: ", enrolledCourses);

  return (
    <Tabs defaultValue="enrolled">
      <TabsList>
        <TabsTrigger value="enrolled">Enrolled Courses</TabsTrigger>
        <TabsTrigger value="unenrolled">All Courses</TabsTrigger>
      </TabsList>

      <TabsContent value="enrolled">
        {/* Search */}
        <div className="mx-auto my-2 mb-6 flex w-full max-w-md items-center justify-center space-x-2">
          {enrolledCourses.length > 0 ? (
            <Input
              type="text"
              placeholder="Search Course..."
              className="border-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          ) : (
            <div>No Enrolled Courses Yet.</div>
          )}
        </div>

        {/* Course List */}
        <div className="mx-auto grid max-w-screen-2xl grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-3 xl:grid-cols-4">
          {filteredEnrolledCourses.map((course) => (
            <Link
              key={course.id}
              href={`courses/${course.id}`}
              className="group flex max-h-[280px] cursor-pointer flex-col gap-y-4 overflow-hidden border bg-background pb-3"
            >
              <img
                src={course.course_image ? course.course_image : img}
                alt=""
                className="h-[150px] origin-bottom overflow-hidden object-cover transition-transform duration-150 group-hover:scale-110 md:h-[200px]"
              />
              <div className="flex h-16 flex-col justify-between space-y-2 px-3 text-left">
                <h3 className="line-clamp-2 text-sm font-semibold">
                  {course.course_title}
                </h3>
                <p className="text-xs">{course.chapters_count ?? 0} Chapters</p>
              </div>
            </Link>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="unenrolled">
        {/* Search */}
        <div className="mx-auto my-2 mb-6 flex w-full max-w-md items-center justify-center space-x-2">
          {unenrolledCourses.length > 0 ? (
            <Input
              type="text"
              placeholder="Search Course..."
              className="border-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          ) : (
            <div>No Courses Yet.</div>
          )}
        </div>

        {/* Course List */}
        <div className="mx-auto grid max-w-screen-2xl grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-3 xl:grid-cols-4">
          {filteredunEnrolledCourses.map((course) => (
            <Dialog key={course.id}>
              <DialogTrigger className="group flex max-h-[280px] cursor-pointer flex-col gap-y-4 overflow-hidden border bg-background pb-3">
                <img
                  src={course.course_image ? course.course_image : img}
                  alt=""
                  className="h-[150px] w-full origin-bottom overflow-hidden object-cover transition-transform duration-150 group-hover:scale-110 md:h-[200px]"
                />
                <div className="flex h-16 flex-col justify-between space-y-2 px-3 text-left">
                  <h3 className="line-clamp-2 text-sm font-semibold">
                    {course.course_title}
                  </h3>
                  <p className="text-xs">
                    {course.chapters_count ?? 0} Chapters
                  </p>
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Enter Course Password</DialogTitle>
                  <DialogDescription>
                    This course is password protected. Enter course password to
                    enroll.
                  </DialogDescription>
                </DialogHeader>
                <div>
                  <div className="flex items-center gap-4">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      placeholder="••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  {errors && errors.password && (
                    <div className="mt-1 text-sm text-destructive">
                      {errors.password}
                    </div>
                  )}
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    onClick={() => enroll(course.id, password)}
                  >
                    Enroll
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};

Index.layout = (page) => (
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
export default Index;
