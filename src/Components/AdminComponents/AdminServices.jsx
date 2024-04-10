import React, { useEffect, useState } from "react";
import { useAuth } from "../../Context/authContext";
import { Link } from "react-router-dom";

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const { authorizationToken, API } = useAuth();

  const getAllServices = async () => {
    try {
      const response = await fetch(`${API}/api/data/services`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      console.log("Services", data);
      setServices(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllServices();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`${API}/api/data/services/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
      });
      getAllServices();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="lg:pt-12 lg:mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b-2 border-gray-300 pb-2 flex justify-center gap-3">
        <Link to={"/admin"}>
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
        Services...
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto mt-8 px-4">
        {services.map((service) => (
          <div
            key={service._id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <img
              className="w-full h-48 object-cover object-center"
              src={service.photos}
              alt={service.service}
            />
            <div className="p-4">
              <h2 className="text-lg font-bold text-gray-800">
                {service.service}
              </h2>
              <p className="text-gray-600 mt-2">
                Description: {service.description}
              </p>
              <p className="text-gray-600 mt-2">Price: {service.price}</p>
              <p className="text-gray-600 mt-2">Provider: {service.provider}</p>
              <div className="flex justify-end mt-4">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md flex gap-"
                  onClick={() => handleDelete(service._id)}
                >
                  <p className="flex gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </p>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminServices;
