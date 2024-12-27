import React from 'react';
import { useTheme } from '../ThemeContext.jsx'; // Use the custom hook

const ThemeSwitch = () => {
  const { isDarkMode, themetoggle } = useTheme(); // Access theme context

  return (
    <div className="flex items-center space-x-2">
      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={isDarkMode}
          onChange={themetoggle} // Toggle theme on change
          className="hidden" // Hide default checkbox
        />
        <span
          className={`w-14 h-8 rounded-full p-1 flex items-center transition-all duration-300 ease-in-out ${
            isDarkMode ? 'bg-blue-600 justify-end' : 'bg-gray-300 justify-start'
          }`}
        >
          <span
            className={`w-6 h-6 bg-white rounded-full transition-all duration-300 ease-in-out`}
          />
        </span>
      </label>
      <p className="text-sm lg:text-xl text-slate-400">{isDarkMode ? 'Dark Mode' : 'Light Mode'}</p>
    </div>
  );
};

export default ThemeSwitch;
