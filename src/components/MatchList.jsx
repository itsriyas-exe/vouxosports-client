import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const MatchList = ({ matches, onEdit, onDelete }) => {
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this match?")) {
      onDelete(id);
     window.location.reload();
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Team 1</th>
          <th>Team 2</th>
          <th>Time</th>
          <th>League</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {matches.map((match) => (
          <tr key={match.id}>
            <td>
              <img
                className="me-3"
                src={match.team1Logo}
                alt={match.team1Name}
                style={{ width: "20px" }}
              />
              {match.team1Name}
            </td>
            <td>
              <img
                className="me-3"
                src={match.team2Logo}
                alt={match.team2Name}
                style={{ width: "20px" }}
              />
              {match.team2Name}
            </td>
            <td>{match.time}</td>
            <td>{match.league}</td>
            <td>
              <button
                className="buttonn"
                onClick={() => onEdit(match)}
              ><FaEdit className="me-2"/>
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(match._id)}
              ><FaTrash className="me-2"/>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MatchList;
