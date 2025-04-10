import React, { useState, useEffect } from "react";
import axios from "axios";

const Upcomingmatches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get("https://vouxosports-server-production.up.railway.app/upcomingmatches");
        setMatches(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch matches. Please try again later.");
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  if (loading) {
    return <p>Loading matches...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="app-container">
      {matches.length > 0 ? (
        matches.map((match) => (
          <div key={match.id} className="match-card">
            <div className="team">
              <img src={match.team1Logo} alt={match.team1Name} className="team-logo" />
              <p className="team-name">{match.team1Name}</p>
            </div>
            <div className="match-info">
              <p className="time">{new Date(match.time).toLocaleTimeString()}</p>
              <p className="vs">VS</p>
              <p className="broadcaster">📺 VouxoSports</p>
            </div>
            <div className="team">
              <img src={match.team2Logo} alt={match.team2Name} className="team-logo" />
              <p className="team-name">{match.team2Name}</p>
            </div>
            <div className="match-details">
              <p>🏆 {match.league}</p>
              <p>🔍 Round : {match.round}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No upcoming matches found.</p>
      )}
    </div>
  );
};

export default Upcomingmatches;
