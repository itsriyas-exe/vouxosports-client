import React from 'react';
import { Table, Button, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserReports = () => {
  const reports = [
    { id: 1, date: '2024-12-23', username: 'JohnDoe', message: 'Spamming the chat', action: '' },
    { id: 2, date: '2024-12-22', username: 'JaneSmith', message: 'Using inappropriate language', action: '' },
    // Add more reports here
  ];

  const handleFix = (id) => {
    alert(`Fixing report with ID: ${id}`);
  };

  const handleRemove = (id) => {
    alert(`Removing report with ID: ${id}`);
  };

  const handleClearAll = () => {
    alert('Clearing all reports');
  };

  return (
    <Container className="mt-5">
      <h4 className="text-center text-secondary mb-4">User Report List</h4>
      <Table responsive bordered hover className="text-center">
        <thead>
          <tr>
            <th>Date</th>
            <th>Username</th>
            <th>Report Message</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.id}>
              <td>{report.date}</td>
              <td>{report.username}</td>
              <td>{report.message}</td>
              <td>
                <Button
                  variant="success"
                  className="me-2"
                  onClick={() => handleFix(report.id)}
                >
                  Fix
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleRemove(report.id)}
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-end">
        <Button variant="warning" onClick={handleClearAll}>
          Clear All Reports
        </Button>
      </div>
    </Container>
  );
};

export default UserReports;
