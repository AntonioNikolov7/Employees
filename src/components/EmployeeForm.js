import React, { useState } from "react";

function EmployeeForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [monthlySalary, setMonthlySalary] = useState(0);

  function handleSubmit(event) {
    event.preventDefault();
    console.log({
      fullName,
      email,
      phoneNumber,
      dateOfBirth,
      monthlySalary,
    });
    // you can do further processing with the form data here
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="fullName">Full Name:</label>
        <input
          type="text"
          id="fullName"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="tel"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(event) => setPhoneNumber(event.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="dateOfBirth">Date of Birth:</label>
        <input
          type="date"
          id="dateOfBirth"
          value={dateOfBirth}
          onChange={(event) => setDateOfBirth(event.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="monthlySalary">Monthly Salary:</label>
        <input
          type="number"
          id="monthlySalary"
          value={monthlySalary}
          onChange={(event) => setMonthlySalary(event.target.value)}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default EmployeeForm;
