import React, { useState } from "react";
import { TextField, Button, Typography, Box, Grid2 } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/ApiCall";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/auth/authSlice";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateForm = () => {
    let valid = true;
    let errors = { name: "", email: "", password: "" };

    if (!name) {
      errors.name = "Name is required";
      valid = false;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email) {
      errors.email = "Email is required";
      valid = false;
    } else if (!emailRegex.test(email)) {
      errors.email = "Please enter a valid email address";
      valid = false;
    }

    if (!password) {
      errors.password = "Password is required";
      valid = false;
    } else if (password.length < 6) {
      errors.password = "Password must be atleast 6 characters long";
      valid = false;
    }
    setFormErrors(errors);
    return valid;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await registerUser({ name, email, password });
      dispatch(loginSuccess(response));
      toast.success("Registration Successful! Please log in.");
      navigate("/login");
    } catch (error) {
      setError("Registration failed");

      //clear error message
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        padding: 3,
      }}
    >
      <Grid2 container justifyContent="center">
        <Grid2 item xs={12} sm={8} md={6} lg={4}>
          <Box
            sx={{
              padding: 3,
              boxShadow: 3,
              borderRadius: 2,
            }}
          >
            <Typography variant="h4" gutterBottom align="center">
              Register
            </Typography>
            {error && (
              <Typography color="error" align="center">
                {error}
              </Typography>
            )}
            <form onSubmit={handleRegister}>
              <TextField
                fullWidth
                label="Name"
                type="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                margin="normal"
                error={!!formErrors.name}
                helperText={formErrors.name}
              />
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                error={!!formErrors.email}
                helperText={formErrors.email}
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                error={!!formErrors.password}
                helperText={formErrors.password}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{ width: "100%", marginTop: 2 }}
              >
                Register
              </Button>
            </form>
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default Register;
