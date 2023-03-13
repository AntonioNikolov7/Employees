import { useState, useEffect } from "react";
import "./Employees.css";
import EmployeeForm from "./EmployeeForm";
import TasksForm from "./TasksForm";
import EditEmployeeForm from "./EditEmployeeForm";
import TeamForm from "./TeamForm";

const Employees = () => {
  const [employee, setEmployee] = useState([]);
  const [formMode, setFormMode] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    (async () => {
      await fetchEmployees();
      await fetchTeams();
    })();
  }, []);

  const fetchTeams = async () => {
    const response = await fetch("http://localhost:5000/teams/");
    const data = await response.json();
    const teams = data.length > 0 ? data : [];

    setTeams(teams);
  };

  const fetchEmployees = async () => {
    const response = await fetch("http://localhost:5000/employees/");
    const data = await response.json();
    const employees = data.length > 0 ? data : [];

    setEmployee(employees);
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
  const deleteTask = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      handleSuccess();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSuccess = () => {
    fetchEmployees();
  };

  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee);
    setFormMode("edit");
  };

  const getEmployeeWithMostTasks = () => {
    var emplpoyeeWithMostTasksIndex = -1;
    var maxTaskCount = -1;
    employee.forEach((e, index) => {
      if (e.tasks.length > maxTaskCount) {
        maxTaskCount = e.tasks.length;
        emplpoyeeWithMostTasksIndex = index;
      }
    });

    return employee[emplpoyeeWithMostTasksIndex];
  };

  const employeeWithMostTasks = getEmployeeWithMostTasks();

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
        <button
          className="fetch-button"
          onClick={() => {
            setFormMode("teams");
          }}
        >
          Add New Team
        </button>
      </div>
      <div>
        <h2>Leaderboard</h2>
        <p>
          Employee with most tasks: {employeeWithMostTasks?.full_name}, tasks
          count: {employeeWithMostTasks?.tasks.length}
        </p>
      </div>
      <ul className="employee-list">
        {formMode === "employees" && (
          <EmployeeForm onSuccess={handleSuccess} teams={teams} />
        )}
        {formMode === "tasks" && (
          <TasksForm employees={employee} onSuccess={handleSuccess} />
        )}
        {formMode === "edit" && (
          <EditEmployeeForm
            employee={selectedEmployee}
            onSuccess={handleSuccess}
            teams={teams}
          />
        )}
        {formMode === "teams" && <TeamForm onSuccess={handleSuccess} />}
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
              <strong className="label">Team:</strong>{" "}
              {teams.find((t) => t.id === currentEmployee.team)?.name} <br />
              <strong className="label">Monthly Salary:</strong>{" "}
              {currentEmployee.monthlySalary} <br />
              <br />
              <strong className="label">Tasks:</strong>{" "}
              {currentEmployee?.tasks.length > 0
                ? currentEmployee.tasks.map((task) => {
                    return (
                      <div key={task.id} onClick={() => deleteTask(task.id)}>
                        <span>{task.title} - </span>
                        <span>{task.description}</span>
                        <button className="delete-button">X</button>
                      </div>
                    );
                  })
                : "No tasks assigned"}
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Employees;
