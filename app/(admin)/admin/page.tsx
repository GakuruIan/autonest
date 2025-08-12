import React from "react";

// icons
import { Car, PackageSearch, ListChecks, Wallet } from "lucide-react";

// components
import Chart from "@/components/Chart/Chart";
import RecentPurchase from "@/components/Datatable/RecentPurchase/RecentPurchase";

const page = () => {
  return (
    <div className="flex flex-col gap-4">
      {/* Key performance metrics */}
      <div className="grid md:grid-cols-4 grid-cols-1 gap-2 ">
        {/* listing card */}
        <div className="dark:bg-neutral-500/10 rounded-sm border dark:border-neutral-500/20 p-4">
          <div className="flex items-center flex-col space-y-4">
            <div className="flex items-center gap-x-1.5 ">
              <Car size={24} />

              <h2 className="tracking-wider font-poppins text-sm">
                Total Car Listing
              </h2>
            </div>

            <h5 className="text-lg text-center font-poppins tracking-wider font-bold">
              20
            </h5>
          </div>
        </div>

        {/* pending approval card */}
        <div className="dark:bg-neutral-500/10 rounded-sm border dark:border-neutral-500/20 p-4">
          <div className="flex items-center flex-col space-y-4">
            <div className="flex items-center gap-x-1.5 ">
              <PackageSearch size={20} />

              <h2 className="tracking-wider font-poppins text-sm">
                Pending Approvals
              </h2>
            </div>

            <h5 className="text-lg text-center font-poppins tracking-wider font-bold">
              5
            </h5>
          </div>
        </div>

        {/* sales  card */}
        <div className="dark:bg-neutral-500/10 rounded-sm border dark:border-neutral-500/20 p-4">
          <div className="flex items-center flex-col space-y-4">
            <div className="flex items-center gap-x-1.5 ">
              <ListChecks size={20} />

              <h2 className="tracking-wider font-poppins text-sm">
                Sold This Month
              </h2>
            </div>

            <h5 className="text-lg text-center font-poppins tracking-wider font-bold">
              50
            </h5>
          </div>
        </div>

        {/*month's revenue  card */}
        <div className="dark:bg-neutral-500/10 rounded-sm border dark:border-neutral-500/20 p-4">
          <div className="flex items-center flex-col space-y-4">
            <div className="flex items-center gap-x-1.5 ">
              <Wallet size={20} />

              <h2 className="tracking-wider font-poppins text-sm">
                Revenue This Month
              </h2>
            </div>

            <h5 className="text-lg text-center font-poppins tracking-wider font-bold">
              Ksh 10M
            </h5>
          </div>
        </div>
      </div>

      {/* statitists */}
      <div className="dark:bg-neutral-500/10 rounded-sm border dark:border-neutral-500/20 p-4">
        <h5 className="text-base font-poppins mb-4">
          Sales Performance Overview
        </h5>
        <Chart />
      </div>

      {/* sales */}

      <div className="dark:bg-neutral-500/10 rounded-sm border dark:border-neutral-500/20 p-4">
        <h5 className="text-base font-poppins mb-4">
          Sales Performance Overview
        </h5>

        <RecentPurchase />
      </div>
    </div>
  );
};

export default page;
