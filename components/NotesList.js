import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button as MuiButton,
  Paper,
} from "@mui/material";
import { Delete, RadioButtonUnchecked } from "@mui/icons-material";

const NotesList = ({ notes, setNotes }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);

  const handleDeleteNote = (index) => {
    setNoteToDelete(index);
    setOpenDialog(true);
  };

  const confirmDeleteNote = () => {
    const newNotes = notes.filter((_, i) => i !== noteToDelete);
    setNotes(newNotes);
    setOpenDialog(false);
    setNoteToDelete(null);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNoteToDelete(null);
  };

  return (
    <Box width="100%" display="flex" justifyContent="center" alignItems="center">
      {notes.length > 0 && (
        <Paper
          elevation={3}
          sx={{
            width: "100%",
            maxWidth: "600px",
            p: 3,
            borderRadius: 2,
            backgroundColor: "background.paper",
          }}
        >
          <Typography variant="h6" align="center" gutterBottom>
            Saved Notes
          </Typography>
          <List>
            {notes.map((note, index) => (
              <ListItem
                key={note.id}
                divider
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: noteToDelete === index ? "gray" : "black",
                }}
              >
                <IconButton edge="start" onClick={() => handleDeleteNote(index)}>
                  <RadioButtonUnchecked />
                </IconButton>
                <ListItemText
                  primary={note.title}
                  secondary={note.content}
                  sx={{ marginLeft: 2 }}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteNote(index)}
                  >
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>

          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={2}
            p={2}
            borderRadius={2}
            bgcolor="background.default"
          >
            <Typography variant="body2" color="textSecondary">
              {notes.length}/10 notes saved
            </Typography>
          </Box>

          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Delete Note</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete this note?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <MuiButton onClick={handleCloseDialog} color="primary">
                Cancel
              </MuiButton>
              <MuiButton onClick={confirmDeleteNote} color="primary" autoFocus>
                Delete
              </MuiButton>
            </DialogActions>
          </Dialog>
        </Paper>
      )}
    </Box>
  );
};

export default NotesList;
