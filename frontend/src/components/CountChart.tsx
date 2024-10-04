"use client";
import { faCow } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CountChart = ({dataCount} : {dataCount: any}) => {
  const data = [
    {
      name: "Total",
      count: dataCount.betailCount,
      fill: "white",
    },
    {
      name: "Femelle",
      count: dataCount.betailFemelleCount,
      fill: "#FAE27C",
    },
    {
      name: "Male",
      count: dataCount.betailMaleCount,
      fill: "#C3EBFA",
    },
  ];
  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
      {/* TITLE */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Bétails</h1>
        <FontAwesomeIcon icon={faCow} color="blue" size="2x" width={40} height={40} />
      </div>
      {/* CHART */}
      <div className="relative w-full h-[75%]">
        <ResponsiveContainer>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="40%"
            outerRadius="100%"
            barSize={32}
            data={data}
          >
            <RadialBar background dataKey="count" />
          </RadialBarChart>
        </ResponsiveContainer>
        <Image
          src="/maleFemale.png"
          alt=""
          width={50}
          height={50}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      {/* BOTTOM */}
      <div className="flex justify-center gap-16">
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-lamaSky rounded-full" />
          <h1 className="font-bold">{dataCount.betailMaleCount}</h1>
          <h2 className="text-xs text-gray-300">Male</h2>
        </div>
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-lamaYellow rounded-full" />
          <h1 className="font-bold">{dataCount.betailFemelleCount}</h1>
          <h2 className="text-xs text-gray-300">Femelle</h2>
        </div>
      </div>
    </div>
  );
};

export default CountChart;