import React, { useEffect, useState } from "react";
import { useAuth } from "../../Context/authContext";
import { toast } from "react-toastify";
import AdminMainIdx from "../AdminMainIdx";
import { Link } from "react-router-dom";

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const { authorizationToken, API } = useAuth();

  const getAllContacts = async () => {
    try {
      const response = await fetch(`${API}/api/form/contacts`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      console.log("Contacts", data);
      setContacts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllContacts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`${API}/api/form/contacts/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
      });
      toast.success("Contact Deleted...!");
      setContacts(contacts.filter((contact) => contact._id !== id));
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = (id) => {
    toast.success(id);
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
        Contacts...
      </h2>
      {contacts.length === 0 ? (
        <p className="text-center text-gray-600">No contacts to display.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {contacts.map((contact) => (
              <div
                key={contact._id}
                className="bg-white shadow-md rounded-lg overflow-hidden"
              >
                <div className="p-4">
                  <h2 className="text-lg font-bold text-gray-800">
                    {contact.username}
                  </h2>
                  <p className="text-gray-600 mt-2">Email: {contact.email}</p>
                  <p className="text-gray-600 mt-2">
                    Message: {contact.message}
                  </p>
                  <div className="flex justify-end mt-4">
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md mr-2 flex gap-1"
                      onClick={() => handleDelete(contact._id)}
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
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex gap-1"
                      onClick={() => handleEdit(contact._id)}
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
                            d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                        </svg>
                      </p>
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <AdminMainIdx />
        </>
      )}
    </div>
  );
};

export default AdminContacts;
