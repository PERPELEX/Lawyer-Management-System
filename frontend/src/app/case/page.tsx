import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CaseTable from "@/components/MUI/CaseTable";


export const metadata: Metadata = {
  title: "Case Page",
  description:
    "All Cases",
  // other metadata
};

const CalendarPage = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        <Breadcrumb pageName="All Cases" />
        <CaseTable />
        
        
      </div>
    </DefaultLayout>
  );
};

export default CalendarPage;
