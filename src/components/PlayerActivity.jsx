import React, { useEffect, useRef, useState } from "react";
import "../styles/player.css";
import Header from "./Header";
import Footer from "./Footer";
import { Button } from "react-bootstrap";
import { FaFlag } from "react-icons/fa";
import Hls from "hls.js"; // Import Hls.js
import { useLocation } from "react-router-dom";

const PlayerActivity = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const videoRef = useRef(null); // Create a ref to the video element
  const location = useLocation(); // Get the location state

  const matchInfo = JSON.parse(localStorage.getItem('matchInfo'));
  console.log(matchInfo);
  
  // Destructure state from location and provide a fallback
  const MatchId = matchInfo._id
  const streamLink = matchInfo.streamLink

  useEffect(() => {
    if (streamLink) {
      setVideoUrl(streamLink); // Set video URL from the streamLink
    } else {
      console.error("Stream link is not available");
    }
  }, [streamLink]);

  useEffect(() => {
    // If the browser supports Hls.js, load the m3u8 file
    if (Hls.isSupported() && videoRef.current && videoUrl) {
      const hls = new Hls();
      hls.loadSource(videoUrl);
      hls.attachMedia(videoRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        console.log("Manifest parsed");
      });
      return () => {
        hls.destroy(); // Cleanup HLS instance on component unmount
      };
    } else if (videoRef.current && videoUrl) {
      // If the browser supports native HLS (e.g., Safari), use the video element directly
      videoRef.current.src = videoUrl;
    }
  }, [videoUrl]);

  return (
    <>
      <Header />
      <div className="player-activity-container">
        {/* Left Section: Video Player */}
        <div className="video-player">
          <video
            ref={videoRef}
            width="100%"
            height="80%"
            controls
            poster="thumbnail.jpg" // Optional: thumbnail before the video loads
          autoPlay>
            Your browser does not support the video tag.
          </video>
          <div className="d-flex align-items-center justify-content-left mt-3">
            <p className="ms-5 mt-3">Live not working?</p>
            <Button variant="outline-danger" className="ms-3" style={{ height: "45px" }}>
              <FaFlag className="me-3" />
              Report
            </Button>
          </div>
        </div>

        {/* Right Section: Chat Section */}
        <div className="chat-section">
          <h5>Live Chat</h5>
          <div className="chat-box">
            {/* Sample chat messages */}
            <div className="message">
              <strong>User1:</strong> Hello everyone!
            </div>
            <div className="message">
              <strong>User2:</strong> This game is awesome!
            </div>
            <div className="message">
              <strong>User3:</strong> Wow, what a play!
            </div>
          </div>
          <div className="chat-input">
            <input
              type="text"
              placeholder="Type your message..."
              className="input-field"
            />
            <button className="send-btn">Send</button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default PlayerActivity;
