import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { Button, Form, Modal, Table } from "react-bootstrap";

function AdminNotify() {
  const [notifications, setNotifications] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentNotification, setCurrentNotification] = useState({
    id: null,
    title: "",
    message: "",
  });

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get("https://vouxosports-server-production.up.railway.app/notifications");
      setNotifications(response.data);
    } catch (err) {
      console.error("Error fetching notifications:", err);
    }
  };

  const handleSave = async () => {
    if (currentNotification._id) {
      await updateNotification();
    } else {
      await addNotification();
    }
    setShowModal(false);
    fetchNotifications();
  };

  const addNotification = async () => {
    try {
      await axios.post("https://vouxosports-server-production.up.railway.app/notifications", {
        title: currentNotification.title,
        message: currentNotification.message,
      });
      setCurrentNotification({ id: null, title: "", message: "" });
    } catch (err) {
      console.error("Error adding notification:", err);
    }
  };

  const updateNotification = async (id) => {
    try {
      await axios.put(
        `https://vouxosports-server-production.up.railway.app/notifications/${currentNotification._id}`,
        {
          title: currentNotification.title,
          message: currentNotification.message,
        }
      );
      setCurrentNotification({ id: null, title: "", message: "" });
    } catch (err) {
      console.error("Error updating notification:", err);
    }
  };

  const deleteNotification = async (id) => {
    try {
      await axios.delete(`https://vouxosports-server-production.up.railway.app/notifications/${id}`);
      fetchNotifications();
    } catch (err) {
      console.error("Error deleting notification:", err);
    }
  };

  const handleEdit = (notification) => {
    setCurrentNotification(notification);
    setShowModal(true);
  };

  const handleAdd = () => {
    setCurrentNotification({ id: null, title: "", message: "" });
    setShowModal(true);
  };

  return (
    <Container>
      <Header>
        <h4 className="text-secondary">Admin Notifications</h4>
        <Button variant="primary" onClick={handleAdd}>
          Add Notification
        </Button>
      </Header>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Message</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {notifications.map((notification, index) => (
            <tr key={notification._id}>
              <td>{index + 1}</td>
              <td>{notification.title}</td>
              <td>{notification.message}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEdit(notification)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => deleteNotification(notification._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for Add/Edit Notification */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {currentNotification._id ? "Edit Notification" : "Add Notification"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter notification title"
                value={currentNotification.title}
                onChange={(e) =>
                  setCurrentNotification({
                    ...currentNotification,
                    title: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter notification message"
                value={currentNotification.message}
                onChange={(e) =>
                  setCurrentNotification({
                    ...currentNotification,
                    message: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default AdminNotify;

// Styled Components
const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;
