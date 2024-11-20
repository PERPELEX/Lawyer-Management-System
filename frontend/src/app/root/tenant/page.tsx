import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TenantTable from "@/components/MUI/TenantTable";


export const metadata: Metadata = {
  title: "Tenant Page",
  description:
    "All Tenant",
  // other metadata
};

const CalendarPage = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        <Breadcrumb pageName="All Tenant" />
        <TenantTable />
        
        
      </div>
    </DefaultLayout>
  );
};

export default CalendarPage;
