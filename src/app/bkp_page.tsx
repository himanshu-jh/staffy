"use client"

import styles from "./page.module.css";
import { Option, AutoComplete } from "@/components/searchBar";
import PaymentTab from "@/components/paymentsSection";
import { useState } from "react";
import { MyContextProvider } from "@/components/context";

import { DataTable } from "@/components/dataTable/dataTable"
import EmployeeTable from "@/components/employeeNamesTable";
import { ProfileDropdownMenu } from "@/components/profileDropdown";
import EmployeeDetailsTable from "@/components/employeeDetailsTab";

// API Endpoints
const apiUrl = 'http://localhost:5100/';
const apiTxnRoute = 'api/transactions';
const apiEmpDetailsRoute = 'api/employees';
const apiEmpNameRoute = 'api/employees/names';



const Home = () => {
  // Employees for searching in the name field
  const employee_names = [{value: 'Emp 1', label: 'Emp1'}, {label: 'Person 2', value:'Person 2'},{label: 'Aman', value: 'Aman'}]
  // For Payments Tab
  
 // Search selection
 const [selectedOption, setSelectedOption] = useState<Option | null>(null); 

    return (
      <MyContextProvider>
        <div className={styles.MainPage}>
            <div className={styles.Section1}>
            <h1>My Books</h1>
                {/* // My Books text */}
                {/* // Employee Names */}
              <EmployeeTable employeeApiUrl={apiUrl+apiEmpNameRoute} />
                
            </div>
            <div className={styles.Section2}>
                
                <div className={styles.Section2_1_NavBar}>
                    {/* // NavBar */}
                    
                    Jairam Fruit Company
                    <div className={styles.my_account_button}>
                      <ProfileDropdownMenu />
                    </div>
                </div>
                <div className={styles.Section2_2_InputName}>
                <h1>Name</h1>
                {/* // Input Name */}
                <AutoComplete 
                  options={employee_names}
                  emptyMessage="Not found"
                  placeholder="Enter the name of employee.."
                  value={selectedOption}
                  onValueChange={setSelectedOption}
                  />       
              
                </div>
                <div className={styles.Section2_3}>
                
                    {/* /// Section 2.3 */}
                    <div className={styles.Section2_3_1}>
                    
                        {/* // Employee Details */}
                        <EmployeeDetailsTable 
                        employeeDetailsApiUrl={apiUrl+apiEmpDetailsRoute}
                        employeeName={selectedOption?.value}
                        />
                        {/* // Make / Receive Payment Section */}
                        <PaymentTab apiUrl={apiUrl+apiTxnRoute} />
                    </div>
                    <div className={styles.Section2_3_2_Transactions}>
                    
                        {/* // Transactions */}
                        <div className="container mx-auto py-10">
                          <DataTable />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </MyContextProvider>
    );
}

export default Home;