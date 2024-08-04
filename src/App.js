import React from "react";
import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import EmployeeDetails from "./components/EmployeeDetails";
import EmployeeList from "./components/EmployeeList";
import './App.css';
import AddEmployee from "./components/AddEmployee";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmployeeList />} />
        <Route path="/employee/:id" element={<EmployeeDetails />} />
        <Route path="/add-employee" element={<AddEmployee />} />
      </Routes>
    </Router>
  );
}
  




export default App;
