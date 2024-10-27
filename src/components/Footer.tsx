import React from "react";
import Logo from "@/assets/ogabassey.svg";
import AppStoreBadge from "@/assets/apple.svg";
import GooglePlayBadge from "@/assets/play-store.svg";
import CredPalLogo from "@/assets/credpal.svg";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 mt-32">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4  max-w-sm mb-8 md:mb-0">
            <Image src={Logo} alt="Ogabassey Logo" className="h-7 mb-4" />
            <p className="text-sm text-gray-500 mb-4">
              Discover Quality Finds at Ogabassey- Your Ultimate Destination for Premium Products
              and Exceptional Shopping Experience
            </p>
            <div className="flex space-x-4 mb-4">
              <a href="#" aria-label="Instagram" className="text-xl">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" aria-label="TikTok" className="text-xl">
                <i className="fab fa-tiktok"></i>
              </a>
              <a href="#" aria-label="Twitter" className="text-xl">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
            <div className="flex space-x-4">
              <Image src={AppStoreBadge} alt="App Store" className="h-10" />
              <Image src={GooglePlayBadge} alt="Google Play" className="h-10" />
            </div>
          </div>
          <div className="w-full md:w-1/4 mb-8 max-w-sm md:mb-0">
            <h5 className="font-bold mb-4">Legal</h5>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm">
                  Dispute Resolution
                </a>
              </li>
              <li>
                <a href="#" className="text-sm">
                  Return Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm">
                  Terms and Conditions
                </a>
              </li>
              <li>
                <a href="#" className="text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm">
                  Corporate and Bulk Purchase
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-8 max-w-sm md:mb-0">
            <h5 className="font-bold mb-4">About Ogabassey</h5>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-sm">
                  Sell or Swap Device
                </a>
              </li>
              <li>
                <a href="#" className="text-sm">
                  FAQs
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-8  max-w-sm md:mb-0">
            <h5 className="font-bold mt-8 mb-4">Payment methods and delivery partners</h5>
            <Image src={CredPalLogo} alt="CredPal" className="h-10" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
