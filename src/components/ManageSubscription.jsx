import React, { useState } from "react";
import styled from "styled-components";

const ManageSubscription = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", plan: "Basic" },
    { id: 2, name: "Jane Smith", plan: "Premium" },
  ]);

  const [plans, setPlans] = useState([
    { id: 1, name: "Basic", price: "$10/month" },
    { id: 2, name: "Premium", price: "$20/month" },
  ]);

  const [isPlansVisible, setIsPlansVisible] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [newPlan, setNewPlan] = useState({ name: "", price: "" });
  const [editingUser, setEditingUser] = useState(null);
  const [planForm, setPlanForm] = useState({ startTime: "", endTime: "", planId: "" });

  const togglePlansVisibility = () => {
    setIsPlansVisible(!isPlansVisible);
  };

  const handleNewPlanChange = (e) => {
    const { name, value } = e.target;
    setNewPlan({ ...newPlan, [name]: value });
  };

  const addPlan = () => {
    setPlans([...plans, { ...newPlan, id: plans.length + 1 }]);
    setNewPlan({ name: "", price: "" });
    alert("Plan added successfully!");
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setPlanForm({ startTime: "", endTime: "", planId: user.plan });
    setIsFormVisible(true);
  };

  const handlePlanFormChange = (e) => {
    const { name, value } = e.target;
    setPlanForm({ ...planForm, [name]: value });
  };

  const updateUserPlan = () => {
    setUsers(
      users.map((user) =>
        user.id === editingUser.id
          ? { ...user, plan: plans.find((plan) => plan.id === Number(planForm.planId)).name }
          : user
      )
    );
    setEditingUser(null);
    setPlanForm({ startTime: "", endTime: "", planId: "" });
    setIsFormVisible(false);
    alert("User plan updated successfully!");
  };

  return (
    <StyledWrapper>
      <div className="container">
        <h2>Subscription Management</h2>

        <h3>Existing Users</h3>
        <ul className="user-list">
          {users.map((user) => (
            <li key={user.id} className="user-item">
              <div>
                <strong>{user.name}</strong>
                <span> - {user.plan}</span>
              </div>
              <button onClick={() => handleEditUser(user)} className="edit-btn">Edit Plan</button>
            </li>
          ))}
        </ul>

        <button className="toggle-btn" onClick={togglePlansVisibility}>
          {isPlansVisible ? "Hide Membership Plans" : "Membership and Plans"}
        </button>

        {isPlansVisible && (
          <div className="plans-section">
            <h3>Existing Plans</h3>
            <ul className="plan-list">
              {plans.map((plan) => (
                <li key={plan.id} className="plan-item">
                  <strong>{plan.name}</strong> - {plan.price}
                </li>
              ))}
            </ul>

            <h4>Add New Plan</h4>
            <div className="form-group">
              <input
                type="text"
                name="name"
                value={newPlan.name}
                onChange={handleNewPlanChange}
                placeholder="Plan Name"
              />
              <input
                type="text"
                name="price"
                value={newPlan.price}
                onChange={handleNewPlanChange}
                placeholder="Plan Price"
              />
              <button onClick={addPlan} className="add-btn">Add Plan</button>
            </div>
          </div>
        )}

        {isFormVisible && (
          <div className="edit-plan-form">
            <h3>Edit Plan for {editingUser.name}</h3>
            <div className="form-group">
              <label>Plan</label>
              <select
                name="planId"
                value={planForm.planId}
                onChange={handlePlanFormChange}
              >
                {plans.map((plan) => (
                  <option key={plan.id} value={plan.id}>
                    {plan.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Start Time</label>
              <input
                type="datetime-local"
                name="startTime"
                value={planForm.startTime}
                onChange={handlePlanFormChange}
              />
            </div>

            <div className="form-group">
              <label>End Time</label>
              <input
                type="datetime-local"
                name="endTime"
                value={planForm.endTime}
                onChange={handlePlanFormChange}
              />
            </div>

            <button onClick={updateUserPlan} className="save-btn">Save Changes</button>
          </div>
        )}
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

  h2, h3, h4 {
    text-align: center;
    color: #333;
  }

  .user-list, .plan-list {
    list-style: none;
    padding: 0;
    margin: 1rem 0;
  }

  .user-item, .plan-item {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-bottom: 0.5rem;
  }

  .toggle-btn, .edit-btn, .add-btn, .save-btn {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 1rem;
  }

  .edit-btn {
    background-color: #28a745;
  }

  .edit-btn:hover, .save-btn:hover, .toggle-btn:hover, .add-btn:hover {
    opacity: 0.9;
  }

  .form-group {
    margin-bottom: 1rem;
  }

  .form-group input, .form-group select {
    width: 100%;
    padding: 0.75rem;
    margin-top: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  .plans-section {
    margin-top: 2rem;
  }

  .edit-plan-form {
    margin-top: 2rem;
  }
`;

export default ManageSubscription;
