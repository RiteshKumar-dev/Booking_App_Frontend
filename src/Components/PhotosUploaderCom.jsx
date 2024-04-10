// import React, { useState } from "react";
// import { toast } from "react-toastify";
// import axios from "axios";

// const PhotosUploaderCom = ({ addedPhotos, onChange }) => {
//   const [photosLink, setPhotosLink] = useState("");
//   const [loading, setLoading] = useState(false);

//   async function addPhotoByLink(ev) {
//     ev.preventDefault();
//     try {
//       setLoading(true);
//       // const response = await fetch(
//       //   "https://api.cloudinary.com/v1_1/dtibuxiju/image/upload",
//       //   {
//       //     method: "POST",
//       //     headers: {
//       //       "Content-Type": "application/json",
//       //     },
//       //     body: JSON.stringify({
//       //       file: photosLink,
//       //       upload_preset: "ritesh-booking-app",
//       //       cloud_name: "dtibuxiju",
//       //       // Add any other parameters required by Cloudinary
//       //     }),
//       //   }
//       // );
//       // const data = await response.json();
//       // onChange((prev) => [...prev, data.secure_url]);
//       const { data: fileName } = await axios.post(
//         "http://localhost:5000/api/upload-by-link",
//         {
//           link: photosLink,
//         }
//       );
//       onChange((prev) => [...prev, fileName]);
//       setPhotosLink("");
//     } catch (error) {
//       console.error("Error uploading photo by link:", error);
//     } finally {
//       setLoading(false);
//     }
//   }

//   function uploadPhoto(ev) {
//     const files = ev.target.files;
//     const data = new FormData();
//     for (let i = 0; i < files.length; i++) {
//       data.append("file", files[i]);
//       data.append("upload_preset", "ritesh-booking-app");
//       data.append("cloud_name", "dtibuxiju");
//       // Add any other parameters required by Cloudinary
//     }

//     fetch("https://api.cloudinary.com/v1_1/dtibuxiju/image/upload", {
//       method: "post",
//       body: data,
//     })
//       .then((res) => {
//         return res.json();
//       })
//       .then((data) => {
//         onChange((prev) => [...prev, data.secure_url]);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   function delPhoto(ev, filename) {
//     ev.preventDefault();
//     onChange([...addedPhotos.filter((photo) => photo !== filename)]);
//     toast.success("Remove Image...");
//   }

//   function selectAsMainPhoto(ev, filename) {
//     ev.preventDefault();
//     onChange([filename, ...addedPhotos.filter((photo) => photo !== filename)]);
//     toast.success("Main Image...");
//   }

//   return (
//     <>
//       <div className="flex gap-2">
//         <input
//           type="text"
//           placeholder="Add using a link ....jpg"
//           className="w-full mt-2 border rounded-2xl py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
//           value={photosLink}
//           onChange={(ev) => setPhotosLink(ev.target.value)}
//         />
//         <button
//           onClick={addPhotoByLink}
//           className="py-2 px-3 mt-2 rounded-2xl bg-blue-400"
//         >
//           Add&nbsp;Photo
//         </button>
//       </div>
//       <div className="mt-2 gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
//         {addedPhotos.length > 0 &&
//           addedPhotos.map((link) => (
//             <div className="h-32 flex relative" key={link}>
//               <img
//                 className="rounded-2xl w-full object-cover"
//                 src={
//                   link.includes("cloudinary")
//                     ? link
//                     : "http://localhost:5000/uploads/" + link
//                 }
//                 alt="Image_Link"
//               />
//               <button
//                 onClick={(ev) => delPhoto(ev, link)}
//                 className="cursor-pointer absolute top-1 right-1 text-white bg-black bg-opacity-50 rounded-2xl py-2 px-2"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth={1.5}
//                   stroke="currentColor"
//                   className="w-6 h-6"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
//                   />
//                 </svg>
//               </button>
//               <button
//                 onClick={(ev) => selectAsMainPhoto(ev, link)}
//                 className="cursor-pointer absolute bottom-1 left-1 text-red-500 bg-black bg-opacity-50 rounded-2xl py-1 px-1"
//               >
//                 {link === addedPhotos[0] && (
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 24 24"
//                     fill="currentColor"
//                     className="w-6 h-6"
//                   >
//                     <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
//                   </svg>
//                 )}
//                 {link !== addedPhotos[0] && (
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     strokeWidth={1.5}
//                     stroke="currentColor"
//                     className="w-6 h-6"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
//                     />
//                   </svg>
//                 )}
//               </button>
//             </div>
//           ))}
//         <label className="h-32 flex items-center justify-center gap-1 border bg-transparent rounded-2xl p-2 text-2xl text-gray-600 cursor-pointer">
//           <input
//             type="file"
//             multiple
//             className="hidden"
//             onChange={uploadPhoto}
//           />
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 24 24"
//             fill="currentColor"
//             className="w-8 h-8"
//           >
//             <path
//               fillRule="evenodd"
//               d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm.53 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v5.69a.75.75 0 0 0 1.5 0v-5.69l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z"
//               clipRule="evenodd"
//             />
//           </svg>
//           Uplode
//         </label>
//       </div>
//     </>
//   );
// };

// export default PhotosUploaderCom;

// // import React, { useState } from "react";
// // import axios from "axios";

// // const PhotosUploader = ({ addedPhotos, onChange }) => {
// //   const [photosLink, setPhotosLink] = useState("");
// //   const [loading, setLoading] = useState(false);

// //   async function addPhotoByLink(ev) {
// //     ev.preventDefault();
// //     try {
// //       setLoading(true);
// //       const response = await fetch(
// //         "https://api.cloudinary.com/v1_1/dtibuxiju/image/upload",
// //         {
// //           method: "POST",
// //           headers: {
// //             "Content-Type": "application/json",
// //           },
// //           body: JSON.stringify({
// //             file: photosLink,
// //             upload_preset: "ritesh-booking-app",
// //             cloud_name: "dtibuxiju",
// //             // Add any other parameters required by Cloudinary
// //           }),
// //         }
// //       );
// //       const data = await response.json();
// //       onChange((prev) => [...prev, data.secure_url]);
// //       setPhotosLink("");
// //     } catch (error) {
// //       console.error("Error uploading photo by link:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }

// //   // function uploadPhoto(ev) {
// //   //   setLoading(true);
// //   //   const files = ev.target.files;
// //   //   const data = new FormData();
// //   //   for (let i = 0; i < files.length; i++) {
// //   //     data.append("file", files[i]);
// //   // data.append("upload_preset", "ritesh-booking-app");
// //   // data.append("cloud_name", "dtibuxiju");
// //   //     // Add any other parameters required by Cloudinary
// //   //   }
// //   //   const apiUrl = "https://api.cloudinary.com/v1_1/dtibuxiju/image/upload";
// //   //   const proxyUrl = "https://cors-anywhere.herokuapp.com/";
// //   //   axios
// //   //     .post(proxyUrl + apiUrl, data, {
// //   //       headers: { "content-type": "multipart/form-data" },
// //   //       withCredentials: true,
// //   //       crossDomain: true,
// //   //     })

// //   //     .then((res) => {
// //   //       const {
// //   //         data: { secure_url: imageUrl },
// //   //       } = res;
// //   //       onChange((prev) => [...prev, imageUrl]);
// //   //     })
// //   //     .catch((error) => {
// //   //       console.error("Error uploading photo:", error);
// //   //     })
// //   //     .finally(() => {
// //   //       setLoading(false);
// //   //     });
// //   // }

// //   function uploadPhoto(ev) {
// //     const files = ev.target.files;
// //     const data = new FormData();
// //     for (let i = 0; i < files.length; i++) {
// //       data.append("file", files[i]);
// //       data.append("upload_preset", "ritesh-booking-app");
// //       data.append("cloud_name", "dtibuxiju");
// //       // Add any other parameters required by Cloudinary
// //     }

// //     fetch("https://api.cloudinary.com/v1_1/dtibuxiju/image/upload", {
// //       method: "post",
// //       body: data,
// //     })
// //       .then((res) => {
// //         return res.json();
// //       })
// //       .then((data) => {
// //         onChange((prev) => {
// //           return [...prev, data.secure_url];
// //         });
// //       })
// //       .catch((err) => {
// //         console.log(err);
// //       });
// //   }

// //   function delPhoto(ev, filename) {
// //     ev.preventDefault();
// //     onChange([...addedPhotos.filter((photo) => photo !== filename)]);
// //   }

// //   function selectAsMainPhoto(ev, filename) {
// //     ev.preventDefault();
// //     onChange([filename, ...addedPhotos.filter((photo) => photo !== filename)]);
// //   }

// //   return (
// //     <>
// //       <div className="flex gap-2">
// //         <input
// //           type="text"
// //           placeholder="Add using a link ....jpg"
// //           className="w-full mt-2 border rounded-2xl py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
// //           value={photosLink}
// //           onChange={(ev) => setPhotosLink(ev.target.value)}
// //         />
// //         <button
// //           onClick={addPhotoByLink}
// //           className="py-2 px-3 mt-2 rounded-2xl bg-blue-400"
// //           disabled={loading}
// //         >
// //           {loading ? "Adding..." : "Add Photo"}
// //         </button>
// //       </div>
// //       <div className="mt-2 gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
// //         {addedPhotos.length > 0 &&
// //           addedPhotos.map((link) => (
// //             <div className="h-32 flex relative" key={link}>
// //               <img
// //                 className="rounded-2xl w-full object-cover"
// //                 src={link}
// //                 alt="Image_Link"
// //               />
// //               <button
// //                 onClick={(ev) => delPhoto(ev, link)}
// //                 className="cursor-pointer absolute top-1 right-1 text-white bg-black bg-opacity-50 rounded-2xl py-2 px-2"
// //               >
// //                 Delete
// //               </button>
// //               <button
// //                 onClick={(ev) => selectAsMainPhoto(ev, link)}
// //                 className="cursor-pointer absolute bottom-1 left-1 text-white bg-black bg-opacity-50 rounded-2xl py-1 px-1"
// //               >
// //                 Main
// //               </button>
// //             </div>
// //           ))}
// //         <label className="h-32 flex items-center justify-center gap-1 border bg-transparent rounded-2xl p-2 text-2xl text-gray-600 cursor-pointer">
// //           <input
// //             type="file"
// //             multiple
// //             className="hidden"
// //             onChange={uploadPhoto}
// //             disabled={loading}
// //           />
// //           {loading ? "Uploading..." : "Upload"}
// //         </label>
// //       </div>
// //     </>
// //   );
// // };

// // export default PhotosUploader;

import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../Context/authContext";

const PhotosUploaderCom = ({ addedPhotos, onChange }) => {
  const [photosLink, setPhotosLink] = useState("");
  const [loading, setLoading] = useState(false);
  const { API } = useAuth();

  // async function addPhotoByLink(ev) {
  //   ev.preventDefault();
  //   const { data: filename } = await axios.post(
  //     `${API}/api/upload-by-link`,
  //     {
  //       link: photosLink,
  //     }
  //   );
  //   onChange((prev) => {
  //     return [...prev, filename];
  //   });
  //   setPhotosLink("");
  // }
  // function uploadPhoto(ev) {
  //   const files = ev.target.files;
  //   // console.log({ files });
  //   const data = new FormData();
  //   for (let i = 0; i < files.length; i++) {
  //     data.append("photos", files[i]);
  //   }
  //   axios
  //     .post(`${API}/api/uploa`", data, {
  //       headers: { "Content-type": "multipart/form-data" },
  //     })
  //     .then((response) => {
  //       const { data: filenames } = response;
  //       onChange((prev) => {
  //         return [...prev, ...filenames];
  //       });
  //     });
  // }

  async function addPhotoByLink(ev) {
    ev.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dtibuxiju/image/upload",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            file: photosLink,
            upload_preset: "ritesh-booking-app",
            cloud_name: "dtibuxiju",
            // Add any other parameters required by Cloudinary
          }),
        }
      );
      const data = await response.json();
      onChange((prev) => [...prev, data.secure_url]);
      setPhotosLink("");
    } catch (error) {
      console.error("Error uploading photo by link:", error);
    } finally {
      setLoading(false);
    }
  }

  function uploadPhoto(ev) {
    const files = ev.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("file", files[i]);
      data.append("upload_preset", "ritesh-booking-app");
      data.append("cloud_name", "dtibuxiju");
      // Add any other parameters required by Cloudinary
    }

    fetch("https://api.cloudinary.com/v1_1/dtibuxiju/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        onChange((prev) => {
          return [...prev, data.secure_url];
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function delPhoto(ev, filename) {
    ev.preventDefault();
    onChange([...addedPhotos.filter((photo) => photo !== filename)]);
    toast.success("Remove Image...");
  }

  function selectAsMainPhoto(ev, filename) {
    ev.preventDefault();
    onChange([filename, ...addedPhotos.filter((photo) => photo !== filename)]);
    toast.success("Set as Main Image...");
  }

  return (
    <>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Add using a link ....jpg"
          className="w-full mt-2 border rounded-2xl py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
          value={photosLink}
          onChange={(ev) => setPhotosLink(ev.target.value)}
        />
        <button
          onClick={addPhotoByLink}
          className="py-2 px-3 mt-2 rounded-2xl bg-blue-400 truncate"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Photo"}
        </button>
      </div>
      <div className="mt-2 gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {addedPhotos.length > 0 &&
          addedPhotos.map((link) => {
            if (link && typeof link === "string") {
              return (
                <div className="h-32 flex relative" key={link}>
                  <img
                    className="rounded-2xl w-full object-cover"
                    src={
                      link.includes("cloudinary")
                        ? link
                        : `${API}/uploads/` + link
                    }
                    alt="Image_Link"
                  />
                  <button
                    onClick={(ev) => delPhoto(ev, link)}
                    className="cursor-pointer absolute top-1 right-1 text-white bg-black bg-opacity-50 rounded-2xl py-2 px-2"
                  >
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
                  </button>
                  <button
                    onClick={(ev) => selectAsMainPhoto(ev, link)}
                    className="cursor-pointer absolute bottom-1 left-1 text-red-500 bg-black bg-opacity-50 rounded-2xl py-1 px-1"
                  >
                    {link === addedPhotos[0] && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                      >
                        <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                      </svg>
                    )}
                    {link !== addedPhotos[0] && (
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
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              );
            } else {
              return null;
            }
          })}

        <label className="h-32 flex items-center justify-center gap-1 border bg-transparent rounded-2xl p-2 text-2xl text-gray-600 cursor-pointer">
          <input
            type="file"
            multiple
            className="hidden"
            onChange={uploadPhoto}
            disabled={loading}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-8 h-8 md:w-10 md:h-10"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm.53 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v5.69a.75.75 0 0 0 1.5 0v-5.69l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z"
              clipRule="evenodd"
            />
          </svg>
          {loading ? "Uploading..." : "Upload"}
        </label>
      </div>
    </>
  );
};

export default PhotosUploaderCom;
