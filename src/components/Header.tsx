'use client';

import React, { useState, useEffect, useRef } from "react";
import Logo from "../assets/Ogabassey-103.png";
import flag from "../assets/us_flag.png";
import Image from "next/image";
import { FaClockRotateLeft } from "react-icons/fa6";
import { FaEnvelope } from "react-icons/fa";
import { UserOutlined, DownOutlined, LogoutOutlined, LoginOutlined, UserAddOutlined } from "@ant-design/icons";
import { BiSolidBolt } from "react-icons/bi";
import Link from 'next/link';
import { useSession, signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';
import AlertMessage from './AlertMessage';
import ContactPopover from './ContactPopover';
import CurrencySelector from './CurrencySelector';
import { Popover } from 'antd';
import ContactForm from './ContactForm';
import { IoLogInOutline } from "react-icons/io5";

const Header = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  const handleProtectedRoute = (route: string) => {
    if (!session) {
      setShowAlert(true);
      return;
    }
    router.push(route);
  };

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/login');
    router.refresh();
    setShowDropdown(false);
  };

  const handleContactSubmit = () => {
    setContactOpen(false);
  };

  if (!mounted) return null;

  return (
    <>
      <header className="relative w-[85%] rounded-full mx-auto bg-white mt-10">
        <div className="container mx-auto flex justify-between items-center py-2 px-4 relative z-10">
          <Link href="/"> <Image src={Logo} alt="Logo" /></Link>
          <nav>
            <ul className="flex gap-20">
              <li>
                <button
                  onClick={() => handleProtectedRoute('/bulk')}
                  className="flex items-center gap-1 hover:text-[#D62027]"
                >
                  <BiSolidBolt /> Bulk
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleProtectedRoute('/history')}
                  className="flex items-center gap-1 hover:text-[#D62027]"
                >
                  <FaClockRotateLeft /> History
                </button>
              </li>
              <li>
                <Popover
                  content={<ContactForm onSubmit={handleContactSubmit} />}
                  trigger="hover"
                  open={contactOpen}
                  onOpenChange={setContactOpen}
                  placement="bottom"
                  overlayClassName="contact-popover"
                >
                  <button className="flex items-center gap-1 hover:text-[#D62027]">
                    <FaEnvelope /> Contact Us
                  </button>
                </Popover>
              </li>
            </ul>
          </nav>
          <div className="flex flex-row flex-nowrap justify-between items-center gap-4">
            <CurrencySelector />
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-end gap-1 cursor-pointer"
              >
                <UserOutlined style={{ fontSize: "20px" }} />
                <DownOutlined style={{ fontSize: "13px" }} />
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-20">
                  {session ? (
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <IoLogInOutline className="!text-[#D62027] w-5 h-5" />
                      <span>Logout</span>
                    </button>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowDropdown(false)}
                      >
                        <LoginOutlined className="!text-[#D62027]" />
                        <span>Login</span>
                      </Link>
                      <Link
                        href="/register"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowDropdown(false)}
                      >
                        <UserAddOutlined className="!text-[#D62027]" />
                        <span>Register</span>
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {showAlert && (
        <AlertMessage
          message="Please log in to access this feature."
          onClose={() => setShowAlert(false)}
          onLogin={() => {
            setShowAlert(false);
            router.push('/login');
          }}
        />
      )}
    </>
  );
};

export default Header;
