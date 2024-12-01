import React, { useState } from "react";

// inertia
import { useForm } from "@inertiajs/react";

// shadcn
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

function PasswordForm({ course }) {
  const { id, password } = course;
  const passwordForm = useForm({ password });
  const [togglePassword, setTogglePassword] = useState(false);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    passwordForm.put(`/course/update/${id}`, {
      ...passwordForm.data, // Spread passwordForm data
      onSuccess: () => {
        console.log("Password edited successfully!");
        setTogglePassword(false); // You might want to hide or reset the form
      },
      onError: (errors) => {
        console.error(errors);
        // You can handle additional error logic here if needed
      },
    });
  };

  return (
    <form
      onSubmit={handlePasswordSubmit}
      className="flex flex-col space-y-2 rounded-lg bg-muted px-6 py-4"
    >
      <div className="flex items-center justify-between font-semibold">
        <h3 className="text-lg">Password</h3>
        <span
          onClick={() => setTogglePassword(!togglePassword)}
          className="flex cursor-pointer items-center gap-1 text-sm"
        >
          <Pencil size={16} className="text-sm" /> Edit Password
        </span>
      </div>
      {togglePassword ? (
        <>
          <Input
            id="password"
            value={passwordForm.data.password}
            onChange={(e) => passwordForm.setData("password", e.target.value)}
          />
          {passwordForm.errors.password && (
            <div>{passwordForm.errors.password}</div>
          )}
          <div>
            <Button>Save</Button>
          </div>
        </>
      ) : (
        <div>{password}</div>
      )}
    </form>
  );
}

export default PasswordForm;
