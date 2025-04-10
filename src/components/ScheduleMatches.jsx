import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const ScheduleMatches = () => {
  const [matches, setMatches] = useState([]);
  const [formData, setFormData] = useState({
    team1Name: "",
    team1Logo: "",
    team2Name: "",
    team2Logo: "",
    time: "",
    league: "",
    round: "",
  });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editId, setEditId] = useState(null);

  const API_URL = "https://vouxosports-server-production.up.railway.app/upcomingmatches";

  // Fetch matches from the server
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get(API_URL);
        setMatches(response.data);
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
    };
    fetchMatches();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        // Update match
        const response = await axios.put(`${API_URL}/${editId}`, formData);
        setMatches((prev) =>
          prev.map((match) => (match._id === editId ? response.data : match))
        );
        alert("Match updated!");
      } else {
        // Create match
        const response = await axios.post(API_URL, formData);
        setMatches((prev) => [...prev, response.data]);
        alert("Match scheduled!");
      }

      setFormData({
        team1Name: "",
        team1Logo: "",
        team2Name: "",
        team2Logo: "",
        time: "",
        league: "",
        round: "",
      });
      setIsFormVisible(false);
      setEditId(null);
    } catch (error) {
      console.error("Error saving match:", error);
      alert("Failed to save match. Please try again.");
    }
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleEdit = (id) => {
    const match = matches.find((m) => m._id === id);
    setFormData(match);
    setIsFormVisible(true);
    setEditId(id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setMatches((prev) => prev.filter((match) => match._id !== id));
      alert("Match deleted!");
    } catch (error) {
      console.error("Error deleting match:", error);
      alert("Failed to delete match. Please try again.");
    }
  };

  return (
    <StyledWrapper>
      <div className="container">
        <div className="header-section d-flex">
          <h4>Schedule Matches</h4>
          <button className="toggle-btn" onClick={toggleFormVisibility}>
            {isFormVisible ? "Cancel" : "Schedule a Match"}
          </button>
        </div>

        {isFormVisible && (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Team 1 Name</label>
              <input
                type="text"
                name="team1Name"
                value={formData.team1Name}
                onChange={handleChange}
                placeholder="Enter Team 1 Name"
                required
              />
            </div>

            <div className="form-group">
              <label>Team 1 Logo</label>
              <input
                type="url"
                name="team1Logo"
                value={formData.team1Logo}
                onChange={handleChange}
                placeholder="Enter Team 1 Logo URL"
                required
              />
            </div>

            <div className="form-group">
              <label>Team 2 Name</label>
              <input
                type="text"
                name="team2Name"
                value={formData.team2Name}
                onChange={handleChange}
                placeholder="Enter Team 2 Name"
                required
              />
            </div>

            <div className="form-group">
              <label>Team 2 Logo</label>
              <input
                type="url"
                name="team2Logo"
                value={formData.team2Logo}
                onChange={handleChange}
                placeholder="Enter Team 2 Logo URL"
                required
              />
            </div>

            <div className="form-group">
              <label>Match Time</label>
              <input
                type="datetime-local"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>League</label>
              <input
                type="text"
                name="league"
                value={formData.league}
                onChange={handleChange}
                placeholder="Enter League Name"
                required
              />
            </div>

            <div className="form-group">
              <label>Round</label>
              <input
                type="text"
                name="round"
                value={formData.round}
                onChange={handleChange}
                placeholder="Enter Round"
                required
              />
            </div>

            <button type="submit" className="submit-btn">
              {editId ? "Update Match" : "Save Match"}
            </button>
          </form>
        )}

        <div className="matches-list">
          <h3>Scheduled Matches</h3>
          {matches.length > 0 ? (
            <ul>
              {matches.map((match) => (
                <li key={match._id}>
                  <div className="match-item">
                    <div>
                      <strong>{match.team1Name}</strong> vs {" "}
                      <strong>{match.team2Name}</strong>
                    </div>
                    <div>
                      <img
                        src={match.team1Logo}
                        alt={`${match.team1Name} Logo`}
                        className="team-logo"
                      />
                      <span>vs</span>
                      <img
                        src={match.team2Logo}
                        alt={`${match.team2Name} Logo`}
                        className="team-logo"
                      />
                    </div>
                    <div>{new Date(match.time).toLocaleString()}</div>
                    <div>
                      League: {match.league}, Round: {match.round}
                    </div>
                    <div className="action-buttons">
                      <button
                        onClick={() => handleEdit(match._id)}
                        className="edit-btn"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(match._id)}
                        className="delete-btn"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No matches scheduled. Add a new match!</p>
          )}
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  h4 {
    text-align: center;
    color: #333;
    margin-bottom: 1rem;
  }

  .toggle-btn {
    display: block;
    margin: 0 auto 1rem;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .toggle-btn:hover {
    background-color: #0056b3;
  }

  form {
    margin-bottom: 2rem;
  }

  .form-group {
    margin-bottom: 1rem;
  }

  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
  }

  .form-group input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  .matches-list {
    margin-top: 2rem;
  }

  .matches-list ul {
    list-style: none;
    padding: 0;
  }

  .matches-list li {
    margin-bottom: 1rem;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 5px;
  }

  .match-item {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .team-logo {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin: 0 0.5rem;
  }

  .action-buttons {
    display: flex;
    gap: 0.5rem;
  }

  .edit-btn,
  .delete-btn {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .edit-btn {
    background-color: #28a745;
  }

  .edit-btn:hover {
    background-color: #218838;
  }

  .delete-btn {
    background-color: #dc3545;
  }

  .delete-btn:hover {
    background-color: #c82333;
  }
`;

export default ScheduleMatches;
