import React from "react";
import { toast } from "react-toastify";

const AddressLinkCom = ({ children, className = null }) => {
  const handleShareBtn = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Share listings...",
          text: "You share this listing...",
          url: "https://riteshdev-bookingapp.netlify.app",
        })
        .then(() => toast.success("Shared successfully"))
        .catch((error) => console.error("Error sharing:", error));
    } else {
      console.log("Web Share API not supported");
      // Fallback for browsers that do not support Web Share API
      // You can use a custom sharing solution or display an error message
    }
  };
  const handleSaveBtn = () => {
    // Get the current page's HTML content
    const htmlContent = document.documentElement.outerHTML;

    // Create a Blob object from the HTML content
    const blob = new Blob([htmlContent], { type: "text/html" });

    // Create a URL for the Blob object
    const url = URL.createObjectURL(blob);

    // Create a link element to trigger the download
    const link = document.createElement("a");
    link.href = url;
    link.download = "page.html";

    // Append the link to the document and trigger the download
    document.body.appendChild(link);
    link.click();
    toast.success("Downlode successfully");
    // Clean up by removing the link and revoking the URL
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (!className) {
    className = "flex my-3 block";
  }
  className += "flex gap-1 font-semibold underline";
  return (
    <div className="flex flex-wrap items-center">
      <a
        className={className}
        target="_blank"
        href={"https://maps.google.com/?q=" + children}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="red"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
          />
        </svg>

        <p className="flex truncate">{children}</p>
      </a>
      <div className="lg:ml-auto flex">
        <button
          className="text-black font-semibold  hover:font-bold underline px-4 py-2 rounded-full flex gap-2"
          onClick={handleShareBtn}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="green"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
            />
          </svg>
          Share...
        </button>
        <button
          className="text-black font-semibold hover:font-bold underline px-4 py-2 rounded-full flex gap-2"
          onClick={handleSaveBtn}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="blue"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
            />
          </svg>
          Save...
        </button>
      </div>
    </div>
  );
};

export default AddressLinkCom;
