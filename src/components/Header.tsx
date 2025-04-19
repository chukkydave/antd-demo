'use client';

import React, { useState, useEffect, useRef } from "react";
import Logo from "../assets/Ogabassey-103.png";
import LogoWhite from "../assets/Ogabassey-dark.png";
import Image from "next/image";
import { FaEnvelope } from "react-icons/fa";
import { RiDashboardFill } from "react-icons/ri";
import { UserOutlined, DownOutlined, LoginOutlined, UserAddOutlined } from "@ant-design/icons";
import { BiSolidBolt } from "react-icons/bi";
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import AlertMessage from './AlertMessage';
import CurrencySelector from './CurrencySelector';
import { Popover } from 'antd';
import ContactForm from './ContactForm';
import { IoLogInOutline } from "react-icons/io5";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
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
    if (!isAuthenticated) {
      setShowAlert(true);
      return;
    }
    router.push(route);
  };

  const handleLogout = async () => {
    await logout();
    router.push('/login');
    router.refresh();
    setShowDropdown(false);
  };

  const handleContactSubmit = () => {
    setContactOpen(false);
  };

  const isActivePath = (path: string) => {
    return pathname === path;
  };

  if (!mounted) return null;

  return (
    <>
      <header className={`fixed top-0 w-full ${isOpen ? 'bg-black' : 'bg-[#Fafafa]'} z-50 transition-colors duration-300`}>
        <div className="w-full lg:w-[80%] mx-auto mt-4 px-4 sm:px-6 lg:px-8">
          <div className={`
            w-full 
            mx-auto 
            ${isOpen ? 'bg-black' : 'bg-[#Fafafa] md:bg-white'} 
            md:rounded-full 
            md:mt-8
            transition-colors 
            duration-300
          `}>
            <div className="flex justify-between items-center h-16 px-4 md:px-8">
              <Link href="/" className="flex-shrink-0">
                <Image
                  src={isOpen ? LogoWhite : Logo}
                  alt="Logo"
                  className="transition-opacity w-auto h-9 md:h-7 duration-300"
                />
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex space-x-8 lg:space-x-20">
                <button
                  onClick={() => handleProtectedRoute('/bulk')}
                  className={`flex items-center gap-1 hover:text-[#D62027] ${isActivePath('/bulk') ? 'text-[#D62027]' : 'text-gray-700'
                    }`}
                >
                  <BiSolidBolt /> Bulk
                </button>
                <button
                  onClick={() => handleProtectedRoute('/dashboard')}
                  className={`flex items-center gap-1 hover:text-[#D62027] ${isActivePath('/dashboard') ? 'text-[#D62027]' : 'text-gray-700'
                    }`}
                >
                  <RiDashboardFill /> Dashboard
                </button>
                <Popover
                  content={<ContactForm onSubmit={handleContactSubmit} />}
                  trigger="hover"
                  open={contactOpen}
                  onOpenChange={setContactOpen}
                  placement="bottom"
                  overlayClassName="contact-popover"
                >
                  <button className="flex items-center gap-1 hover:text-[#D62027] text-gray-700">
                    <FaEnvelope /> Contact
                  </button>
                </Popover>
              </nav>

              {/* Desktop Currency and User */}
              <div className="hidden md:flex flex-row flex-nowrap justify-between items-center gap-4">
                <CurrencySelector className="text-black" />
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center gap-1 cursor-pointer text-gray-700"
                  >
                    {isAuthenticated ? (
                      <>
                        <span>{user?.firstName}</span>
                        <DownOutlined style={{ fontSize: "13px" }} />
                      </>
                    ) : (
                      <>
                        <UserOutlined style={{ fontSize: "20px" }} />
                        <DownOutlined style={{ fontSize: "13px" }} />
                      </>
                    )}
                  </button>

                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-20">
                      {isAuthenticated ? (
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
                            <LoginOutlined className="!text-[#D62027] " />
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

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className={`p-2 rounded-md transition-all duration-300 ${isOpen ? 'text-white hover:bg-gray-800' : 'text-black hover:bg-gray-100'
                    }`}
                >
                  {isOpen ? (
                    <CloseOutlined className="text-xl" />
                  ) : (
                    <MenuOutlined className="text-xl" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden fixed inset-0 top-16 bg-black z-50 overflow-y-auto">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <div className="flex flex-col items-center space-y-6 py-8">
                <button
                  onClick={() => {
                    handleProtectedRoute('/bulk');
                    setIsOpen(false);
                  }}
                  className={`flex items-center gap-2 text-white hover:text-[#D62027] px-3 py-2 text-lg ${isActivePath('/bulk') ? 'text-[#D62027]' : ''
                    }`}
                >
                  <BiSolidBolt /> Bulk
                </button>
                <button
                  onClick={() => {
                    handleProtectedRoute('/dashboard');
                    setIsOpen(false);
                  }}
                  className={`flex items-center gap-2 text-white hover:text-[#D62027] px-3 py-2 text-lg ${isActivePath('/dashboard') ? 'text-[#D62027]' : ''
                    }`}
                >
                  <RiDashboardFill /> Dashboard
                </button>
                <button
                  onClick={() => {
                    setContactOpen(true);
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-2 text-white hover:text-[#D62027] px-3 py-2 text-lg"
                >
                  <FaEnvelope /> Contact Us
                </button>
                <div className="px-3 py-2">
                  <CurrencySelector className="text-white" />
                </div>

                {/* User Menu for Mobile */}
                <div className="w-full flex flex-col items-center border-t border-gray-700 pt-6 mt-6">
                  {isAuthenticated ? (
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-2 text-lg text-white hover:text-[#D62027]"
                    >
                      <IoLogInOutline className="text-[#D62027] w-5 h-5" />
                      <span>Logout</span>
                    </button>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className="flex items-center gap-2 px-4 py-2 text-lg text-white hover:text-[#D62027]"
                        onClick={() => setIsOpen(false)}
                      >
                        <LoginOutlined className="text-[#D62027]" />
                        <span>Login</span>
                      </Link>
                      <Link
                        href="/register"
                        className="flex items-center gap-2 px-4 py-2 text-lg text-white hover:text-[#D62027]"
                        onClick={() => setIsOpen(false)}
                      >
                        <UserAddOutlined className="text-[#D62027]" />
                        <span>Register</span>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
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
