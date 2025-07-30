import React from "react";
import ZenIcon from 'components/ui/ZenIcon';

const Header = () => {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="container mx-auto px-4 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo with Zen Icon */}
        <div className="flex items-center space-x-2 text-2xl font-bold text-gray-900">
          <ZenIcon />
          <span>
            Rafiki
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">.</span>
          </span>
        </div>

        {/* Navigation */}
        <nav className="hidden sm:flex space-x-6 text-sm font-medium text-gray-700">
          <button onClick={() => scrollTo("hero")} className="hover:text-blue-600 transition">
            Home
          </button>
          <button onClick={() => scrollTo("features")} className="hover:text-blue-600 transition">
            Features
          </button>
          <button
            onClick={() => scrollTo("beta-signup")}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md shadow hover:from-blue-700 hover:to-purple-700 transition"
          >
            Get Access
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
