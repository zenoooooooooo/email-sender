"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiLogOut, FiMenu, FiX } from "react-icons/fi";

interface NavProps {
  name: string;
}

const Nav: React.FC<NavProps> = ({ name }) => {
  const router = useRouter();
  function handleLogout() {
    localStorage.removeItem("token");
    router.push("/login");
  }

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <ul className="hidden md:flex items-center space-x-4">
          <li className="group desktop:text-[20px] tablet:text-[16px] p-2">
            <Link href="/">Dashboard</Link>
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-white"></span>
          </li>
          <li className="group desktop:text-[20px] tablet:text-[16px] p-2">
            <Link href="/">History</Link>
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-white"></span>
          </li>
        </ul>

        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-white">
            <FiMenu size={24} />
          </button>
        </div>

        {isMenuOpen && (
          <ul className="md:hidden flex flex-col items-center justify-center absolute top-16 left-0 w-full bg-gray-800 text-white space-y-4 p-4">
            <li>
              <Link href="/">Dashboard</Link>
            </li>
            <li>
              <Link href="/">History</Link>
            </li>
          </ul>
        )}

        <div className="flex items-center space-x-4">
          <span>{name}</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 cursor-pointer hover:bg-red-700 text-white p-2 rounded flex items-center space-x-2"
          >
            <FiLogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
