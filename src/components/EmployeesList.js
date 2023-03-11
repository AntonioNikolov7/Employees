import { useState } from "react";
import "./EmployeesList.css";
import EmployeeForm from "./EmployeeForm";

const EmployeesList = () => {
  const [empl, setEmpl] = useState([]);
  const [isAdd, setIsAdd] = useState(false);
  const [formData, setFormData] = useState([]);

  const fetchEmployees = async () => {
    const response = await fetch("http://localhost:5000/employees/");
    const data = await response.json();
    const employees = data.length > 0 ? data : [];
    setEmpl(employees);
  };
  const addEmployee = async () => {};

  return (
    <div>
      <button className="fetch-button" onClick={fetchEmployees}>
        Show All Employees
      </button>
      <div>
        <button
          className="fetch-button"
          onClick={() => {
            setIsAdd(true);
          }}
        >
          Add New Employee
        </button>
      </div>
      <ul className="employee-list">
        {isAdd && <EmployeeForm />}
        {empl.map((employee) => (
          <>
            <div className="employees_list">
              <button className="edit-button">EDIT</button>
              <button className="delete-button">UPDATE</button>

              <li key={Math.random(20)} className="employee-item">
                <strong className="label">Name:</strong> {employee.full_name}{" "}
                <br />
                <strong className="label">Date of Birth:</strong>{" "}
                {employee.dateOfBirth} <br />
                <strong className="label">Email:</strong> {employee.email}{" "}
                <br />
                <strong className="label">Phone Number:</strong>{" "}
                {employee.phoneNumber} <br />
                <strong className="label">Monthly Salary:</strong>{" "}
                {employee.monthlySalary} <br />
              </li>
            </div>
          </>
        ))}
      </ul>
    </div>
  );
};

export default EmployeesList;
