import React from "react";
import { FaBell, FaDoorOpen, FaMoneyBill, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const DropdownProfile = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const handleLogout = () => {
    // Show confirmation alert
    const confirmLogout = window.confirm(
      "Are you sure you want to log out? This will clear all your data."
    );

    if (confirmLogout) {
      // Clear session data
      sessionStorage.clear();

      // Redirect to the home page
      navigate("/");
    }
  };

  return (
    <div className="drop flex flex-col" style={{ width: "140px" }}>
      <ul className="flex flex-col gap-5 p-2 pb-0 ps-2" style={{ cursor: "pointer" }}>
        <Link to={"/myprofile"} className="logolink">
          <li>
            <FaUser className="me-2" />
            My Profile
          </li>
        </Link>
        <Link to={"/notifications"} className="logolink">
          <li>
            <FaBell className="me-2" />
            Notifications
          </li>
        </Link>
        <Link to={"/plans"} className="logolink">
          <li>
            <FaMoneyBill className="me-2" />
            Subscription
          </li>
        </Link>
        {/* Logout button with logout handler */}
        <li onClick={handleLogout}>
          <FaDoorOpen className="me-2" />
          Logout
        </li>
      </ul>
    </div>
  );
};

export default DropdownProfile;
