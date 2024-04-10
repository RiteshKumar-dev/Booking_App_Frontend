import React, { useEffect, useState } from "react";
import { useAuth } from "../../Context/authContext";
import { useParams, Navigate, Link } from "react-router-dom";
import Chart from "react-apexcharts";
import { toast } from "react-toastify";

const AdminUserUpdate = () => {
  const [redirect, setRedirect] = useState("");
  const [data, setData] = useState({
    username: "",
    email: "",
    phone: "",
  });
  const params = useParams();
  const { authorizationToken, API } = useAuth();
  const URL = `${API}/api/admin/users/${params.id}`;

  const getSingleUserData = async () => {
    try {
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const userData = await response.json();
      console.log("single user data", userData);
      setData(userData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleUserData();
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${API}/api/admin/users/update/${params.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken,
          },
          body: JSON.stringify(data),
        }
      );
      const updatedData = await response.json();
      toast.success("User data updated...");
      console.log("Updated user data", updatedData);
      setRedirect(`/admin/users`);
    } catch (error) {
      toast.error("User data notUpdated...!");
      console.log("Error updating user", error);
    }
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  // User statistics data (replace with your actual data)
  const users = 100;
  const activeUsers = 80;
  const inactiveUsers = users - activeUsers;
  const userOptions = {
    labels: ["Active Users", "Inactive Users"],
    colors: ["#34D399", "#F87171"],
  };
  const userSeries = [activeUsers, inactiveUsers];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12 pt-10">
      <div className="grid cursor-pointer">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">User Statistics</h3>
          <Chart
            options={userOptions}
            series={userSeries}
            type="pie"
            height={300}
          />
          <p>Total Users: {users}</p>
          <p>Active Users: {activeUsers}</p>
          <p>Inactive Users: {inactiveUsers}</p>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 flex gap-3">
          <Link to={"/admin/users"}>
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
          </Link>
          Update User...
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={data.username}
              onChange={handleInput}
              className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={data.email}
              onChange={handleInput}
              className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={data.phone}
              onChange={handleInput}
              className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminUserUpdate;
