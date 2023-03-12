import { useState } from "react";
import "./EmployeeForm.css";

const EditEmployeeForm = ({ onSuccess, employee }) => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phoneNumber: 0,
    dateOfBirth: 0,
    monthlySalary: 0,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const editEmployee = async () => {
    const response = await fetch(
      `http://localhost:5000/employees/${employee.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    if (response.ok) {
      onSuccess();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    editEmployee();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Full Name:
        <input
          type="text"
          name="full_name"
          value={formData.full_name}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Phone Number:
        <input
          type="number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Date of Birth:
        <input
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Monthly Salary:
        <input
          type="number"
          name="monthlySalary"
          value={formData.monthlySalary}
          onChange={handleInputChange}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default EditEmployeeForm;
