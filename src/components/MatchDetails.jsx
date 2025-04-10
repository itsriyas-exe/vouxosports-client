import React, { useState, useEffect } from "react";
import "../styles/matchdetails.css";
import { MdLiveTv } from "react-icons/md";
import Header from "./Header";
import Footer from "./Footer";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FaPlay } from "react-icons/fa";

const MatchDetails = () => {
  const { id } = useParams(); // Get the match ID from the URL
  const [matchInfo, setMatchInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatchDetails = async () => {
      try {
        const response = await fetch(`https://vouxosports-server-production.up.railway.app/matches/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch match details");
        }
        const data = await response.json();
        setMatchInfo(data);
        localStorage.setItem('matchInfo', JSON.stringify(data)); // Store in localStorage
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMatchDetails();
  }, [id]);

  // Animation Variants
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const slideIn = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  if (loading) {
    return <div className="loading">Loading match details...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <motion.div className="match-detailss" initial="hidden" animate="visible">
      <Header />

      {/* Match Header */}
      <motion.div className="header" variants={fadeIn}>
        <h4 style={{fontWeight:"bold"}}>{matchInfo.team1Name}<span className="ms-3 me-3">vs</span>{matchInfo.team2Name}</h4>
        <p>
          <MdLiveTv size={25} color="red" />
        </p>
        <img
          src={matchInfo.matchBanner}
          alt={matchInfo.teams}
          width={"250px"}
          className="rounded"
        />
      </motion.div>

      {/* Match Info Grid */}
      <motion.div className="match-infoo" variants={fadeIn}>
        <div className="info-row">
          <span>Time (IST):</span>
          <span>{matchInfo.time}</span>
        </div>
        <div className="info-row">
          <span>League:</span>
          <span>{matchInfo.league}</span>
        </div>
        <div className="info-row">
          <span>Round:</span>
          <span>{matchInfo.round}</span>
        </div>
        <div className="info-row">
          <span>Streaming:</span>
          <span>VouxoSports</span>
        </div>
      </motion.div>

      {/* Lineup Section */}
      <motion.div className="section" variants={slideIn}>
        <h2>Match Lineup</h2>
        <p>
          <strong>{matchInfo.team1Name} XI :</strong> {matchInfo.lineupT1}
        </p>
        <p>
          <strong>{matchInfo.team2Name} XI :</strong> {matchInfo.lineupT2}
        </p>
      </motion.div>

      {/* Match Live Info */}
      <motion.div className="section live-info" variants={fadeIn}>
        <h2>Watch Live Now</h2>
        <Link to={"/watch"}>
          <button className="live-button">
            <FaPlay className="me-3" />
            Click Here
          </button>
        </Link>
        <p>{matchInfo.teams}</p>
      </motion.div>

      <Footer />
    </motion.div>
  );
};

export default MatchDetails;
