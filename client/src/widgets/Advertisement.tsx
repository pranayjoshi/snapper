import React from "react";

const Data = [
  {
    id: 1,
    title: "Mountain",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bW91bnRhaW5zfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    tags: ["photography", "travel"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. .",
  },
];

export const Advertisement = () => {
  return (
    <div className="">
      {Data.map((item) => (
        <div
          key={item.id}
          className="rounded-lg overflow-hidden shadow-lg dark:shadow-gray-800 border"
        >
            <div className="px-6 pt-4 flow-root">
            <div className="text-gray-700 float-left text-base dark:text-gray-200">Sponsered</div>
            <p className="text-gray-500 float-right text-xs pt-1">
              Create add
            </p>
          </div>
          <div className="m-4"><img className="rounded-xl" src={item.image} alt="Mountain" /></div>
          
          <div className="px-6">
            <div className="text-gray-700 font-bold text-base mb-2 dark:text-gray-200">{item.title}</div>
            <p className="text-gray-500 dark:text-gray-400 text-xs">
              {item.description.substring(0, 100)}
            </p>
          </div>
          <div className="px-6 pt-2 pb-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block bg-gray-200 dark:bg-gray-800 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 dark:text-gray-200 mr-2 mb-2"
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