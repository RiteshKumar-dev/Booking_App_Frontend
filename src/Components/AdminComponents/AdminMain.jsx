import React from "react";
import { FaUserShield, FaUsers, FaAddressBook, FaCogs } from "react-icons/fa";
import { Link, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../Context/authContext";
import Chart from "react-apexcharts";
import LoadingCom from "../LoadingCom";

const AdminMain = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingCom />;
  }

  if (!user.isAdmin) {
    return <Navigate to="/" />;
  }

  const options = {
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
    },
  };

  const series = [
    {
      name: "series-1",
      data: [30, 40, 45, 50, 49, 60, 70, 91, 125],
    },
  ];
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
    <>
      <div>
        <div className="mt-8 pt-10 px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800 border-b-2 border-gray-300 pb-2 flex justify-center gap-3">
            <Link to={"/"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
                />
              </svg>
            </Link>{" "}
            Admin Dashboard...
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to="/admin"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center justify-center"
            >
              <FaUserShield className="mr-2" />
              Admin
            </Link>
            <Link
              to="/admin/users"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md flex items-center justify-center"
            >
              <FaUsers className="mr-2" />
              Users
            </Link>
            <Link
              to="/admin/contacts"
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md flex items-center justify-center"
            >
              <FaAddressBook className="mr-2" />
              Contacts
            </Link>
            <Link
              to="/admin/services"
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md flex items-center justify-center"
            >
              <FaCogs className="mr-2" />
              Services
            </Link>
          </div>

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

          <div className="mt-8 bg-white p-4 rounded-lg shadow-md overflow-x-auto">
            <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">Order ID</th>
                  <th className="px-4 py-2">Customer Name</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">1</td>
                  <td className="border px-4 py-2">John Doe</td>
                  <td className="border px-4 py-2">
                    <span className="bg-yellow-200 text-yellow-800 py-1 px-2 rounded">
                      Pending...
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">2</td>
                  <td className="border px-4 py-2">Jane Doe</td>
                  <td className="border px-4 py-2">
                    <span className="bg-green-200 text-green-800 py-1 px-2 rounded">
                      Shipped...
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">3</td>
                  <td className="border px-4 py-2">Veena kaif</td>
                  <td className="border px-4 py-2">
                    <span className="bg-blue-200 text-blue-800 py-1 px-2 rounded">
                      Success...
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">4</td>
                  <td className="border px-4 py-2">Pranshu</td>
                  <td className="border px-4 py-2">
                    <span className="bg-yellow-200 text-yellow-800 py-1 px-2 rounded">
                      Pending...
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default AdminMain;
