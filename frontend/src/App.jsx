import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Books from "./components/Books";
import Theme from "./styles/Theme";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/books" element={<Books />} />
        </Routes>
      </Router>

      <Toaster position="top-center" />
    </ThemeProvider>
  );
}

export default App;
