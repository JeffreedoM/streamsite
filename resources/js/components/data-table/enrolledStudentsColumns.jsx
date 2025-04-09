import { router, useForm, usePage } from "@inertiajs/react";

import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Link } from "@inertiajs/react";
import { useCallback, useState } from "react";
import { useSnackbar } from "notistack";

export const enrolledStudentsColumns = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    header: "Enrollment Date",
    cell: ({ row }) => {
      return (
        <>
          {new Date(row.original.enrolled_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </>
      );
    },
  },
  {
    // accessorKey: "expiration_date",
    header: "Expiration Date",
    cell: ({ row }) => {
      const { expiration_date } = row.original;
      const current = new Date(row.original.expiration_date).toLocaleDateString(
        "en-US",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        },
      );
      return (
        // <Select defaultValue={current}>
        //   <SelectTrigger className="w-[180px]">
        //     <SelectValue placeholder="Select a fruit" />
        //   </SelectTrigger>
        //   <SelectContent>
        //     <SelectGroup>
        //       <SelectLabel>Expiration Date</SelectLabel>
        //       <SelectItem value={current}>
        //         {new Date(row.original.expiration_date).toLocaleDateString(
        //           "en-US",
        //           {
        //             year: "numeric",
        //             month: "long",
        //             day: "numeric",
        //           },
        //         )}
        //       </SelectItem>
        //       <SelectItem value="banana">Increase by 7 days</SelectItem>
        //       <SelectItem value="blueberry">Increase by 1 month</SelectItem>
        //       <SelectItem value="grapes">Increase by 6 months</SelectItem>
        //       <SelectItem value="pineapple">Increase by 1 year</SelectItem>
        //     </SelectGroup>
        //   </SelectContent>
        // </Select>
        <>{current}</>
      );
    },
  },
  {
    header: "Time Left",
    cell: ({ row }) => {
      // Get the enrolled_at and expiration_date from the row (assuming they're passed as strings)
      const enrolledAt = new Date(row.original.enrolled_at);
      const expirationDate = new Date(row.original.expiration_date);

      // Get the difference in milliseconds
      const timeLeft = expirationDate - new Date();

      // If the timeLeft is less than 0, the course has expired
      if (timeLeft <= 0) {
        return "Expired";
      }

      // Calculate time left in days, hours, and minutes
      const daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hoursLeft = Math.floor(
        (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutesLeft = Math.floor(
        (timeLeft % (1000 * 60 * 60)) / (1000 * 60),
      );

      return `${daysLeft}d ${hoursLeft}h ${minutesLeft}m`;
    },
  },
  {
    header: "Status",
    cell: ({ row }) => {
      return (
        <>
          {row.original.status == "1" ? (
            <span className="text-green-600">Active</span>
          ) : (
            <span className="text-destructive">Expired</span>
          )}
        </>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { id, expiration_date } = row.original;
      const courseId = usePage().props.course.id;
      const { enqueueSnackbar, closeSnackbar } = useSnackbar();

      const [openDialog, setOpenDialog] = useState(false);
      const [openDropdown, setOpenDropdown] = useState(false);
      const { data, setData, processing, errors } = useForm({
        expiration_date: expiration_date,
      });

      console.log("course id: ", courseId);
      const submit = useCallback((id, expiration_date, courseId) => {
        // e.preventDefault(); // Might need this if used in a <form>
        router.post(
          `/course/${id}/enrolled/update-expiration`,
          {
            _method: "put",
            userId: id,
            expiration_date,
            courseId, // courseId from outer scope
          },
          {
            onSuccess: (response) => {
              enqueueSnackbar("Expiration updated!", {
                variant: "success",
                anchorOrigin: {
                  vertical: "top",
                  horizontal: "center",
                },
              });
              setOpenDialog(false);
              setOpenDropdown(false);
            },
            onError: (error) => {
              console.error("Update failed:", error);
            },
          },
        );
      }, []); // add courseId to dependencies

      return (
        <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Dialog key={id} open={openDialog} onOpenChange={setOpenDialog}>
                <DialogTrigger className="w-full py-1.5 hover:bg-accent hover:text-accent-foreground">
                  <span className="py-1.5 text-sm">Edit Expiration</span>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Update Expiration Date</DialogTitle>
                    <DialogDescription>
                      Make changes to the expiration date here. Click save when
                      you're done.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="expiration_date" className="text-right">
                        Expiration Date
                      </Label>
                      <Input
                        id="expiration_date"
                        value={data.expiration_date}
                        onChange={(e) =>
                          setData("expiration_date", e.target.value)
                        }
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      onClick={() => submit(id, data.expiration_date, courseId)}
                      type="submit"
                      disabled={processing}
                    >
                      Save changes
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
