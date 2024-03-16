"use client"

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

import styles from "./page.module.css";
import { Option, AutoComplete } from "@/components/searchBar";
import PaymentTab from "@/components/paymentsSection";
import { useState } from "react";

import { DataTable } from "@/components/dataTable/dataTable"
import EmployeeDetailsTable from "@/components/employeeDetailsTab";
import NavBar from "@/components/navBar";
import { DialogDemo } from "@/components/dialogDemo";
import { redirect } from "next/navigation";

import LoadingIcons from 'react-loading-icons'

// API Endpoints
const apiUrl = 'http://localhost:5100/';
const apiTxnRoute = 'api/transactions';
const apiEmpDetailsRoute = 'api/employees';
const apiEmpNameRoute = 'api/employees/names';

import { useEmployeeNames } from "@/components/api";

function Home () {
  const employeeNames = useEmployeeNames();
  
 // Search selection
 const [selectedOption, setSelectedOption] = useState<Option | null>(null); 


const { isAuthenticated, isLoading, user } = useKindeBrowserClient();

if (isLoading) return <div><LoadingIcons.Bars /></div>;

if (isAuthenticated) { return (

    <main className={styles.mainPage721}>
      {/* SECTION 1 */}
      <div className={styles.staffSection1}>
        
        <div className={styles.mypeople}>
          {/* user indicates the names of logged in user */}
          <img src="/zamy_text.png" alt="Logo" className="mb-4 mx-auto" style={{ maxWidth: '180px' }} />
        </div>

        <div className={styles.employeeDetails}>
          <div className={styles.scrollArea}>
            {/* selectedOption indicates the name selected in search */}
            <EmployeeDetailsTable employeeDetailsApiUrl={apiUrl+apiEmpDetailsRoute} employeeName={selectedOption?.value} />
          </div>
        </div>

      </div>

      {/* SECTION 2 */}
      <div className={styles.staffDetailsSection2}>
        <NavBar userName={user?.given_name}/>
        <div className={styles.nameAndDateFrame}>
        <div className="flex flex-row grow content-between justify-between">
          {/* Use the EmployeeSearchInput component */}
          <AutoComplete 
                  options={employeeNames}
                  emptyMessage="Not found"
                  placeholder="Enter the name of employee.."
                  value={selectedOption}
                  onValueChange={setSelectedOption}
                  />
            <DialogDemo api_url={apiUrl+apiEmpDetailsRoute}/>       
        </div>
      </div>
        <div className={styles.body}>
          <div className={styles.employeeDetailsAndPaymentS}>
            <PaymentTab apiUrl={apiUrl+apiTxnRoute} />
          </div>
          <div className="mt-3 flex flex-grow h-full flex-col">
            <DataTable user={selectedOption?.value || ''}/>
          </div>
        </div>
      </div>
    </main>
    );   
  } else {
    // Redirect to login page
    redirect('/login');
    // You can add a placeholder or loading state here if needed
    return <div>Loading...</div>;
  }}

  
export default Home;
