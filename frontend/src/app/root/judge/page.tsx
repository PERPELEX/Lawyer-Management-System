import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import JudgeTable from "@/components/MUI/JudgeTable";


export const metadata: Metadata = {
  title: "Judge Page",
  description:
    "All Judge",
  // other metadata
};

const CalendarPage = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        <Breadcrumb pageName="All Judge" />
        <JudgeTable />
        
        
      </div>
    </DefaultLayout>
  );
};

export default CalendarPage;
