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

<<<<<<< HEAD
  return (
    <Tabs defaultValue="enrolled">
      <TabsList>
        <TabsTrigger value="enrolled">Enrolled Courses</TabsTrigger>
        <TabsTrigger value="unenrolled">All Courses</TabsTrigger>
      </TabsList>

      <TabsContent
        value="enrolled"
        className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-3 xl:grid-cols-4"
      >
        {enrolledCourses.map((course) => (
          <Link
            href={`courses/${course.id}`}
            className="group flex max-h-[280px] cursor-pointer flex-col gap-y-2 overflow-hidden bg-background"
          >
            <img
              src={course.course_image ? course.course_image : img}
              alt=""
              className="h-[150px] origin-bottom overflow-hidden object-cover transition-transform duration-150 group-hover:scale-110 md:h-[200px]"
            />
            <div className="flex flex-grow flex-col justify-between space-y-2">
              <h3 className="line-clamp-2 text-sm font-semibold">
                {course.course_title}
              </h3>
              <p className="text-xs">3 Chapters</p>
            </div>
          </Link>
        ))}
      </TabsContent>
      <TabsContent
        value="unenrolled"
        className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-3 xl:grid-cols-4"
      >
        {unenrolledCourses.map((course) => (
          <Dialog>
            <DialogTrigger className="group flex max-h-[280px] cursor-pointer flex-col gap-y-2 overflow-hidden bg-background">
              <img
                src={course.course_image ? course.course_image : img}
                alt=""
                className="h-[150px] origin-bottom overflow-hidden object-cover transition-transform duration-150 group-hover:scale-110 md:h-[200px]"
              />
              <div className="flex flex-grow flex-col justify-between space-y-2">
                <h3 className="line-clamp-2 text-left text-sm font-semibold">
                  {course.course_title}
                </h3>
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
                  Continue
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ))}
      </TabsContent>
    </Tabs>
=======
const Index = ({ courses}) => {
  console.log("courses:", courses);
  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-3 xl:grid-cols-4">
      {courses.map((course) => (
        <Link
          // href={`courses/${course.id}`}
          href={`courses/enroll/${course.id}`}
          className="group flex max-h-[280px] cursor-pointer flex-col gap-y-2 overflow-hidden bg-background"
        >
          <img
            src={course.course_image ? course.course_image : img}
            alt=""
            className="h-[150px] origin-bottom overflow-hidden object-cover transition-transform duration-150 group-hover:scale-110 md:h-[200px]"
          />
          <div className="flex flex-grow flex-col justify-between space-y-2">
            <h3 className="line-clamp-2 text-sm font-semibold">
              {course.course_title}
            </h3>
            {/* <p className="text-xs">3 Chapters</p> */}
          </div>
        </Link>
      ))}
    </div>
>>>>>>> d7d4eadc66f1978d5bf88ba69136f0d03c026f90
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
