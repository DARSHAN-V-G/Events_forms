// Header.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSubDropdownOpen, setIsSubDropdownOpen] = useState(false);

  const toggleNav = () => setIsNavOpen(!isNavOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleSubDropdown = () => setIsSubDropdownOpen(!isSubDropdownOpen);

  return (
    <header className="sticky top-4 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full before:absolute before:inset-0 before:max-w-[66rem] before:mx-2 before:lg:mx-auto before:rounded-[26px] before:bg-neutral-800/30 before:backdrop-blur-md">
      <nav className="relative max-w-[66rem] w-full py-2.5 ps-5 pe-2 md:flex md:items-center md:justify-between md:py-0 mx-2 lg:mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex-none rounded-md text-xl inline-block font-semibold focus:outline-none focus:opacity-80" aria-label="Preline">
            <svg className="w-28 h-auto" width="116" height="32" viewBox="0 0 116 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* SVG content */}
            </svg>
          </Link>
          {/* End Logo */}

          <div className="md:hidden">
            <button
              type="button"
              onClick={toggleNav}
              className="size-8 flex justify-center items-center text-sm font-semibold rounded-full bg-neutral-800 text-white"
              aria-expanded={isNavOpen}
              aria-controls="hs-navbar-floating-dark"
              aria-label="Toggle navigation"
            >
              {isNavOpen ? (
                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18" /><path d="M6 6l12 12" /></svg>
              ) : (
                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
              )}
            </button>
          </div>
        </div>

        {/* Collapse */}
        <div id="hs-navbar-floating-dark" className={`${isNavOpen ? 'block' : 'hidden'} md:block overflow-hidden transition-all duration-300 basis-full grow`}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-end py-2 md:py-0 md:ps-7">
            <Link to="/" className="p-3 ps-px sm:px-3 md:py-4 text-sm text-white hover:text-neutral-300">Home</Link>
            <Link to="/stories" className="p-3 ps-px sm:px-3 md:py-4 text-sm text-white hover:text-neutral-300">Stories</Link>
            <Link to="/reviews" className="p-3 ps-px sm:px-3 md:py-4 text-sm text-white hover:text-neutral-300">Reviews</Link>
            <Link to="/approach" className="p-3 ps-px sm:px-3 md:py-4 text-sm text-white hover:text-neutral-300">Approach</Link>

            {/* Dropdown */}
            <div className="relative p-3 ps-px sm:px-3 md:py-4">
              <button
                onClick={toggleDropdown}
                className="flex items-center w-full text-sm text-white hover:text-neutral-300"
                aria-haspopup="menu"
                aria-expanded={isDropdownOpen}
              >
                About
                <svg className={`ml-1 transform transition-transform duration-300 ${isDropdownOpen ? '-rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
              </button>
              {isDropdownOpen && (
                <div className="absolute z-10 bg-neutral-800 shadow-md rounded-lg w-full md:w-48 mt-2">
                  <Link to="/about" className="block py-2 px-3 text-sm text-white hover:text-neutral-300">About</Link>

                  {/* Sub Dropdown */}
                  <div className="relative">
                    <button
                      onClick={toggleSubDropdown}
                      className="flex items-center w-full py-2 px-3 text-sm text-white hover:text-neutral-300"
                      aria-haspopup="menu"
                      aria-expanded={isSubDropdownOpen}
                    >
                      Sub Menu
                      <svg className={`ml-1 transform transition-transform duration-300 ${isSubDropdownOpen ? '-rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                    </button>
                    {isSubDropdownOpen && (
                      <div className="absolute z-10 bg-neutral-800 shadow-md rounded-lg w-full md:w-48 mt-2">
                        <Link to="/about" className="block py-2 px-3 text-sm text-white hover:text-neutral-300">About</Link>
                        <Link to="/downloads" className="block py-2 px-3 text-sm text-white hover:text-neutral-300">Downloads</Link>
                        <Link to="/team" className="block py-2 px-3 text-sm text-white hover:text-neutral-300">Team Account</Link>
                      </div>
                    )}
                  </div>

                  <Link to="/downloads" className="block py-2 px-3 text-sm text-white hover:text-neutral-300">Downloads</Link>
                  <Link to="/team" className="block py-2 px-3 text-sm text-white hover:text-neutral-300">Team Account</Link>
                </div>
              )}
            </div>
            {/* End Dropdown */}

            <Link to="/contact" className="group inline-flex items-center gap-x-2 py-2 px-3 bg-yellow-500 font-medium text-sm text-neutral-800 rounded-full">Contact us</Link>
          </div>
        </div>
        {/* End Collapse */}
      </nav>
    </header>
  );
};

export default Header;
