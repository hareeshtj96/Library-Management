import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Paper,
  List,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid2,
} from "@mui/material";
import BookItem from "./BookItem";
import Pagination from "./Pagination";

const Books = () => {
  const [allBooks, setAllBooks] = useState([]);
  const [displayedBooks, setDisplayedBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [editingBook, setEditingBook] = useState(null);
  const [editedData, setEditedData] = useState({
    title: "",
    author: "",
    isbn: "",
    publishedYear: "",
    availableCopies: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [history, setHistory] = useState([]);
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false);

  const fetchBooks = async (pageNumber = 1) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:5000/api/books?page=${pageNumber}`
      );
      const data = await response.json();
      setAllBooks(data.books);
      setDisplayedBooks(data.books);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error("Failed to load books:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const performSearch = () => {
    if (!search.trim()) {
      setDisplayedBooks(allBooks);
      return;
    }

    const searchTerm = search.toLowerCase();
    const filteredBooks = allBooks.filter(
      (book) =>
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm) ||
        book.isbn.includes(searchTerm)
    );
    setDisplayedBooks(filteredBooks);
  };

  const handleReset = () => {
    setSearch("");
    setDisplayedBooks(allBooks);
  };

  const handleDelete = async (bookId) => {
    try {
      await fetch(`http://localhost:5000/api/books/${bookId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchBooks(page);
    } catch (err) {
      console.error("Failed to delete book:", err);
    }
  };

  const handleEdit = (book) => {
    setEditingBook(book._id);
    setEditedData({
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      publishedYear: book.publishedYear,
      availableCopies: book.availableCopies,
    });
  };

  const handleUpdate = async () => {
    try {
      await fetch(`http://localhost:5000/api/books/${editingBook}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(editedData),
      });
      setEditingBook(null);
      fetchBooks(page);
    } catch (err) {
      console.error("Failed to update book:", err);
    }
  };

  // Borrow book
  const handleBorrow = async (bookId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/borrow/${bookId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to borrow the book");
      }

      const data = await response.json();
      console.log("Borrowed book:", data);
      fetchBooks(page);
    } catch (error) {
      console.error("Error borrowing the book:", error);
    }
  };

  // Return book
  const handleReturn = async (bookId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/borrow/return/${bookId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to return the book");
      }

      const data = await response.json();
      fetchBooks(page);
    } catch (error) {
      console.error("Error returning the book:", error);
    }
  };

  // history
  const handleHistory = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/borrow/history`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to return the book");
      }

      const data = await response.json();
      console.log("Data:", data);

      setHistory(data || []);
      setIsHistoryDialogOpen(true);
    } catch (error) {
      console.error("Error fetching borrow history:", error);
      setHistory([]);
    }
  };

  useEffect(() => {
    fetchBooks(page);
  }, [page]);

  return (
    <Box className="p-6">
      <Typography className="text-2xl font-bold mb-4">Manage Books</Typography>

      <Box className="mb-4">
        <Grid2 container spacing={2} direction={{ xs: "column", sm: "row" }}>
          <Grid2 item xs={12} sm={8} md={6}>
            <TextField
              label="Search Books"
              value={search}
              onChange={handleSearch}
              fullWidth
            />
          </Grid2>
          <Grid2 item xs={12} sm={4} md={2}>
            <Button onClick={performSearch} variant="contained" fullWidth>
              Search
            </Button>
          </Grid2>
          <Grid2 item xs={12} sm={4} md={2}>
            <Button onClick={handleReset} variant="outlined" fullWidth>
              Reset
            </Button>
          </Grid2>
          <Grid2 item xs={12} sm={4} md={2}>
            <Button onClick={handleHistory} variant="outlined" fullWidth>
              History
            </Button>
          </Grid2>
        </Grid2>
      </Box>

      <Paper className="p-4 max-h-[400px] overflow-y-auto">
        {isLoading ? (
          <Typography className="text-gray-600">Loading...</Typography>
        ) : displayedBooks.length === 0 ? (
          <Typography className="text-gray-600">No books found.</Typography>
        ) : (
          <List>
            {displayedBooks.map((book) => (
              <BookItem
                key={book._id}
                book={book}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onBorrow={handleBorrow}
                onReturn={handleReturn}
                isEditing={editingBook === book._id}
                editedData={editedData}
                handleEditChange={(field, value) =>
                  setEditedData({ ...editedData, [field]: value })
                }
                handleUpdate={handleUpdate}
              />
            ))}
          </List>
        )}
      </Paper>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      {/* History Dialog */}
      <Dialog
        open={isHistoryDialogOpen}
        onClose={() => setIsHistoryDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Borrow History</DialogTitle>
        <DialogContent>
          {Array.isArray(history) && history.length === 0 ? (
            <Typography>No history found.</Typography>
          ) : (
            <List>
              {Array.isArray(history) &&
                history.map((record, index) => (
                  <Typography key={index}>
                    Book: {record.book.title}, Borrowed on:{" "}
                    {new Date(record.borrowDate).toLocaleString()}
                  </Typography>
                ))}
            </List>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsHistoryDialogOpen(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Books;
