import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import MultiStepForm from "@/components/MultiStep/TenantForm";



export const metadata: Metadata = {
  title: "Add Tenant Page",
  description:
    "Add Tenant",
  // other metadata
};

const CalendarPage = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        <Breadcrumb pageName="Add Tenant" />
        <MultiStepForm />
        
      </div>
    </DefaultLayout>
  );
};

export default CalendarPage;
