import React from "react";
import {
  ListItem,
  ListItemText,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import { Trash2, Pencil } from "lucide-react";

const BookItem = ({
  book,
  onEdit,
  onDelete,
  onBorrow,
  onReturn,
  isEditing,
  editedData,
  handleEditChange,
  handleUpdate,
}) => {
  return (
    <ListItem className="flex justify-between items-center py-2">
      {isEditing ? (
        <div className="flex gap-2 flex-grow">
          <TextField
            label="Title"
            size="small"
            value={editedData.title}
            onChange={(e) => handleEditChange("title", e.target.value)}
          />
          <TextField
            label="Author"
            size="small"
            value={editedData.author}
            onChange={(e) => handleEditChange("author", e.target.value)}
          />
          <TextField
            label="ISBN"
            size="small"
            value={editedData.isbn}
            onChange={(e) => handleEditChange("isbn", e.target.value)}
          />
          <TextField
            label="Published Year"
            size="small"
            value={editedData.publishedYear}
            onChange={(e) => handleEditChange("publishedYear", e.target.value)}
          />
          <TextField
            label="Available Copies"
            size="small"
            value={editedData.availableCopies}
            onChange={(e) =>
              handleEditChange("availableCopies", e.target.value)
            }
          />
          <Button onClick={handleUpdate} variant="contained" color="primary">
            Save
          </Button>
        </div>
      ) : (
        <>
          <ListItemText
            primary={book.title}
            secondary={`Author: ${book.author} | ISBN: ${book.isbn} | Published: ${book.publishedYear} | Copies: ${book.availableCopies}`}
          />
          <div className="flex items-center space-x-2">
            <IconButton onClick={() => onEdit(book)}>
              <Pencil className="h-5 w-5" />
            </IconButton>
            <IconButton onClick={() => onDelete(book._id)}>
              <Trash2 className="h-5 w-5" />
            </IconButton>
            <Button
              variant="contained"
              color="primary"
              onClick={() => onBorrow(book._id)}
              disabled={book.availableCopies <= 0}
              className="text-white"
              sx={{
                padding: "8px 16px",
                fontSize: "0.875rem",
                fontWeight: 600,
                borderRadius: "8px",
              }}
            >
              Borrow
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => onReturn(book._id)}
              sx={{
                padding: "8px 16px",
                fontSize: "0.875rem",
                fontWeight: 600,
                borderRadius: "8px",
                borderColor: "#F50057",
              }}
            >
              Return
            </Button>
          </div>
        </>
      )}
    </ListItem>
  );
};

export default BookItem;
