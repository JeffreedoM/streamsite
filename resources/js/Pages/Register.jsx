import React, { useState } from "react";
import { useForm } from "@inertiajs/react";

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

function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        password: "",
        remember: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/register");
        console.log(errors);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex h-screen items-center justify-center"
        >
            <Card className="w-full max-w-lg">
                <CardHeader className="mb-2">
                    <CardTitle className="">Sign Up</CardTitle>
                    <CardDescription className="">
                        Create an account.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                type="name"
                                placeholder="Enter name"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                            />
                            {errors.name && (
                                <div className="text-sm text-destructive">
                                    {errors.name}
                                </div>
                            )}
                        </div>
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
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={processing}
                    >
                        Login
                    </Button>
                </CardFooter>
            </Card>
        </form>
    );
}

export default Register;
