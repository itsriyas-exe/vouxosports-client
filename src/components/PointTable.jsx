import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/table.css"; // Ensure your CSS file is linked

const PointTable = () => {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLeague, setSelectedLeague] = useState("47"); // Default league id (Premier League)

  const handleSelectChange = (event) => {
    setSelectedLeague(event.target.value); // Set the selected league id when the user changes it
  };

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        const options = {
          method: "GET",
          url: `https://free-api-live-football-data.p.rapidapi.com/football-get-standing-all?leagueid=${selectedLeague}`, // Use the selected league id in the URL
          headers: {
            "X-RapidAPI-Key": "1ec73c266amsh756bf6548903ef6p184c00jsn5f929ded0e5a", // Replace with your RapidAPI key
            "X-RapidAPI-Host": "free-api-live-football-data.p.rapidapi.com",
          },
        };

        const response = await axios.request(options);
        console.log("API Response:", response.data);

        // Adjust the data parsing based on the new API response structure
        if (response.data && response.data.response?.standing) {
          setStandings(response.data.response.standing);
        } else {
          setError("No standings data available.");
        }
      } catch (err) {
        console.error("API Error:", err);
        setError("Failed to fetch standings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchStandings();
  }, [selectedLeague]); // Re-run the effect whenever `selectedLeague` changes

  if (loading) return <div className="loader text-secondary">Loading Standings...</div>;
  if (error) return <div className="error">{error}</div>;

  if (!Array.isArray(standings) || standings.length === 0) {
    return <div className="error">No standings data available.</div>;
  }

  return (
    <div className="TableApp">
      <header className="Theader">
        <h4 className="text-secondary" style={{fontWeight:'bold'}}>Football Standings</h4>
        <div>
          <label htmlFor="league-selector" className="me-2">Choose a league: </label>
          <select
            id="league-selector"
            value={selectedLeague}
            onChange={handleSelectChange}
          >
            <option value="47">Premier League</option>
            <option value="42">Champions League</option>
            <option value="87">LaLiga</option>
            <option value="77">World Cup</option>
            <option value="54">Bundesliga</option>
            <option value="53">League 1</option>
            <option value="55">Serie A</option>
          </select>
        </div>
      </header>
      <main className="standings-container">
        <table className="standings-table">
          <thead>
            <tr>
              <th>Position</th>
              <th>Team</th>
              <th>Played</th>
              <th>Wins</th>
              <th>Draws</th>
              <th>Losses</th>
              <th>Goals (For-Against)</th>
              <th>Goal Difference</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((team, index) => (
              <tr key={team.id || index}>
                <td>{team.idx || "N/A"}</td>
                <td>
                  <a
                    href={`https://www.example.com${team.pageUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {team.name || "N/A"}
                  </a>
                </td>
                <td>{team.played || "N/A"}</td>
                <td>{team.wins || "N/A"}</td>
                <td>{team.draws || "N/A"}</td>
                <td>{team.losses || "N/A"}</td>
                <td>{team.scoresStr || "N/A"}</td>
                <td>{team.goalConDiff || "N/A"}</td>
                <td>{team.pts || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default PointTable;
