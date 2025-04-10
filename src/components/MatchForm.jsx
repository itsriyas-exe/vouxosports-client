import React, { useState, useEffect } from "react";
import "../styles/addMatch.css";

const MatchForm = ({ addMatch, editMatch, updateMatch, clearEdit }) => {
  const [formData, setFormData] = useState({
    team1Name: "",
    team1Logo: "",
    team2Name: "",
    team2Logo: "",
    time: "",
    league: "",
    round: "",
    matchBanner: "",
    lineupT1: "",
    lineupT2: "",
    streamLink: "",
  });

  useEffect(() => {
    if (editMatch) {
      setFormData(editMatch);
    }
  }, [editMatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form data
    if (!formData.team1Name || !formData.team2Name || !formData.time) {
      alert("Please fill out all required fields.");
      return;
    }

    if (editMatch) {
      updateMatch(editMatch._id, formData);
      window.location.reload();
    } else {
      addMatch(formData);
    }

    // Reset form
    setFormData({
      team1Name: "",
      team1Logo: "",
      team2Name: "",
      team2Logo: "",
      time: "",
      league: "",
      round: "",
      matchBanner: "",
      lineupT1: "",
      lineupT2: "",
      streamLink: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4 className="text-secondary">{editMatch ? "Edit Match" : "Add Match"}</h4>
      {Object.keys(formData).map((key) => (
        <div key={key}>
          <label>{key}</label>
          <input
            className="formInput form-control" style={{backgroundColor:"lightgrey"}}
            type="text"
            name={key}
            value={formData[key]}
            onChange={handleChange}
            required={key === "team1Name" || key === "team2Name" || key === "time"}
          />
        </div>
      ))}
      <button className="buttonn" type="submit">
        {editMatch ? "Update Match" : "Add Match"}
      </button>
      {editMatch && (
        <button className="btn btn-info" type="button" onClick={clearEdit}>
          Cancel
        </button>
      )}
    </form>
  );
};

export default MatchForm;
