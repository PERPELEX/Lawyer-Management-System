import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CalendarBox from "@/components/CalenderBox";
import NewCalendar from "@/components/NewCalendar";

export const metadata: Metadata = {
  title: "Calender Page",
  description:
    "Cases on the calender",
  // other metadata
};

const CalendarPage = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        <Breadcrumb pageName="Calendar" />

        {/* <CalendarBox /> */}
        <NewCalendar />
      </div>
    </DefaultLayout>
  );
};

export default CalendarPage;
