import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type EmployeeDetailsTableProps = {
  employeeDetailsApiUrl: string;
  employeeName?: string | null; // Make the prop optional
};

type EmployeeDetails = {
  id: number;
  name: string;
  employee_id: string;
  department?: string;
  position?: string;
  hire_date?: string; // Assuming hire_date is a string in the format "YYYY-MM-DD"
  salary?: number;
  contact_number?: string;
  email?: string;
  address?: string;
  // Add other fields as needed
};

const EmployeeDetailsTable: React.FC<EmployeeDetailsTableProps> = ({
  employeeDetailsApiUrl,
  employeeName,
}) => {
  const [employeeDetails, setEmployeeDetails] = useState<EmployeeDetails | null>(null);

  useEffect(() => {
    // Fetch employee details from the API based on the employee's name
    const fetchEmployeeDetails = async () => {
      try {
        const response = await fetch(`${employeeDetailsApiUrl}/${employeeName}`);
        if (response.ok) {
          const data = await response.json();
          setEmployeeDetails(data); // Assuming data is an object with employee details
        } else {
          console.error("Failed to fetch employee details");
        }
      } catch (error) {
        console.error("Error during API call:", error);
      }
    };

    fetchEmployeeDetails();
  }, [employeeDetailsApiUrl, employeeName]);

  if (!employeeDetails) {
    // You can show a loading state or an error message if needed
    return <div className="text-base">Please select an Employee Name from the Search Bar to see the details here</div>;
  }


  return (
    <Table className="h-full">
      <TableHeader>
        <TableRow>
          <TableHead>Employee Details</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>{employeeDetails.id}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>{employeeDetails.name}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Employee ID</TableCell>
          <TableCell>{employeeDetails.employee_id}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Department</TableCell>
          <TableCell>{employeeDetails.department}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Position</TableCell>
          <TableCell>{employeeDetails.position}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Hire Date</TableCell>
          <TableCell>{employeeDetails.hire_date}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Salary</TableCell>
          <TableCell>{employeeDetails.salary}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Contact Number</TableCell>
          <TableCell>{employeeDetails.contact_number}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Email</TableCell>
          <TableCell>{employeeDetails.email}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Address</TableCell>
          <TableCell>{employeeDetails.address}</TableCell>
        </TableRow>
        {/* Add other fields as needed */}
      </TableBody>
    </Table>
  );
};

export default EmployeeDetailsTable;
