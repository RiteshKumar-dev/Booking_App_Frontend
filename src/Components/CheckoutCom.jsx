import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const CheckoutCom = () => {
  const [redirect, setRedirect] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    toast.success("Payment successfull...");
    setRedirect(true);
  };
  if (redirect) {
    return <Navigate to={"/account/bookings"} />;
  }

  return (
    <div className="container mx-auto p-10 lg:mt-12">
      <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden md:max-w-xl shadow-lg">
        <div className="md:flex">
          <div className="w-full px-6 py-8 md:p-8">
            <div className="flex items-center justify-center mb-6">
              <img
                src="https://img.freepik.com/free-vector/realistic-credit-card-design_23-2149126088.jpg?size=338&ext=jpg&ga=GA1.1.735520172.1710979200&semt=ais"
                alt="Checkout"
                className="w-10 h-10 mr-2"
              />
              <h2 className="text-2xl font-bold text-gray-800">Checkout</h2>
            </div>
            <hr className="mt-5 border-t-2 border-gray-300" />
            <p className="mt-4 text-gray-600"></p>
            <form className="mt-6" onSubmit={handleSubmit}>
              <div className="mb-6">
                <label
                  className="block text-gray-800 font-bold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-800 font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="johndoe@example.com"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-800 font-bold mb-2"
                  htmlFor="card_number"
                >
                  Card Number
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="card_number"
                  type="text"
                  placeholder="**** **** **** 1234"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-800 font-bold mb-2"
                  htmlFor="expiration_date"
                >
                  Expiration Date
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="expiration_date"
                  type="text"
                  placeholder="MM / YY"
                  name="expirationDate"
                  value={formData.expirationDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-800 font-bold mb-2"
                  htmlFor="cvv"
                >
                  CVV
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="cvv"
                  type="text"
                  placeholder="***"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  required
                />
              </div>
              <button
                className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Proceed to pay
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutCom;
