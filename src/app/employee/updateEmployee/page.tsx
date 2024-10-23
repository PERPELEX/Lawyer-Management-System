import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import MultiStepForm from "@/components/MultiStepUpdate/updateEmployee";



export const metadata: Metadata = {
  title: "Update Employee Page",
  description:
    "Update Employee",
  // other metadata
};

const CalendarPage = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        <Breadcrumb pageName="Update Employee" />
        <MultiStepForm />
        
      </div>
    </DefaultLayout>
  );
};

export default CalendarPage;
