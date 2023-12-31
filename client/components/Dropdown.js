// components/Dropdown.js
import Link from "next/link";
import { useState } from "react";
import { LanguageSwitcher } from "./lang/LangSwitcher";

const Dropdown = ({ buttonText, options, position = "right" }) => {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownPosition = position === "left" ? "left-0" : "right-0";

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className="flex items-center px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        onClick={() => setIsOpen(!isOpen)}
      >
        {buttonText}
        <svg
          className="h-4 w-4 ml-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className={`absolute mt-0 w-56 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg focus:outline-none ${dropdownPosition}`}
          role="menu"
          aria-orientation="vertical"
        >
          <div className="py-0">
            <LanguageSwitcher />
            {/* {options.map((option, index) => (
              <Link
                key={index}
                href={option.url}
                className="text-gray-700 block px-4 py-2 text-sm hover:bg-[#1c6b8c] hover:text-white"
                role="menuitem"
              >
                {option.label}
              </Link>
            ))} */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
