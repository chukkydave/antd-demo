import React from "react";
import Logo from "../assets/Ogabassey-103.png";
import flag from "../assets/us_flag.png";
import Image from "next/image";
import { FaClockRotateLeft } from "react-icons/fa6";
import { FaEnvelope } from "react-icons/fa";
import { UserOutlined, DownOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import { BiSolidBolt } from "react-icons/bi";
import Link from 'next/link';

const items = [
  {
    key: "1",
    label: (
      <Link href="/login">Login</Link>
    ),
  },
  {
    key: "2",
    label: (
      <Link href="/register">Register</Link>
    ),
  },
];

const Header = () => {
  return (
    <header className="relative w-[85%] rounded-full mx-auto bg-white mt-10">
      <div className="container mx-auto flex justify-between  items-center py-2 px-4 relative z-10">
        <Link href="/"> <Image src={Logo} alt="Logo" /></Link>
        <nav>
          <ul className="flex gap-20">
            <li>
              <Link href="/bulk" className="flex items-center gap-1"><BiSolidBolt /> Bulk</Link>
            </li>
            <li>
              <Link href="/history" className="flex items-center gap-1"><FaClockRotateLeft /> History</Link>
            </li>
            <li>
              <Link href="/contact" className="flex items-center gap-1"><FaEnvelope /> Contact Us</Link>
            </li>
          </ul>
        </nav>
        <div className="flex flex-row flex-nowrap justify-between items-center gap-4">
          <div className=" flex gap-2 ">
            <p>$0.00</p>
            <Image alt="flags" src={flag} />
          </div>
          <Dropdown menu={{ items }} placement="bottomRight">
            <div className="flex items-end gap-1">
              <UserOutlined style={{ fontSize: "20px" }} />
              <DownOutlined style={{ fontSize: "13px" }} />
            </div>
          </Dropdown>
        </div>
      </div>
    </header>
  );
};

export default Header;
