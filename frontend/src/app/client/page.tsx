import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ClientTable from "@/components/MUI/ClientTable";


export const metadata: Metadata = {
  title: "Client Page",
  description:
    "All Clients",
  // other metadata
};

const CalendarPage = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        <Breadcrumb pageName="All Clients" />
        <ClientTable />
        
        
      </div>
    </DefaultLayout>
  );
};

export default CalendarPage;
