import React, { useEffect, useState } from "react";
import PerksLabel from "./PerksLabelCom";
import PhotosUploader from "./PhotosUploaderCom";
import { Navigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../Context/authContext";

const PlaceFormCom = () => {
  const { id } = useParams();
  const { token, API } = useAuth();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(1000);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    fetch(`${API}/api/places/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTitle(data.title);
        setAddress(data.address);
        setAddedPhotos(data.photos);
        setDescription(data.description);
        setPerks(data.perks);
        setExtraInfo(data.extraInfo);
        setCheckIn(data.checkIn);
        setMaxGuests(data.maxGuests);
        setCheckOut(data.checkOut);
        setPrice(data.price);
      })
      .catch((error) => console.error("Error fetching place:", error));
  }, [id, token]);

  async function savePlace(ev) {
    ev.preventDefault();
    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };
    const requestOptions = {
      method: id ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(placeData),
    };
    const url = id ? `${API}/api/places/${id}` : `${API}/api/places`;
    try {
      const response = await fetch(url, requestOptions);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseData = await response.json();
      if (id) {
        toast.success("Listing Updated...");
      } else {
        toast.success("New Listing Created...");
      }
      setRedirect(true);
    } catch (error) {
      console.error("Error saving place:", error);
      toast.error("Failed to save place. Please try again.");
    }
  }
  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }
  function inputDescription(text) {
    return <p className="text-gray-500 text-sm truncate">{text}</p>;
  }
  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }
  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }
  return (
    <div className="">
      <h1 className="justify-center flex text-2xl md:text-3xl lg:text-6xl font-bold mt-12 mb-2 underline underline-gray-500">
        <span className="underline" style={{ textDecorationColor: "gray" }}>
          Create New Listing...
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-7 h-7"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z"
          />
        </svg>
      </h1>
      <form onSubmit={savePlace}>
        {preInput("Title", "Title for your place, Should be short and catchy.")}
        <input
          type="text"
          placeholder="StayVista at Colour Bloom..."
          className="w-full mt-2 border rounded-2xl py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          required
        />
        {preInput("Address", "Address to this place.")}
        <input
          type="text"
          placeholder="India,United State..."
          className="w-full mt-2 border rounded-2xl py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
          value={address}
          onChange={(ev) => setAddress(ev.target.value)}
          required
        />
        {preInput("Photos", "More Photos add here.")}

        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

        {preInput("Description", "Description of the place.")}

        <textarea
          cols="15"
          rows="5"
          className="w-full mt-2 border rounded-2xl py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
          required
        ></textarea>
        {preInput("Perks", "Select all the perks of your place.")}
        <PerksLabel selected={perks} onChange={setPerks} />
        {preInput("Extra Info.", "House rules and etc...")}
        <textarea
          cols="15"
          rows="5"
          className="w-full mt-2 border rounded-2xl py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
          value={extraInfo}
          onChange={(ev) => setExtraInfo(ev.target.value)}
          required
        ></textarea>
        {preInput(
          "Check In and Out Times",
          "Add check In & Out time, remenber to have same time window for cleaning the room between guests."
        )}
        <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-4 mt-2">
          <div>
            <h3 className="mt-2 -mb-1">Check In Time</h3>
            <input
              type="text"
              placeholder="14 AM"
              className="w-full mt-2 border rounded-2xl py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
              required
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Check Out Time</h3>
            <input
              type="text"
              placeholder="11 AM"
              className="w-full mt-2 border rounded-2xl py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
              required
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Max number of Guests</h3>
            <input
              type="number"
              className="w-full mt-2 border rounded-2xl py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
              value={maxGuests}
              onChange={(ev) => setMaxGuests(ev.target.value)}
              required
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Price per night.</h3>
            <input
              type="number"
              className="w-full mt-2 border rounded-2xl py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
              value={price}
              onChange={(ev) => setPrice(ev.target.value)}
              required
            />
          </div>
        </div>
        <div>
          <button className="w-full my-4 bg-red-500 text-white text-xl py-2 px-4 rounded-2xl hover:bg-red-600">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default PlaceFormCom;
