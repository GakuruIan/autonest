import React from "react";

// icon
import { MessageSquareMore, Award, Calculator } from "lucide-react";

const Whyus = () => {
  return (
    <div className="min-h-screen flex items-center justify-center w-full container mx-auto px-2 md:px-0">
      <div className="flex flex-col space-y-8">
        <h3 className="text-4xl md:text-6xl text-center dark:text-white mb-4">
          Why chose us
        </h3>
        <p className="text-base text-center dark:text-neutral-300 text-gray-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. In, laborum!
        </p>

        <div className="grid md:grid-cols-3 grid-cols-1 gap-6 place-items-center mt-10">
          <div className="flex flex-col space-y-4 items-center p-4">
            <MessageSquareMore />

            <h4 className="text-base font-semibold mb-2">Free consultation</h4>
            <p className="text-sm text-center dark:text-neutral-300">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
              quam esse a iusto architecto cupiditate!
            </p>
          </div>

          <div className="flex flex-col space-y-4 items-center p-4">
            <Award />

            <h4 className="text-base font-semibold mb-2">Good service</h4>
            <p className="text-sm text-center dark:text-neutral-300">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
              quam esse a iusto architecto cupiditate!
            </p>
          </div>

          <div className="flex flex-col space-y-4 items-center p-4">
            <Calculator />

            <h4 className="text-base font-semibold mb-2">Careful Planning</h4>
            <p className="text-sm text-center dark:text-neutral-300">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
              quam esse a iusto architecto cupiditate!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Whyus;
