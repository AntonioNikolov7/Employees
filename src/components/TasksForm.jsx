import { useState } from "react";
import "./TasksForm.css";

const TasksForm = ({ employees, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignee: undefined,
    dueDate: new Date(),
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log("name", name);
    console.log("value", value);

    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const addTasks = async () => {
    console.log("form", formData);
    const response = await fetch("http://localhost:5000/tasks/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      onSuccess();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addTasks();
  };

  return (
    <form id="tasksForm" onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Description:
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Assignee:
        <select
          id="framework"
          name="assignee"
          form="tasksForm"
          onChange={handleInputChange}
        >
          {" "}
          <option key={"placeholder"} value={"placeholder"}>
            ----
          </option>
          {employees.map((employee) => {
            return (
              <option key={employee.id} value={employee.id}>
                {employee.full_name}
              </option>
            );
          })}
        </select>
      </label>
      <label>
        Due Date:
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleInputChange}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default TasksForm;
