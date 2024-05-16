import React from "react";

const GoogleMapCom = () => {
  return (
    <div className="w-full md:w-3/3 lg:w-full mx-auto">
      <iframe
        src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27563.32471767592!2d-97.78125372568357!3d30.282228399999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8644b55c5b4e672b%3A0xa4a14f189cd5fa20!2sThe%20Otis%20Hotel%20Austin%2C%20Autograph%20Collection!5e0!3m2!1sen!2sin!4v1713358700215!5m2!1sen!2sin`}
        width="100%"
        height="300"
        style={{ border: "0", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.5)" }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="rounded-lg overflow-hidden"
      ></iframe>
    </div>
  );
};

export default GoogleMapCom;
