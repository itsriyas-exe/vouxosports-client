import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Import framer-motion

const LiveMatches = () => {
  const [matches, setMatches] = useState([]);
  const [filteredMatches, setFilteredMatches] = useState([]); // For displaying filtered matches
  const [searchQuery, setSearchQuery] = useState(""); // For tracking search input
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the server
    const fetchMatches = async () => {
      try {
        const response = await fetch("https://vouxosports-server-production.up.railway.app/matches");
        if (!response.ok) {
          throw new Error("Failed to fetch matches");
        }
        const data = await response.json();
        setMatches(data); // Assuming data is an array of matches
        setFilteredMatches(data); // Initialize filtered matches
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  // Function to handle search
  const handleSearch = () => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = matches.filter(
      (match) =>
        match.team1Name.toLowerCase().includes(lowerCaseQuery) ||
        match.team2Name.toLowerCase().includes(lowerCaseQuery) ||
        match.league.toLowerCase().includes(lowerCaseQuery) ||
        match.round.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredMatches(filtered);
  };

  if (loading) {
    return <div className="loading">Loading matches...</div>;
  }

  if (error) {
    return <div className="error">Error: Please check your network connection! {error}</div>;
  }

  return (
    <>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for matches, leagues, teams..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="app-container">
        {filteredMatches.map((match) => (
          <motion.div
            key={match.id}
            className="match-card"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: match.id * 0.2 }}
          >
            <Link to={`/details/${match._id}`} className="linkSec">
              <div className="team">
                <img src={match.team1Logo} alt={match.team1Name} className="team-logo" />
                <p className="team-name" id="text_p">{match.team1Name}</p>
              </div>
              <div className="match-info">
                <p className="time" id="text_p">{match.time}</p>
                <p className="vs" id="text_p">VS</p>
                <p className="broadcaster">📺 VouxoSports</p>
              </div>
              <div className="team">
                <img src={match.team2Logo} alt={match.team2Name} className="team-logo" />
                <p className="team-name" id="text_p">{match.team2Name}</p>
              </div>
              <div className="match-details">
                <p id="text_p">🏆 {match.league}</p>
                <p id="text_p">🔍 Round: {match.round}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default LiveMatches;
