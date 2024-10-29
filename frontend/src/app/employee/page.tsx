import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import EmployeeTable from "@/components/MUI/EmployeeTable";


export const metadata: Metadata = {
  title: "Employee Page",
  description:
    "All Employees",
  // other metadata
};

const CalendarPage = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        <Breadcrumb pageName="All Employees" />
        <EmployeeTable />
        
        
      </div>
    </DefaultLayout>
  );
};

export default CalendarPage;
