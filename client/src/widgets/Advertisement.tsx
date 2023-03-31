import React from "react";

const Data = [
  {
    id: 1,
    title: "Mountain",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bW91bnRhaW5zfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    tags: ["photography", "travel", "winter"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, Nonea! Maiores et perferendis eaque, exercitationem praesentium nihil.",
  },
];

export const Advertisement = () => {
  return (
    <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
      {Data.map((item) => (
        <div
          key={item.id}
          className="rounded-lg overflow-hidden shadow-lg dark:shadow-gray-800 border"
        >
            <div className="px-6 py-4 flex justify-items-end">
            <div className="text-gray-700 text-xl mb-2 dark:text-gray-200">Sponsered</div>
            <p className="text-gray-500  text-base">
              Create add
            </p>
          </div>
          <img className="w-full rounded-2xl" src={item.image} alt="Mountain" />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2 dark:text-gray-200">{item.title}</div>
            <p className="text-gray-700 dark:text-gray-300 text-base">
              {item.description.substring(0, 100)}
            </p>
          </div>
          <div className="px-6 pt-4 pb-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block bg-gray-200 dark:bg-gray-800 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:text-gray-200 mr-2 mb-2"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};