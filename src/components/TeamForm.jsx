import { useState } from "react";
import "./TeamForm.css";

const TeamForm = ({ employees, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    devision: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const addTeam = async () => {
    const response = await fetch("http://localhost:5000/teams/", {
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
    addTeam();
  };

  return (
    <form id="teamForm" onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Devision:
        <input
          type="text"
          name="devision"
          value={formData.devision}
          onChange={handleInputChange}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default TeamForm;
