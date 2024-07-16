import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button as MuiButton,
  ListItemSecondaryAction,
} from "@mui/material";
import { Mic, MicOff, Delete, RadioButtonUnchecked } from "@mui/icons-material";
import axios from "axios";

const RecordingView = () => {
  const [isRecord, setIsRecord] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [correctedTranscript, setCorrectedTranscript] = useState("");
  const [notes, setNotes] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [isRecordingDialogOpen, setIsRecordingDialogOpen] = useState(false);
  const recognitionRef = useRef(null);

  const openaiApiKey = 'sk-proj-VlKQ0AwpTGkdJongriPYT3BlbkFJSsokNOp5XvazrQwSYR6h'; // Replace with your OpenAI API key

  // Function to start recording
  const startRecording = () => {
    setIsRecord(true);
    recognitionRef.current = new window.webkitSpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = "en-US";
    recognitionRef.current.onresult = (event) => {
      let finalTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        finalTranscript += event.results[i][0].transcript + " ";
      }
      setTranscript(finalTranscript.trim());
    };
    recognitionRef.current.start();
    console.log("Recording started");
  };

  // Function to stop recording
  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current.onend = () => {
        console.log("Recording stopped", transcript);
        correctText(transcript); // Correct the transcript after stopping the recording
      };
      setIsRecord(false);
    }
  };

  // Toggle recording
  const handleToggleRecording = () => {
    if (isRecord) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  // Function to correct the text using OpenAI API
  const correctText = async (text) => {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo-0125',
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: `Correct the following text for grammar, spelling, and clarity:\n\n"${text}"\n\nCorrected Text:` },
          ],
          max_tokens: 100,
          temperature: 0.5,
        },
        {
          headers: {
            'Authorization': `Bearer ${openaiApiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const correctedText = response.data.choices[0].message.content.trim();
      setCorrectedTranscript(correctedText);
    } catch (error) {
      console.error("Error correcting text:", error);
      setCorrectedTranscript(text); // Fallback to original text if correction fails
    }
  };
  

  // Save note to backend
  const handleSaveNote = async () => {
    console.log("corrected",correctedTranscript )
    // if (correctedTranscript) {
    //   try {
    //     const response = await axios.post("http://localhost:6001/api/notes", {
    //       title: `Note ${notes.length + 1}`,
    //       content: correctedTranscript,
    //     });
        setNotes([...notes, correctedTranscript]); // Assuming backend returns a 'note' object
    //     setTranscript(""); // Clear transcript after saving
    //     setCorrectedTranscript(""); // Clear corrected transcript after saving
    //     setIsRecordingDialogOpen(false); // Close recording dialog after saving
    //   } catch (error) {
    //     console.error("Error saving note:", error);
    //     // Handle error state or show user feedback
    //   }
    // }
  };

  // Fetch all notes from backend
  const fetchNotes = async () => {
    // try {
    //   const response = await axios.get("http://localhost:6001/api/notes");
    //   setNotes(response.data.notes);
    // } catch (error) {
    //   console.error("Error fetching notes:", error);
    // }
  };

  // Delete note from frontend and backend
  const handleDeleteNote = (index) => {
    setNoteToDelete(index);
    setOpenDialog(true);
  };

  // Confirm note deletion
  const confirmDeleteNote = async () => {
    try {
      await axios.delete(`http://localhost:6001/api/notes/${noteToDelete}`);
      const newNotes = notes.filter((_, i) => i !== noteToDelete);
      setNotes(newNotes);
      setOpenDialog(false);
      setNoteToDelete(null);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  // Close delete confirmation dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNoteToDelete(null);
  };

  // Fetch notes on component mount
  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgcolor="background.paper"
      p={3}
    >
      <Box textAlign="center" mb={3}>
        <Typography variant="h3">AudioPen</Typography>
        <Typography variant="h6" color="textSecondary">
          Go from fuzzy thought to clear text. Fast.
        </Typography>
      </Box>

      <Box mb={3} width="50%" boxShadow={3} p={3} borderRadius={2}>
        <Typography variant="h6" align="center">Saved Notes</Typography>
        <List>
          {notes.map((note, index) => (
            <ListItem
              key={index}
              divider
              sx={{ color: noteToDelete === index ? "gray" : "black" }}
            >
              <IconButton
                edge="start"
                onClick={() => handleDeleteNote(index)}
              >
                <RadioButtonUnchecked />
              </IconButton>
              <ListItemText primary={note.title} secondary={note.content} />
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
      </Box>

      <Box boxShadow={2} color={"gray"} padding={2} borderRadius={2}>
        <Typography variant="h6">{notes.length}/10 notes saved</Typography>
      </Box>

      <Box mb={3}>
        <IconButton color="primary" onClick={() => setIsRecordingDialogOpen(true)}>
          <Mic fontSize="large" />
        </IconButton>
      </Box>

      <Dialog open={isRecordingDialogOpen} onClose={() => setIsRecordingDialogOpen(false)}>
        <DialogTitle>Record Note</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" alignItems="center">
            <IconButton color={isRecord ? "secondary" : "primary"} onClick={handleToggleRecording}>
              {isRecord ? <MicOff fontSize="large" /> : <Mic fontSize="large" />}
            </IconButton>
            <Typography variant="body1" mt={2}>
              {correctedTranscript || transcript}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <MuiButton onClick={() => setIsRecordingDialogOpen(false)} color="primary">
            Cancel
          </MuiButton>
          <MuiButton onClick={handleSaveNote} color="primary">
            Save
          </MuiButton>
        </DialogActions>
      </Dialog>

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
    </Box>
  );
};

export default RecordingView;
