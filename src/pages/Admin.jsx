import React, { useEffect, useState } from "react";
import "../styles/dashboard.css";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { CiLogout } from "react-icons/ci";
import UserManagement from "../components/UserManagement";
import LiveManagement from "../components/LiveManagement";
import ScheduleMatches from "../components/ScheduleMatches";
import ManageSubscription from "../components/ManageSubscription";
import UserReports from "../components/UserReports";
import AdminNotify from "../components/AdminNotify";

function Admin() {
  const [activeTab, setActiveTab] = useState("liveMatches");
  const navigate = useNavigate(); // Initialize navigate function

  // Check if current user is admin
  useEffect(() => {
    const currentUserId = sessionStorage.getItem("userId"); // Assuming user ID is stored in sessionStorage
    if (currentUserId !== "677239d412ce41521e890cab") {
      navigate("/error"); // Redirect to home if not admin
    }
  }, [navigate]);

  // Handle tab changes
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  /* Carousel */
  const [currentIndex, setCurrentIndex] = useState(0);

  // Carousel images
  const images = [
    "https://www.fcbarcelona.com/photo-resources/2023/01/12/fa80bebe-5b33-4abf-b519-d8486a154771/mini_escuts-final.jpg?width=624&height=368",
    "https://e00-marca.uecdn.es/assets/multimedia/imagenes/2024/08/03/17227202414043.jpg",
    "https://images.supersport.com/media/lfvofv02/1200x675-man-city-vs-liverpool-montage.jpg",
  ];

  // Change slide automatically
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  /* logout */

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
    <div className="dashboard">
      {/* Header Section */}
      <header className="dashboard-header" style={{ backgroundColor: "black" }}>
        <Link to={"/home"} className="logolink">
          <div className="logo">VouxoSports</div>
        </Link>
        <nav className="nav-options" style={{ marginLeft: "50px" }}>
          <button
            className={activeTab === "liveMatches" ? "active" : ""}
            onClick={() => handleTabChange("liveMatches")}
          >
            User Management
          </button>
          <button
            className={activeTab === "upcomingMatches" ? "active" : ""}
            onClick={() => handleTabChange("upcomingMatches")}
          >
            Live Management
          </button>
          <button
            className={activeTab === "leagueTable" ? "active" : ""}
            onClick={() => handleTabChange("leagueTable")}
          >
            Schedule Matches
          </button>
          <button
            className={activeTab === "favorites" ? "active" : ""}
            onClick={() => handleTabChange("favorites")}
          >
            Manage Subscription
          </button>
          <button
            className={activeTab === "UserReports" ? "active" : ""}
            onClick={() => handleTabChange("UserReports")}
          >
            User Reports
          </button>
          <button
            className={activeTab === "Notifications" ? "active" : ""}
            onClick={() => handleTabChange("Notifications")}
          >
            Notifications
          </button>
        </nav>
        <div className="out">
          <Link to={"/"}>
            <button onClick={handleLogout}>
              <CiLogout /> Logout
            </button>
          </Link>
        </div>
      </header>
      {/* Content Section */}
      <main className="dashboard-content">
        {activeTab === "liveMatches" && (
          <div className="content-section">
            <UserManagement />
          </div>
        )}

        {activeTab === "upcomingMatches" && (
          <div className="content-section">
            <LiveManagement />
          </div>
        )}

        {activeTab === "leagueTable" && (
          <div className="content-section">
            <ScheduleMatches />
          </div>
        )}

        {activeTab === "favorites" && (
          <div className="content-section">
            <ManageSubscription />
          </div>
        )}

        {activeTab === "UserReports" && (
          <div className="content-section">
            <UserReports />
          </div>
        )}

        {activeTab === "Notifications" && (
          <div className="content-section">
            <AdminNotify />
          </div>
        )}
      </main>
    </div>
  );
}

export default Admin;
