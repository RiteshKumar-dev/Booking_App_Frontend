import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const TestimonialSliderCom = () => {
  const data = [
    {
      name: "Audrey",
      image:
        "https://a0.muscache.com/im/pictures/user/e8b66f6b-8cd8-4123-a7bc-2ea9f333ad39.jpg?im_w=240",
      description:
        "A slice of heaven! Very comfortable bedding, amazing pool, exceptional views... and the kindness of the hosts (their wine is delicious!). We hope to be back at the estate someday...",
    },
    {
      name: "Jenny",
      image:
        "https://a0.muscache.com/im/pictures/user/3e9f9dd4-3995-41d4-89bb-4c5fa6745e26.jpg?im_w=240",
      description:
        "We had a peaceful and relaxing 5 nights at Christina's place. Christina was helpful and friendly whenever we needed advice. The grounds and surrounding countryside are...",
    },
    {
      name: "Pia",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTomxRMar_mp4Oi75H4kDUsx7Zl0bvDsRspkCQzrNgJvg&s",
      description:
        "Super cozy cottage, beautifully situated in the stunning Umbrian montains. The hosts Chrissie and David were very friendly, accommodating and helpful. We loved our very...",
    },
    {
      name: "Kimberly",
      image:
        "https://a0.muscache.com/im/pictures/user/e5ce0439-551e-4366-890c-6549afc0a113.jpg?im_w=240",
      description:
        "Everything was absolutely wonderful- it was a perfect place to rest your mind and recharge for a few days. The place was beautiful and Chrissy and David were kind and caring hosts...",
    },
    {
      name: "Charlene",
      image:
        "https://a0.muscache.com/im/users/42559697/profile_pic/1441957522/original.jpg?im_w=240",
      description:
        "Our stay was incredibly relaxing.The converted farmhouse house is located in a beautiful valley, with breathtaking views...",
    },
    {
      name: "Abbie",
      image:
        "https://a0.muscache.com/im/users/11751310/profile_pic/1391000312/original.jpg?im_w=240",
      description:
        "My mother and I had a fantastic time!David and Chrissy were top notch hosts that were so beyond helpful. Highly recommend organizing activities through them...",
    },
    {
      name: "Jenny",
      image:
        "https://a0.muscache.com/im/users/28455980/profile_pic/1426115979/original.jpg?im_w=240",
      description:
        "A slice of heaven! Very comfortable bedding, amazing pool, exceptional views... and the kindness of the hosts (their wine is delicious!). We hope to be back at the estate someday...",
    },
    {
      name: "Lucille",
      image:
        "https://a0.muscache.com/im/pictures/user/590ab988-5a90-48c4-a0fd-e039329b15fa.jpg?im_w=240",
      description:
        "We had a peaceful and relaxing 5 nights at Christina's place. Christina was helpful and friendly whenever we needed advice. The grounds and surrounding countryside are beautiful. We arrived to find thoughtful provisions in the kitchen -...",
    },
    {
      name: "Ole Paludan",
      image:
        "https://a0.muscache.com/im/pictures/user/61a98116-4b20-41bd-937d-0eef83ca06a9.jpg?im_w=240",
      description:
        "Lovely place with a great view of the valley. We received a warm welcome from David and the dogs.David is a very welcoming and considerate host.The cabin La Stalla is perfect for two people with lovely terraces. We enjoyed swimming in the pool overlooking the valley.The place is well located for hiking nearby and for day trips to major cities...",
    },
    {
      name: "Leanne",
      image:
        "https://a0.muscache.com/im/pictures/user/3d92d074-3fdc-44b1-86db-0200199dd344.jpg?im_w=240",
      description:
        "What an amazing place to rest during your holiday! My husband and I did a 3 week tour of Italy and this place was the best. This is the best airbnb I have ever stayed at. So beautiful in the country - Umbria is so amazing. Don't hesitate, just book this airbnb you'll be so glad you did. Chrissie and David were great. They provide...",
    },
  ];

  return (
    <>
      <div className="mt-5">
        <Carousel
          autoPlay
          infiniteLoop
          interval={2500}
          showThumbs={false}
          showStatus={false}
          showArrows={false}
          stopOnHover={false}
          emulateTouch
          // className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4"
        >
          {data.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col items-center"
              // className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4"
            >
              <div className="relative">
                <img
                  className="w-24 h-24 object-cover object-center rounded-full"
                  src={item.image}
                  alt={item.name}
                />
                <div className="absolute bottom-0 left-0 bg-white p-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 text-gray-800"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 underline">
                  {item.name}...
                </h3>
                <p className="text-gray-600 mb-2">{item.description}</p>
                <div className="flex justify-center mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-6 w-6 ${
                        star <= 3 ? "text-red-500" : "text-gray-400"
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 21l-1.108-.636C5.83 17.556 3 13.818 3 10.5 3 7.957 4.882 6 7.5 6c1.148 0 2.195.406 3 1.08C11.305 6.406 12.352 6 13.5 6c2.618 0 4.5 1.957 4.5 4.5 0 3.318-2.83 7.056-7.892 9.864L12 21z"
                      />
                    </svg>
                  ))}
                </div>
                <button className="bg-indigo-500 text-white text-lg px-6 py-1 rounded-xl">
                  Read More...
                </button>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default TestimonialSliderCom;
