import { BRAND } from "@/types/hearings";
import Image from "next/image";

const hearingData: BRAND[] = [
  {
    logo: "/images/brand/brand-01.svg",
    clientName: "Google",
    caseID: 3.5,
    lawyerName: "Harvey",
    court: "H.C. Multan",
    courtRoom: 590,
    judge: "Beloni",
    date: "23-10-2003",
    time: "12:00 PM"
  },
  {
    logo: "/images/brand/brand-02.svg",
    clientName: "X.com",
    caseID: 2.2,
    lawyerName: "Harvey",
    court: "H.C. Multan",
    courtRoom: 467,
    judge: "Beloni",
    date: "23-10-2003",
    time: "12:00 PM"
  },
  {
    logo: "/images/brand/brand-03.svg",
    clientName: "Github",
    caseID: 2.1,
    lawyerName: "Harvey",
    court: "H.C. Multan",
    courtRoom: 420,
    judge: "Beloni",
    date: "23-10-2003",
    time: "12:00 PM"
  },
  {
    logo: "/images/brand/brand-04.svg",
    clientName: "Vimeo",
    caseID: 1.5,
    lawyerName: "Harvey",
    court: "H.C. Multan",
    courtRoom: 389,
    judge: "Beloni",
    date: "23-10-2003",
    time: "12:00 PM"
  },
  {
    logo: "/images/brand/brand-05.svg",
    clientName: "Facebook",
    caseID: 1.2,
    lawyerName: "Harvey",
    court: "H.C. Multan",
    courtRoom: 230,
    judge: "Beloni",
    date: "23-10-2003",
    time: "12:00 PM"
  },
];

const TableOne = () => {
  return (
    <div className="rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card">
      <h4 className="mb-5.5 text-body-2xlg font-bold text-dark dark:text-white">
        Upcoming Hearings
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-4 sm:grid-cols-8">
          <div className="px-2 pb-3.5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Client
            </h5>
          </div>
          <div className="px-2 pb-3.5 text-center">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Case ID
            </h5>
          </div>
          <div className="px-2 pb-3.5 text-center">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Lawyer
            </h5>
          </div>
          <div className="hidden px-2 pb-3.5 text-center sm:block">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Court
            </h5>
          </div>
          <div className="hidden px-2 pb-3.5 text-center sm:block">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Court Room
            </h5>
          </div>
          <div className="hidden px-2 pb-3.5 text-center sm:block">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Judge
            </h5>
          </div>
          <div className="hidden px-2 pb-3.5 text-center sm:block">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Date
            </h5>
          </div>
          <div className="hidden px-2 pb-3.5 text-center sm:block">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Time
            </h5>
          </div>
        </div>

        {hearingData.map((brand, key) => (
          <div
            className={`grid grid-cols-4 sm:grid-cols-8 ${
              key === hearingData.length - 1
                ? ""
                : "border-b border-stroke dark:border-dark-3"
            }`}
            key={key}
          >
            <div className="flex items-center gap-3.5 px-2 py-4">
              <div className="flex-shrink-0">
                <Image src={brand.logo} alt="Brand" width={48} height={48} />
              </div>
              <p className="hidden font-medium text-dark dark:text-white sm:block">
                {brand.clientName}
              </p>
            </div>

            <div className="flex items-center justify-center px-2 py-4">
              <p className="font-medium text-dark dark:text-white">
                {brand.caseID}
              </p>
            </div>

            <div className="flex items-center justify-center px-2 py-4">
              <p className="font-medium text-dark dark:text-white">
                {brand.lawyerName}
              </p>
            </div>

            <div className="flex items-center justify-center px-2 py-4">
              <p className="font-medium text-dark dark:text-white">
                {brand.court}
              </p>
            </div>

            <div className="hidden items-center justify-center px-2 py-4 sm:flex">
              <p className="font-medium text-dark dark:text-white">
                #{brand.courtRoom}
              </p>
            </div>

            <div className="hidden items-center justify-center px-2 py-4 sm:flex">
              <p className="font-medium text-dark dark:text-white">
                Judge {brand.judge}
              </p>
            </div>

            <div className="hidden items-center justify-center px-2 py-4 sm:flex">
              <p className="font-medium text-dark dark:text-white">
                {brand.date}
              </p>
            </div>

            <div className="hidden items-center justify-center px-2 py-4 sm:flex">
              <p className="font-medium text-dark dark:text-white">
                {brand.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOne;
