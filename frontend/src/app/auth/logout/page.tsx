"use client";

import React, { useEffect, useState } from "react";
import $ from "jquery";
import Navbar from "@/components/Navbar";
const Cookies = require("js-cookie");
import axios from "axios";
import DataTable from "react-data-table-component";

export default function Betail() {
  const [betail, setBetail] = useState([]);
  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
  ];
  const data = [
    {
      id: "12",
      name: "haja",
    },
    {
      id: "13",
      name: "test",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="flex flex-wrap justify-center ">
        <button className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
          Ajouter
        </button>
      </div>
      <div>
        <DataTable
          columns={columns}
          data={data}
          fixedHeader
          pagination
          responsive
        />
      </div>
    </>
  );
}
