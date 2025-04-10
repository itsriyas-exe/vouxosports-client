import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import MatchForm from "./MatchForm";
import MatchList from "./MatchList";

const LiveManagement = () => {
  const [matches, setMatches] = useState([]);
  const [editMatch, setEditMatch] = useState(null);

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const response = await axios.get("https://vouxosports-server-production.up.railway.app/matches");
      setMatches(response.data);
    } catch (err) {
      console.error("Error fetching matches:", err);
    }
  };

  const addMatch = async (matchData) => {
    try {
      const response = await axios.post("https://vouxosports-server-production.up.railway.app/matches", matchData);
      setMatches([...matches, response.data]);
    } catch (err) {
      console.error("Error adding match:", err);
    }
  };

  const updateMatch = async (id, updatedData) => {
    try {
      const response = await axios.put(`https://vouxosports-server-production.up.railway.app/matches/${id}`, updatedData);
      setMatches(matches.map((match) => (match.id === id ? response.data : match)));
      setEditMatch(null);
    } catch (err) {
      console.error("Error updating match:", err);
    }
  };

  const deleteMatch = async (id) => {
    try {
      await axios.delete(`https://vouxosports-server-production.up.railway.app/matches/${id}`);
      setMatches(matches.filter((match) => match.id !== id));
    } catch (err) {
      console.error("Error deleting match:", err);
    }
  };  

  return (
    <StyledContainer>
      <Header>
        <h1>Match Management</h1>
      </Header>
      <Content>
        <LeftPane>
          <MatchForm
            addMatch={addMatch}
            editMatch={editMatch}
            updateMatch={updateMatch}
            clearEdit={() => setEditMatch(null)}
          />
        </LeftPane>
        <RightPane>
          <MatchList matches={matches} onEdit={setEditMatch} onDelete={deleteMatch} />
        </RightPane>
      </Content>
    </StyledContainer>
  );
};

export default LiveManagement;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: #f8f9fa;
  padding: 2rem;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 2rem;

  h1 {
    color: #343a40;
    font-size: 2.5rem;
    font-weight: bold;
  }
`;

const Content = styled.div`
  display: flex;
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
`;

const LeftPane = styled.div`
  flex: 1;
  background-color: #ffffff;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const RightPane = styled.div`
  flex: 0 1 auto; /* Allows the pane to shrink and grow based on content */
  background-color: #ffffff;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  width: auto; /* Ensures it fits the content */
`;
