import { useState } from "react";
import { Option } from "@/components/searchBar";

const apiUrl = 'http://localhost:5100/';
const apiEmpNameRoute = 'api/employees/names';

export const useEmployeeNames = () => {
    const [employeeNames, setEmployeeNames] = useState<Option[]>([]);

    const fetchEmployeeNames = async () => {
        try {
            const response = await fetch(apiUrl + apiEmpNameRoute);
            if (response.ok) {
                const data = await response.json();
                const options = data.map((employee: { name: any; }) => ({
                    label: employee.name,
                    value: employee.name,
                }));
                setEmployeeNames(options);
            } else {
                console.error('Failed to fetch employee names');
            }
        } catch (error) {
            console.error('Error during API call:', error);
        }
    };

    // Call the fetchEmployeeNames function when this hook is used
    useState(() => {
        fetchEmployeeNames();
    });

    return employeeNames;
};
