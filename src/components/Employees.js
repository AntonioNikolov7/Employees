import { useState, useEffect } from "react";
import "./Employees.css";
import EmployeeForm from "./EmployeeForm";
import TasksForm from "./TasksForm";
import EditEmployeeForm from "./EditEmployeeForm";

const Employees = () => {
  const [employee, setEmployee] = useState([]);
  const [formMode, setFormMode] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const response = await fetch("http://localhost:5000/employees/");
    const data = await response.json();
    const employees = data.length > 0 ? data : [];

    setEmployee(employees);
  };
  const fetchTasks = async () => {
    const response = await fetch("http://localhost:5000/tasks/");
    const data = await response.json();
    const tasks = data.length > 0 ? data : [];

    setTasks(tasks);
  };

  const deleteEmployee = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/employees/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const remainingEmployees = await response.json();
      setEmployee(remainingEmployees);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const deleteTasks = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      handleSuccessfullEmployeeAddition();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSuccessfullEmployeeAddition = () => {
    fetchEmployees();
  };
  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee);
    setFormMode("edit");
  };

  return (
    <div>
      <button className="fetch-button" onClick={fetchEmployees}>
        Reload All Employees
      </button>
      <div>
        <button
          className="fetch-button"
          onClick={() => {
            setFormMode("employees");
          }}
        >
          Add New Employee
        </button>
        <button
          className="fetch-button"
          onClick={() => {
            setFormMode("tasks");
          }}
        >
          Add New Task
        </button>
      </div>
      <ul className="employee-list">
        {formMode === "employees" && (
          <EmployeeForm onSuccess={handleSuccessfullEmployeeAddition} />
        )}
        {formMode === "tasks" && (
          <TasksForm
            employees={employee}
            onSuccess={handleSuccessfullEmployeeAddition}
          />
        )}
        {formMode === "edit" && (
          <EditEmployeeForm
            employee={selectedEmployee}
            onSuccess={handleSuccessfullEmployeeAddition}
          />
        )}
        {employee.map((currentEmployee) => (
          <div key={currentEmployee.id} className="employees_list">
            <button
              className="edit-button"
              onClick={() => handleEditEmployee(currentEmployee)}
            >
              EDIT
            </button>

            <button
              className="delete-button"
              onClick={() => deleteEmployee(currentEmployee.id)}
            >
              DELETE
            </button>

            <li key={currentEmployee.id} className="employee-item">
              <strong className="label">Name:</strong>{" "}
              {currentEmployee.full_name} <br />
              <strong className="label">Date of Birth:</strong>{" "}
              {currentEmployee.dateOfBirth} <br />
              <strong className="label">Email:</strong> {currentEmployee.email}{" "}
              <br />
              <strong className="label">Phone Number:</strong>{" "}
              {currentEmployee.phoneNumber} <br />
              <strong className="label">Monthly Salary:</strong>{" "}
              {currentEmployee.monthlySalary} <br />
              <strong className="label">Tasks:</strong>{" "}
              {currentEmployee.tasks.map((task) => `${task.title} | `)}
              <div className="button-container">
                <button className="edit-task">Edit Task</button>
                <button className="delete-task">Delete Task</button>
              </div>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Employees;
