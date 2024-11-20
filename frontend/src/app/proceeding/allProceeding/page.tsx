import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ProceedingTable from "@/components/MUI/ProceedingTable";


export const metadata: Metadata = {
  title: "Proceeding Page",
  description:
    "All Proceedings",
  // other metadata
};

const CalendarPage = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        <Breadcrumb pageName="All Proceedings" />
        <ProceedingTable />
        
        
      </div>
    </DefaultLayout>
  );
};

export default CalendarPage;
