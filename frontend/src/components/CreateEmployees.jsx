import React, { useState } from "react";

import {
  Heading,
  FormContainer,
  SignupButton,
  Label, // Assuming you have a Label styled component
  Input, // Assuming you have an Input styled component
  Select,
  CreateEmployeesFrom,
} from "../global/Style";

import { signup } from "../services/authServices";

function CreateEmployees() {
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [role, setRole] = useState("");

  const [message, setMessage] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

  async function handleSignup(e) {
    e.preventDefault();

    setMessage("");

    setSuccessMessage("");

    try {
      await signup({ name, email, password, role });

      setSuccessMessage("User has been created successfully! 🎉");

      setName("");

      setEmail("");

      setPassword("");

      setRole("");
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <CreateEmployeesFrom>
      {message && <p style={{ color: "red" }}>{message}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <Heading>Create Employee</Heading>
      <FormContainer onSubmit={handleSignup}>
        <Label htmlFor="name">Username</Label>{" "}
        <Input
          id="name"
          type="text"
          placeholder="Enter username"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Label htmlFor="email">Email</Label>{" "}
        <Input
          id="email"
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Label htmlFor="password">Password</Label>{" "}
        <Input
          id="password"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Label htmlFor="role">Role</Label>{" "}
        <Select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">Select a role</option>{" "}
          <option value="manager">Manager</option>{" "}
          <option value="salesman">Salesman</option>{" "}
          <option value="admin">Admin</option>{" "}
        </Select>
        <SignupButton type="submit">Create Employee</SignupButton>{" "}
      </FormContainer>{" "}
    </CreateEmployeesFrom>
  );
}

export default CreateEmployees;
