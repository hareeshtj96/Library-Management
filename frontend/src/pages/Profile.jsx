import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid2,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const Profile = () => {
  const navigate = useNavigate();
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    isbn: "",
    publishedYear: "",
    availableCopies: "",
  });

  const state = useSelector((state) => state.auth);
  console.log("state:", state);

  const handleChange = (e) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/books", bookData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setBookData({
        title: "",
        author: "",
        isbn: "",
        publishedYear: "",
        availableCopies: "",
      });
    } catch (err) {
      console.error("Failed to add book");
    }
  };

  return (
    <Box sx={{ padding: 3, position: "relative" }}>
      <Box
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ marginRight: 1 }}></Avatar>
        <Typography variant="body1"></Typography>
      </Box>

      <Typography variant="h4" gutterBottom align="center">
        User Profile - Add Book
      </Typography>

      <Grid2 container justifyContent="center">
        <Grid2 item xs={12} sm={8} md={6} lg={5}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h6" gutterBottom align="center">
              Add New Book
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <TextField
                label="Title"
                name="title"
                value={bookData.title}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                label="Author"
                name="author"
                value={bookData.author}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                label="ISBN"
                name="isbn"
                value={bookData.isbn}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                label="Published Year"
                name="publishedYear"
                value={bookData.publishedYear}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                label="Available Copies"
                name="availableCopies"
                value={bookData.availableCopies}
                onChange={handleChange}
                required
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Add Book
              </Button>
            </Box>
          </Paper>
        </Grid2>
      </Grid2>

      <Button
        sx={{
          marginTop: 3,
          display: "flex",
          justifyContent: "center",
          width: "100%",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          backgroundColor: "#2196f3",
          color: "white",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
            backgroundColor: "#1976d2",
          },
        }}
        variant="contained"
        onClick={() => navigate("/books")}
      >
        Manage Books
      </Button>
    </Box>
  );
};

export default Profile;
