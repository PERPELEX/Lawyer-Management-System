import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import MultiStepForm from "@/components/MultiStep/CourtForm";



export const metadata: Metadata = {
  title: "Add Court Page",
  description:
    "Add Court",
  // other metadata
};

const CalendarPage = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        <Breadcrumb pageName="Add Court" />
        <MultiStepForm />
        
      </div>
    </DefaultLayout>
  );
};

export default CalendarPage;
