import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { RiVipCrownLine } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { FaSearch, FaUserPlus } from "react-icons/fa";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://vouxosports-server-production.up.railway.app/users");
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users", error);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Filter users based on search term
  const filteredUsers = users.filter(
    (user) =>
      (user.name?.toLowerCase().includes(searchTerm.toLowerCase())) || 
      (user.email?.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  

  // Handle delete user
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      try {
        await axios.delete(`https://vouxosports-server-production.up.railway.app/users/${id}`);
        // Filter the users array by excluding the deleted user
        setUsers(users.filter((user) => user._id !== id));  // use _id if that's the MongoDB default
      } catch (error) {
        console.error("Error deleting user", error);
      }
    }
  };

  // Handle edit user (for simplicity using prompt)
  const handleEdit = (id) => {
    const userName = prompt("Enter new name for the user:");
    const userEmail = prompt("Enter new email for the user:");
    if (userName && userEmail) {
      axios
        .put(`https://vouxosports-server-production.up.railway.app/users/${id}`, { name: userName, email: userEmail })
        .then((response) => {
          setUsers(
            users.map((user) =>
              user._id === id ? { ...user, name: userName, email: userEmail } : user
            )
          );
        })
        .catch((error) => console.error("Error updating user", error));
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <StyledWrapper>
      <div className="header">
        <h4>User Management</h4>
        <div><FaSearch className="me-2"/>
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <tr key={user._id}> {/* Use _id as key if that's the MongoDB ID */}
                <td id="text_td">{index + 1}</td>
                <td id="text_td">{user.username}</td>
                <td id="text_td">{user.email}</td>
                <td>
                  <button onClick={() => handleEdit(user._id)}>
                    <CiEdit className="me-2" />
                    Edit
                  </button>
                  <button onClick={() => handleDelete(user._id)}>
                    <MdDelete className="me-2" />
                    Delete
                  </button>
                  <button className="btn btn-warning">
                    <RiVipCrownLine className="me-2" />
                    Membership
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  padding: 1rem;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .header input {
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 300px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
  }

  th,
  td {
    text-align: left;
    padding: 0.75rem;
    border: 1px solid #ccc;
  }

  th {
    background-color: #f4f4f4;
  }

  td button {
    padding: 0.5rem 1rem;
    margin-right: 0.5rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  td button:nth-child(1) {
    background-color: #007bff;
    color: #fff;
  }

  td button:nth-child(2) {
    background-color: #dc3545;
    color: #fff;
  }

  .no-users {
    text-align: center;
    color: #888;
  }
`;

export default UserManagement;
