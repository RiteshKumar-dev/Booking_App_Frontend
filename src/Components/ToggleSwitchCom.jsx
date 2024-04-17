import React from "react";

const ToggleSwitchCom = ({ isOn, handleToggle }) => {
  return (
    <>
      <div className="flex items-center justify-center gap-3 font-semibold border border-gray-300 rounded-3xl lg:py-1 lg:px-2 shadow-md shadow-gray-200 lg:w-2/5 mt-3 py-2 px-4  md:mb-2 mb-2">
        <span className="ms-3 sm:text-sm md:text-sm lg:text-lg font-medium text-black">
          Display total before taxes...
        </span>
        <div className="">
          <input
            type="checkbox"
            id="checkbox"
            className="hidden"
            checked={isOn}
            onChange={handleToggle}
          />
          <label
            htmlFor="checkbox"
            className={`w-16 h-9 bg-gray-500 lg:hover:bg-black md:hover:bg-black inline-block relative rounded-full cursor-pointer ${
              isOn ? "bg-green-300" : ""
            }`}
          >
            <span
              className={`w-7 h-7 rounded-full bg-white inline-block absolute top-1 left-1 transition-transform ${
                isOn ? "translate-x-full" : ""
              }`}
            >
              {isOn && (
                <svg
                  className="w-5 h-5 text-green-500 absolute top-1/2 transform -translate-y-1/2 right-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </span>
          </label>
        </div>
      </div>
    </>
  );
};

export default ToggleSwitchCom;
