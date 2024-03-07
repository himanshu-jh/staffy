import React, { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EmployeeDetails {
  name: string;
  employeeId: string;
  department: string;
  position: string;
  hire_date: string;
  salary: number;
  contact_number: string;
  email: string;
  address: string;
}

export interface DialogDemoProps {
  api_url: string;
}

export const DialogDemo: React.FC<DialogDemoProps> = ({ api_url }) => {
  const [open, setOpen] = useState(false);
  const [employeeDetails, setEmployeeDetails] = useState<EmployeeDetails>({
    name: "",
    employeeId: "",
    department: "",
    position: "",
    hire_date: "",
    salary: 0,
    contact_number: "",
    email: "",
    address: "",
  });


  const handleChange = (field: keyof EmployeeDetails, value: string | number) => {
    setEmployeeDetails((prevDetails) => ({ ...prevDetails, [field]: value }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(api_url, {  // Use api_url directly here
        method: "POST", // or "PUT" if you are updating existing data
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employeeDetails),
      });
  
      if (response.ok) {
        console.log("Employee details saved successfully!");
      } else {
        console.error("Failed to save employee details");
      }
    } catch (error) {
      console.error("Error during API call:", error);
    }
  
    // After successful API request, close the dialog
    setOpen(false);
  };

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Dialog open={open} onOpenChange={handleClick}>
      <DialogTrigger asChild>
        <Button variant="default" onClick={handleClick}>
          Add New Employee
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle>Add New Employee</DialogTitle>
          <DialogDescription>
            Add details for the new employee. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-row">
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={employeeDetails.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="employeeId" className="text-right">
              Employee ID
            </Label>
            <Input
              id="employeeId"
              value={employeeDetails.employeeId}
              onChange={(e) => handleChange("employeeId", e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="department" className="text-right">
              Department
            </Label>
            <Input
              id="department"
              value={employeeDetails.department}
              onChange={(e) => handleChange("department", e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="position" className="text-right">
              Position
            </Label>
            <Input
              id="position"
              value={employeeDetails.position}
              onChange={(e) => handleChange("position", e.target.value)}
              className="col-span-3"
            />
          </div>
          </div>
          <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="hire_date" className="text-right">
              Hire Date
            </Label>
            <Input
              id="hire_date"
              value={employeeDetails.hire_date}
              onChange={(e) => handleChange("hire_date", e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="salary" className="text-right">
              Salary
            </Label>
            <Input
              id="salary"
              type="number"
              value={employeeDetails.salary}
              onChange={(e) => handleChange("salary", Number(e.target.value))}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="contact_number" className="text-right">
              Contact Number
            </Label>
            <Input
              id="contact_number"
              value={employeeDetails.contact_number}
              onChange={(e) => handleChange("contact_number", e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={employeeDetails.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address" className="text-right">
              Address
            </Label>
            <Input
              id="address"
              value={employeeDetails.address}
              onChange={(e) => handleChange("address", e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}