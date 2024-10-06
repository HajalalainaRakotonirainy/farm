"use client";

import AttendanceChart from "@/components/AttendanceChart";
import CountChart from "@/components/CountChart";
import UserCard from "@/components/UserCard";
import {
  faMars,
  faMarsAndVenus,
  faUsers,
  faVenus,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useEffect, useState } from "react";
const Cookies = require("js-cookie");
import { subMonths, format } from "date-fns";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const AdminPage = () => {
  const [count, setCount] = useState({
    employeeCount: "",
    betailCount: "",
    betailMaleCount: "",
    betailFemelleCount: "",
  });

  const [dataSummary, setDataSummary] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/count-summary", {
        headers: { Authorization: `Token ${Cookies.get("token")}` },
      })
      .then((res) => {
        setCount(res.data);
      });

    const fetchFinancialData = async () => {
      const currentDate = new Date();
      const lastFiveMonthsData: any = [];

      // Array to store all the promises for fetching financial summary data
      const requests = [];

      for (let i = 0; i < 5; i++) {
        const monthDate = subMonths(currentDate, i);
        const monthName = format(monthDate, "MMMM");
        const monthNumber = format(monthDate, "M");

        // Push the axios request promises into the array
        requests.push(
          axios
            .get(
              `http://localhost:8000/api/financial-summary/?year=${currentDate.getFullYear()}&month=${monthNumber}`,
              {
                headers: { Authorization: `Token ${Cookies.get("token")}` },
              }
            )
            .then((response) => {
              const result = response.data;
              lastFiveMonthsData.push({
                name: monthName,
                expenses: result.total_expenses,
                revenue: result.total_revenue,
              });
            })
        );
      }

      // Wait for all financial summary requests to complete
      await Promise.all(requests);

      // Set dataSummary once all requests are done
      setDataSummary(lastFiveMonthsData.reverse());
    };

    fetchFinancialData();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="p-4 flex gap-4 flex-col md:flex-row">
        {/* LEFT */}
        <div className="w-full flex flex-col gap-8">
          {/* USER CARDS */}
          <div className="flex gap-4 justify-between flex-wrap">
            <UserCard
              count={count.betailCount}
              type="Bétails"
              icon={faMarsAndVenus}
            />
            <UserCard
              count={count.betailMaleCount}
              type="Bétails male"
              icon={faMars}
            />
            <UserCard
              count={count.betailFemelleCount}
              type="Bétails femelle"
              icon={faVenus}
            />
            <UserCard
              count={count.employeeCount}
              type="Employées"
              icon={faUsers}
            />
          </div>
          {/* MIDDLE CHARTS */}
          <div className="flex gap-4 flex-col lg:flex-row">
            {/* COUNT CHART */}
            <div className="w-full lg:w-1/3 h-[450px]">
              <CountChart dataCount={count} />
            </div>
            {/* ATTENDANCE CHART */}
            <div className="w-full lg:w-2/3 h-[450px]">
              <AttendanceChart dataSummary={dataSummary} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminPage;
