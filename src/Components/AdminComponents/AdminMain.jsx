import React from "react";
import { FaUserShield, FaUsers, FaAddressBook, FaCogs } from "react-icons/fa";
import { Link, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../Context/authContext";
import Chart from "react-apexcharts";

const AdminMain = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
        <div className="relative inline-block">
          <button
            disabled
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
          >
            <svg
              aria-hidden="true"
              role="status"
              className="inline w-4 h-4 me-3 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>
            Loading...
          </button>
        </div>
      </div>
    );
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
