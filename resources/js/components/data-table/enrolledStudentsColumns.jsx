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

const globalFilterFn = (row, columnId, filterValue) => {
  const name = row.original.name?.toLowerCase() ?? "";
  const email = row.original.email?.toLowerCase() ?? "";
  const search = filterValue.toLowerCase();

  return name.includes(search) || email.includes(search);
};

export const enrolledStudentsColumns = [
  {
    accessorKey: "name",
    header: "Name",
    filterFn: globalFilterFn,
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
          ) : row.original.status == "2" ? (
            <span className="text-destructive">Expired</span>
          ) : (
            <span className="text-gray-500">Disabled</span>
          )}
        </>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { id, expiration_date, status } = row.original;
      const courseId = usePage().props.course.id;
      const { enqueueSnackbar, closeSnackbar } = useSnackbar();

      const [openDialog, setOpenDialog] = useState(false);
      const [openDropdown, setOpenDropdown] = useState(false);
      const form = useForm({
        expiration_date: expiration_date,
        userId: id,
        courseId: courseId,
      });

      const submit = useCallback(
        (id, expiration_date, courseId) => {
          form.put(`/course/${id}/enrolled/update-expiration`, {
            data: { userId: id, expiration_date, courseId },
            onSuccess: () => {
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
          });
        },
        [form],
      );

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
                <DialogTrigger className="w-full rounded-sm px-2 py-1.5 text-left hover:bg-accent hover:text-accent-foreground">
                  <span className="text-sm">Edit Expiration</span>
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
                      <input
                        type="date"
                        id="expiration_date"
                        value={form.data.expiration_date}
                        onChange={(e) =>
                          form.setData("expiration_date", e.target.value)
                        }
                        className="col-span-3 w-full rounded-md border p-2"
                      />
                      {form.errors.expiration_date && (
                        <div className="col-span-4 w-full text-sm text-destructive">
                          {form.errors.expiration_date}
                        </div>
                      )}
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      onClick={() => submit(id, expiration_date, courseId)}
                      type="submit"
                      disabled={form.processing}
                    >
                      Save changes
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </DropdownMenuItem>
            <Link
              as="button"
              href={`/course/${id}/enrolled/toggle-status`}
              method="put"
              data={{ userId: id, courseId, status, expiration_date }}
              className="w-full"
            >
              <DropdownMenuItem>
                {status != 3 ? "Disable" : "Enable"}
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
