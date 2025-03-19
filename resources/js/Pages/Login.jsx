import React, { useState } from "react";
import { Link, useForm } from "@inertiajs/react";

// ui
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// icons
import { FaEye } from "react-icons/fa6";
import { RiEyeCloseLine } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { FaGoogle } from "react-icons/fa";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { data, setData, post, processing, errors } = useForm({
    email: "",
    password: "",
    remember: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    post("/login");
    console.log(errors);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-screen items-center justify-center"
    >
      <Card className="w-full max-w-lg">
        <CardHeader className="mb-2">
          <CardTitle className="">Welcome!</CardTitle>
          <CardDescription className="">
            Sign In to your account.
          </CardDescription>
        </CardHeader>
        {/* <CardContent>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter email/username"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />
                            {errors.email && (
                                <div className="text-sm text-destructive">
                                    {errors.email}
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter password"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                />
                                <div
                                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-lg"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    {showPassword ? (
                                        <FaEye />
                                    ) : (
                                        <RiEyeCloseLine />
                                    )}
                                </div>
                            </div>
                            {errors.password && (
                                <div className="text-sm text-destructive">
                                    {errors.password}
                                </div>
                            )}
                        </div>
                    </div>
                </CardContent> */}
        <CardFooter className="flex flex-col gap-2">
          {/* <Button
                        type="submit"
                        className="w-full"
                        disabled={processing}
                    >
                        Login
                    </Button> */}

          <Button type="button" variant="outline" className="w-full text-2xl">
            <a
              href="/auth/google"
              method="get"
              className="flex w-full items-center justify-center gap-2"
            >
              <FcGoogle />
              <span className="text-sm">Sign in with Google</span>
            </a>
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}

export default Login;
