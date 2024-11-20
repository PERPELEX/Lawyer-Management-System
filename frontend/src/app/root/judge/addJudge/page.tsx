import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import MultiStepForm from "@/components/MultiStep/JudgeForm";



export const metadata: Metadata = {
  title: "Add Judge Page",
  description:
    "Add Judge",
  // other metadata
};

const CalendarPage = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        <Breadcrumb pageName="Add Judge" />
        <MultiStepForm />
        
      </div>
    </DefaultLayout>
  );
};

export default CalendarPage;
