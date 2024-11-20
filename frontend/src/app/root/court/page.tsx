import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CourtTable from "@/components/MUI/CourtTable";


export const metadata: Metadata = {
  title: "Court Page",
  description:
    "All Court",
  // other metadata
};

const CalendarPage = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        <Breadcrumb pageName="All Court" />
        <CourtTable />
        
        
      </div>
    </DefaultLayout>
  );
};

export default CalendarPage;
