import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion"; // For animations
import "../styles/LiveScores.css"; // Custom styling

const LiveScores = () => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLiveScores = async () => {
      const options = {
        method: "GET",
        url: "https://free-api-live-football-data.p.rapidapi.com/football-current-live",
        headers: {
          "X-RapidAPI-Key": "1ec73c266amsh756bf6548903ef6p184c00jsn5f929ded0e5a",
          "X-RapidAPI-Host": "free-api-live-football-data.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        setScores(response.data?.response?.live || []);
      } catch (err) {
        setError("Failed to fetch live scores. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchLiveScores();
  }, []);

  if (loading) {
    return <div className="loading">Loading live scores...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="live-scores-container">
      <h1 className="title" style={{fontWeight:'bold'}}>Live Football Scores</h1>
      {scores.length === 0 ? (
        <p className="no-matches">No live matches currently available.</p>
      ) : (
        <div className="scores-grid">
          {scores.map((match, index) => (
            <motion.div
              key={match.id}
              className="match-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="team">
                <p className="team-name">{match.home.name}</p>
                <p className="score">{match.home.score}</p>
              </div>
              <div className="match-info">
                <p className="time text-danger">⏱ {match.status.liveTime.short}</p>
                <p className="score-str text-success" style={{fontWeight:'bold'}}>{match.status.scoreStr}</p>
              </div>
              <div className="team">
                <p className="team-name">{match.away.name}</p>
                <p className="score">{match.away.score}</p>
              </div>
              <p className="league">🏆 Stage: {match.tournamentStage}</p>
              <p className="match-time">🕒 {match.time}</p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LiveScores;
