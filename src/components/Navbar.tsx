import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeUserInfo } from "../redux/userSlice/userSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

interface NavbarProps {
  onLoginClick?: () => void;
  onSignupClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLoginClick, onSignupClick }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: any) => state.userInfo);

  const handleLogout = () => {
    dispatch(removeUserInfo());
    toast.success('Logged out successfully!')
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-gray-900 dark:text-white">
              Blogon
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {userInfo ? (
              <>
                <span className="text-gray-900 dark:text-white">{userInfo.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={onLoginClick}
                  className="text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
                >
                  Login
                </button>
                <button
                  onClick={onSignupClick}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-300"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
