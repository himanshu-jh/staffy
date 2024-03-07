import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type EmployeeTableProps = {
  employeeApiUrl: string;
};

type EmployeeData = {
  name: string;
};

const EmployeeTable: React.FC<EmployeeTableProps> = ({ employeeApiUrl }) => {
  const [employeeNames, setEmployeeNames] = useState<EmployeeData[]>([]);

  useEffect(() => {
    // Fetch employee names from the API
    const fetchEmployeeNames = async () => {
      try {
        const response = await fetch(employeeApiUrl);
        if (response.ok) {
          const data = await response.json();
          setEmployeeNames(data); // Assuming data is an array of { "name": "employeeName" }
        } else {
          console.error("Failed to fetch employee names");
        }
      } catch (error) {
        console.error("Error during API call:", error);
      }
    };

    fetchEmployeeNames();
  }, [employeeApiUrl]);

  return (
    <Table>
      {/* <TableCaption>List of Employee Names</TableCaption> */}
      <TableHeader>
        <TableRow>
          <TableHead>Employees</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {employeeNames.map((employee) => (
          <TableRow key={employee.name}>
            <TableCell>{employee.name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default EmployeeTable;
