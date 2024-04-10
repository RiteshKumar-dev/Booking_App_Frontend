import React from "react";
import { FaUserShield, FaUsers, FaAddressBook, FaCogs } from "react-icons/fa";
import { Link, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Context/authContext";
import Chart from "react-apexcharts";

const AdminMainIdx = () => {
  const salesOptions = {
    // Sales chart options
    chart: {
      id: "sales-chart",
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    },
  };
  const salesSeries = [
    {
      name: "Sales",
      data: [30, 40, 45, 50, 49, 60],
    },
  ];
  const userOptions = {
    // User statistics chart options
    chart: {
      id: "user-statistics-chart",
      type: "pie",
    },
    labels: ["Active Users", "Inactive Users"],
    dataLabels: {
      enabled: false,
    },
  };

  const userSeries = [800, 200];

  return (
    <div className="mb-4">
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 cursor-pointer">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Sales Chart</h3>
          <Chart
            options={salesOptions}
            series={salesSeries}
            type="bar"
            height={300}
          />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">User Statistics</h3>
          <Chart
            options={userOptions}
            series={userSeries}
            type="pie"
            height={300}
          />
          <p>Total Users: 1000</p>
          <p>Active Users: 800</p>
          <p>Inactive Users: 200</p>
        </div>
      </div>
    </div>
  );
};

export default AdminMainIdx;
