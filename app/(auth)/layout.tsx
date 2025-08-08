import React from "react";

import Image from "next/image";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-72px)]  flex-col space-y-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2">
          <a href="#" className="flex flex-col items-center gap-2 font-medium">
            <div className="flex relative size-8 items-center justify-center rounded-md">
              <Image src="/logo.svg" fill alt="logo" />
            </div>
            <span className="sr-only">AutoNest</span>
          </a>
          <h1 className="text-xl font-medium font-poppins-semibold  tracking-tight">
            Welcome to AutoNest.
          </h1>
          <div className="text-center text-sm tracking-wide dark:text-neutral-300">
            A smarter way to buy and sell cars — reliable listings, real deals.
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default layout;
