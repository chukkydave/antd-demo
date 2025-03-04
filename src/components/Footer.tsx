import React from "react";
import Logo from "@/assets/ogabassey.svg";
import AppStoreBadge from "@/assets/apple.png";
import GooglePlayBadge from "@/assets/google.png";
import CredPalLogo from "@/assets/credpal.svg";
import Image from "next/image";
import InstagramIcon from "@/assets/instagram.svg";
import TikTokIcon from "@/assets/tikTok.svg";
import TwitterIcon from "@/assets/x.svg";
import PaystackLogo from "@/assets/paystack.png";
import GigLogo from "@/assets/gig.png";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6 sm:py-8 md:py-10 mt-16 sm:mt-24 md:mt-32">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-[40%] max-w-sm mb-8 md:mb-0">
            <div className="flex flex-col max-w-[250px] sm:max-w-[300px]">
              <Image src={Logo} alt="Ogabassey Logo" className="w-32 sm:w-44 mb-4" />
              <p className="text-sm sm:text-base text-gray-500 mb-4">
                Discover Quality Finds at Ogabassey- Your Ultimate Destination for Premium Products
                and Exceptional Shopping Experience
              </p>
              <div className="flex items-center gap-2 sm:gap-3 my-4">
                <Image src={InstagramIcon} alt="Instagram" className="h-6 sm:h-7" />
                <Image src={TikTokIcon} alt="TikTok" className="h-6 sm:h-7" />
                <Image src={TwitterIcon} alt="Twitter" className="h-6 sm:h-7" />
              </div>
            </div>

            <div className="flex space-x-2 sm:space-x-4">
              <Image src={AppStoreBadge} alt="App Store" className="h-7 sm:h-8 w-auto" />
              <Image src={GooglePlayBadge} alt="Google Play" className="h-7 sm:h-8 w-auto" />
            </div>
          </div>
          <div className="w-full md:w-[60%] flex flex-col sm:flex-row justify-between mb-8 md:mb-0 mt-8 sm:mt-0">
            <div className="w-full sm:w-1/3 mb-6 sm:mb-0 pl-0 sm:pl-2">
              <h5 className="font-bold mb-4 text-sm sm:text-base">About Ogabassey</h5>
              <ul className="space-y-1 sm:space-y-2">
                <li>
                  <a href="#" className="text-xs font-extralight opacity-80 sm:text-sm">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-xs font-extralight opacity-80 sm:text-sm">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-xs font-extralight opacity-80 sm:text-sm">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-xs font-extralight opacity-80 sm:text-sm">
                    Terms and Conditions
                  </a>
                </li>
                <li>
                  <a href="#" className="text-xs font-extralight opacity-80 sm:text-sm">
                    Return Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-xs font-extralight opacity-80 sm:text-sm">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="#" className="text-xs font-extralight opacity-80 sm:text-sm">
                    Legal and Dispute
                  </a>
                </li>
              </ul>
            </div>
            <div className="w-full sm:w-1/3 mb-6 sm:mb-0 pl-0 sm:pl-2">
              <h5 className="font-bold mb-4 text-sm sm:text-base">Services</h5>
              <ul className="space-y-1 sm:space-y-2">
                <li>
                  <a href="#" className="text-xs font-extralight opacity-80 sm:text-sm">
                    OgaBassey Shop
                  </a>
                </li>
                <li>
                  <a href="#" className="text-xs font-extralight opacity-80 sm:text-sm">
                    OgaBassey Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-xs font-extralight opacity-80 sm:text-sm">
                    OgaBassey IMEI Checker
                  </a>
                </li>
                <li>
                  <a href="#" className="text-xs font-extralight opacity-80 sm:text-sm">
                    OgaBassey Bulk
                  </a>
                </li>
              </ul>
            </div>
            <div className="w-full sm:w-1/3 pl-0 sm:pl-2">
              <h5 className="font-bold mb-4 text-sm sm:text-base">Payment methods and delivery partners</h5>
              <Image src={CredPalLogo} alt="CredPal" className="h-10" />
              <Image src={PaystackLogo} alt="Paystack" className="mt-2 w-32" />
              <Image src={GigLogo} alt="Gig" className="mt-2 w-12" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
