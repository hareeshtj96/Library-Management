import React, { useState } from "react";
import { TextField, Button, Typography, Box, Grid2 } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/ApiCall";
import { useDispatch, useSelector } from "react-redux";
import { login, loginSuccess, loginFailure } from "../redux/auth/authSlice";
import { toast } from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser({ email, password });
      console.log("Login Response:", response);
      dispatch(loginSuccess(response));
      toast.success("Login Successful!");
      navigate("/profile");
    } catch (error) {
      dispatch(loginFailure(error.message));
      toast.error("Invalid email or password");
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
              Login
            </Typography>
            {error && (
              <Typography color="error" align="center">
                {error}
              </Typography>
            )}
            <form onSubmit={handleLogin}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                required
              />
              <Button
                type="submit"
                variant="contained"
                sx={{ width: "100%", marginTop: 2 }}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default Login;
