import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    const storedUserId = sessionStorage.getItem("userId");

    setToken(storedToken);
    setUserId(storedUserId);

    // Redirect logic based on token and userId
    if (storedToken) {
      if (storedUserId === "677239d412ce41521e890cab") {
        // Redirect to /admin if userId matches
        navigate("/admin");
      } else {
        // Redirect to /home if token exists but userId does not match
        navigate("/home");
      }
    }
  }, [navigate]);

  console.log(token, userId);

  return (
    <>
      <div className="homepage">
        {/* Background Section */}
        <div className="background">
          <header className="navbar">
            <div className="logo" style={{ fontSize: "30px" }}>
              VouxoSports
            </div>
            <nav className="nav-links">
              <Link to={"/"}><a href="#news">News</a></Link>
              <a href="#popular">Sports</a>
              <a href="#pricing">Pricing</a>
              <a href="#guide">About Us</a>
            </nav>
          </header>
          {/* Main Content */}
          <div className="content">
            <h1>Welcome to VouxoSports</h1>
            <h1>The ultimate destination for live sports!</h1>
            <p>
              Enjoy seamless, high-definition live streams of your favorite sports
              events without interruptions.
            </p>
            <div className="buttons">
              <Link to={"/register"}>
                <Button variant="outline-warning" className="btn-discover">
                  Discover Streams & Fixtures
                </Button>
              </Link>
              <Link to={"/login"}>
                <Button variant="outline-success" className="btn-features">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <footer style={{ backgroundColor: "transparent" }}>
          <p className="text-secondary">© VouxoSports 2024 All rights reserved. </p>
        </footer>
      </div>
    </>
  );
}

export default Home;
