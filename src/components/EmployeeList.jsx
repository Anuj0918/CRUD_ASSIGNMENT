import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); 
  const [currentId, setCurrentId] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {                             
        const response = await axios.get('https://free-ap-south-1.cosmocloud.io/development/api/employee?limit=100&offset=0', {
          headers: {
            'projectId': '66ae728c7fd4fa5747166329',
            'environmentId': '66ae728c7fd4fa574716632a',
          }
        });
       
        setEmployees(response.data.data || response.data || []);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch employee! ', err);
        setError(err);
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleViewDetails = (employeeId) => {
    navigate(`/employee/${employeeId}`);
  };

  const handleAddEmployee = () => {
    navigate('/add-employee');
  };

  const handleDeleteEmployee = async (employeeId) => {
    try {
      console.log(`Deleting employee with ID: ${employeeId}`); 
      const response = await axios.delete(`https://free-ap-south-1.cosmocloud.io/development/api/employee/${employeeId}`, {
        headers: {
          'projectId': '66ae728c7fd4fa5747166329',
            'environmentId': '66ae728c7fd4fa574716632a',
        },
        data: {} 
      });
     
      setEmployees(employees.filter(emp => emp._id !== employeeId));
    } catch (err) {
      console.error('Could not delete employee:', err.response ? err.response.data : err.message);
      setError(err);
    }
  };

  const handleDisplayId = (employeeId) => {
    setCurrentId(employeeId);
    setShowModal(true); 
  };

  const closeModal = () => {
    setShowModal(false); 
    setCurrentId(null);
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#e3f2fd',
      padding: '20px',
    },
    header: {
      textAlign: 'center',
      marginBottom: '24px',
    },
    title: {
      fontSize: '2rem',
      color: '#1e88e5',
    },
    subTitle: {
      fontSize: '1rem',
      color: '#42a5f5',
    },
    addButton: {
      backgroundColor: '#8e24aa',
      color: '#ffffff',
      border: 'none',
      borderRadius: '8px',
      padding: '10px 20px',
      cursor: 'pointer',
      fontSize: '1rem',
      marginBottom: '16px',
    },
    addButtonHover: {
      backgroundColor: '#6a1b9a',
    },
    list: {
      width: '100%',
      maxWidth: '800px',
    },
    listItem: {
      backgroundColor: '#ffffff',
      border: '1px solid #bdbdbd',
      borderRadius: '8px',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      padding: '16px',
      marginBottom: '16px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    listItemText: {
      fontSize: '1.125rem',
      color: '#424242',
    },
    buttonGroup: {
      display: 'flex',
      alignItems: 'center',
    },
    displayButton: {
      backgroundColor: '#43a047',
      color: '#ffffff',
      border: 'none',
      borderRadius: '8px',
      padding: '8px 16px',
      cursor: 'pointer',
      fontSize: '0.875rem',
      marginRight: '8px',
    },
    displayButtonHover: {
      backgroundColor: '#388e3c',
    },
    idButton: {
      backgroundColor: '#039be5',
      color: '#ffffff',
      border: 'none',
      borderRadius: '8px',
      padding: '8px 16px',
      cursor: 'pointer',
      fontSize: '0.875rem',
      marginLeft: '8px',
    },
    idButtonHover: {
      backgroundColor: '#0288d1',
    },
    deleteButton: {
      backgroundColor: '#e53935',
      color: '#ffffff',
      border: 'none',
      borderRadius: '8px',
      padding: '8px 16px',
      cursor: 'pointer',
      fontSize: '0.875rem',
      marginLeft: '12px',
    },
    deleteButtonHover: {
      backgroundColor: '#d32f2f',
    },
    errorText: {
      color: '#d32f2f',
      textAlign: 'center',
      padding: '16px',
    },
    loadingText: {
      textAlign: 'center',
      padding: '16px',
    },
    noEmployeesText: {
      textAlign: 'center',
      fontSize: '1.125rem',
      color: '#9e9e9e',
      padding: '16px',
    },
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      width: '300px',
      textAlign: 'center',
    },
    closeButton: {
      backgroundColor: '#ef5350',
      color: '#ffffff',
      border: 'none',
      borderRadius: '8px',
      padding: '8px 16px',
      cursor: 'pointer',
      fontSize: '0.875rem',
    },
    closeButtonHover: {
      backgroundColor: '#e53935',
    },
  };

     

  if (loading) return <div style={styles.loadingText}>Loading...</div>;
  if (error) return <div style={styles.errorText}>Error: {error.message}</div>;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Employee List</h1>
        <p style={styles.subTitle}>Total Employees: <span style={{ fontWeight: '600' }}>{employees.length}</span></p>
      </div>
      <button
        onClick={handleAddEmployee}
        style={styles.addButton}
        onMouseOver={e => e.currentTarget.style.backgroundColor = styles.addButtonHover.backgroundColor}
        onMouseOut={e => e.currentTarget.style.backgroundColor = styles.addButton.backgroundColor}
      >
        Add Employee
      </button>
      {employees.length > 0 ? (
        <div style={styles.list}>
          {employees.map((employee) => (
            <div key={employee._id} style={styles.listItem}>
              <span style={styles.listItemText}>
                {employee.name}
              </span>
              <div style={styles.buttonGroup}>
                <button
                  onClick={() => handleViewDetails(employee._id)}
                  style={styles.displayButton}
                  onMouseOver={e => e.currentTarget.style.backgroundColor = styles.displayButtonHover.backgroundColor}
                  onMouseOut={e => e.currentTarget.style.backgroundColor = styles.displayButton.backgroundColor}
                >
                  Display Details
                </button>
                <button
                  onClick={() => handleDisplayId(employee._id)}
                  style={styles.idButton}
                  onMouseOver={e => e.currentTarget.style.backgroundColor = styles.idButtonHover.backgroundColor}
                  onMouseOut={e => e.currentTarget.style.backgroundColor = styles.idButton.backgroundColor}
                >
                  Show ID
                </button>
                <button
                  onClick={() => handleDeleteEmployee(employee._id)}
                  style={styles.deleteButton}
                  onMouseOver={e => e.currentTarget.style.backgroundColor = styles.deleteButtonHover.backgroundColor}
                  onMouseOut={e => e.currentTarget.style.backgroundColor = styles.deleteButton.backgroundColor}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={styles.noEmployeesText}>No Employees in the system.</div>
      )}
      {showModal && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
            <h2>Employee ID</h2>
            <p>{currentId}</p>
            <button
              onClick={closeModal}
              style={styles.closeButton}
              onMouseOver={e => e.currentTarget.style.backgroundColor = styles.closeButtonHover.backgroundColor}
              onMouseOut={e => e.currentTarget.style.backgroundColor = styles.closeButton.backgroundColor}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;