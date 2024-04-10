import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import IndexCom from "./Components/IndexCom";
import LoginCom from "./Components/LoginCom";
import SignupCom from "./Components/SignupCom";
import ProfileCom from "./Components/ProfileCom";
import PlacesCom from "./Components/PlacesCom";
import BookingsCom from "./Components/BookingsCom";
import PlacesFormCom from "./Components/PlaceFormCom";
import UserPlaceCom from "./Components/UserPlaceCom";
import BooKingCom from "./Components/BookingCom";
import PolicyCom from "./Components/PolicyCom";
import CheckoutCom from "./Components/CheckoutCom";
import NotFound_404 from "./Components/NotFound_404";
import Layout from "./Layout";
import AdminMain from "./Components/AdminComponents/AdminMain";
import AdminUsers from "./Components/AdminComponents/AdminUsers";
import AdminUserUpdate from "./Components/AdminComponents/AdminUserUpdate";
import ContactCom from "./Components/ContactCom";
import AdminContacts from "./Components/AdminComponents/AdminContacts";
import AdminServices from "./Components/AdminComponents/AdminServices";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<IndexCom />} />
          <Route path="/login" element={<LoginCom />} />
          <Route path="/signup" element={<SignupCom />} />
          <Route path="/account" element={<ProfileCom />} />
          <Route path="/account/places" element={<PlacesCom />} />
          <Route path="/account/places/new" element={<PlacesFormCom />} />
          <Route path="/account/places/:id" element={<PlacesFormCom />} />
          <Route path="/places/:id" element={<UserPlaceCom />} />
          <Route path="/account/bookings" element={<BookingsCom />} />
          <Route path="/account/bookings/:id" element={<BooKingCom />} />
          <Route path="/policy" element={<PolicyCom />} />
          <Route path="/payment" element={<CheckoutCom />} />
          <Route path="/contact" element={<ContactCom />} />
          <Route path="/admin" element={<AdminMain />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/users/:id/edit" element={<AdminUserUpdate />} />
          <Route path="/admin/contacts" element={<AdminContacts />} />
          <Route path="/admin/services" element={<AdminServices />} />
          <Route path="*" element={<NotFound_404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
