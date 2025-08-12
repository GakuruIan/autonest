import React from "react";

import { columns, Payment } from "./Columns";

// data table
import { DataTable } from "./data-table";

async function getData(): Promise<Payment[]> {
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
  ];
}

const RecentPurchase = () => {
  const data = getData();
  return <DataTable columns={columns} data={data} />;
};

export default RecentPurchase;
