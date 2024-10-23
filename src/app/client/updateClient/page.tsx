import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import MultiStepForm from "@/components/MultiStepUpdate/updateClient";



export const metadata: Metadata = {
  title: "Update Client Page",
  description:
    "Update Client",
  // other metadata
};

const CalendarPage = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        <Breadcrumb pageName="Update Clients" />
        <MultiStepForm />
        
      </div>
    </DefaultLayout>
  );
};

export default CalendarPage;
