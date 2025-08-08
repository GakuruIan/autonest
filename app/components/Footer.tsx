import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <div className="py-10 container mx-auto border-t dark:border-neutral-700">
      <footer className="">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Image src="/logo.svg" alt="Brand Logo" width={24} height={24} />
            <p className="text-sm mt-2">
              Your trusted marketplace for buying or selling cars across Kenya.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-white mb-2">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>About Us</li>
                <li>Careers</li>
                <li>Press & Media</li>
                <li>Testimonials</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Explore</h3>
              <ul className="space-y-2 text-sm">
                <li>Browse Cars</li>
                <li>Sell Your Car</li>
                <li>Financing Options</li>
                <li>Blog</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <h3 className="font-semibold text-white mb-2">Contact & Socials</h3>
            <p className="text-sm">support@yourbrand.ke</p>
            <p className="text-sm">+254 700 123 456</p>
            <p className="text-sm">Westlands, Nairobi</p>
            <div className="flex space-x-3 mt-3">
              {/* add social icons here */}
            </div>
          </div>
        </div>

        <div className="border-t dark:border-t-neutral-700 mt-8 pt-6 text-center text-sm">
          <p>© 2025 Your Brand. All rights reserved.</p>
          <p>Registered in Kenya • Terms & Privacy apply.</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
