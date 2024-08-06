import { useState, useRef, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SaveIcon from "@mui/icons-material/Save";
import styles from "../styles/AAudio.module.css";
import ALoader from "./AudioLoader";
const { GoogleGenerativeAI } = require("@google/generative-ai");

const Audio = () => {
  const [isTransAvbl, setIsTransAvbl] = useState(true);
  const [notes, setNotes] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isRecord, setIsRecord] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [correctedTranscript, setCorrectedTranscript] = useState("");
  const [timer, setTimer] = useState(3 * 60); // 3 minutes in seconds
  const recognitionRef = useRef(null);
  const timerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);

  const openaiApiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

  const handleToggleRecordingDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setIsRecord(false);
    setTranscript("");
    setCorrectedTranscript("");
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    clearInterval(timerRef.current);
    setTimer(3 * 60); // Reset timer to 3 minutes
  };

  const handleStartRecording = () => {
    setIsRecord(true);
    recognitionRef.current = new window.webkitSpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = "en-US";

    let finalTranscript = "";

    recognitionRef.current.onresult = (event) => {
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalTranscript += result[0].transcript + " ";
        } else {
          interimTranscript += result[0].transcript + " ";
        }
      }
      setTranscript(finalTranscript + interimTranscript.trim());
    };

    recognitionRef.current.start();
    startTimer();
  };

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          handleStopRecording();
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleStopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecord(false);
      console.log("Recorded text:", transcript);
      setIsLoading(true);
      run(transcript);
    }
    clearInterval(timerRef.current);
    setTimer(3 * 60); // Reset timer to 3 minutes
  };

  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

  async function run(transcript) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Correct the following text for grammar, spelling, and clarity:\n\n"${transcript}"\n\n and return only the corrected text:`;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = await response.text();

      // Simulate a 5-second delay before setting the corrected text
      setTimeout(() => {
        setCorrectedTranscript(text);
        console.log("AI Corrected Text:", text);
        setIsLoading(false);
      }, 5000);
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
    }
  }

  const handleSaveNote = () => {
    setNotes([...notes, correctedTranscript]);
    setCorrectedTranscript("");
    setIsDialogOpen(false);
  };

  const handleDeleteNote = (index) => {
    setNoteToDelete(index);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteNote = () => {
    const updatedNotes = notes.filter((_, i) => i !== noteToDelete);
    setNotes(updatedNotes);
    if (updatedNotes.length === 0) {
      setIsTransAvbl(false);
    }
    setIsDeleteDialogOpen(false);
    setNoteToDelete(null);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setNoteToDelete(null);
  };

  useEffect(() => {
    if (isDialogOpen && !isRecord) {
      handleStartRecording();
    }
  }, [isDialogOpen]);

  return (
    <Container maxWidth="lg" className={styles.container}>
      <Box className={styles.box}>
        <Typography variant="h5" mb={2} color={"#4D4D4D"}>
          My Transcripts ({notes.length})
        </Typography>
        {!notes.length > 0 ? (
          <Box className={styles.transcriptBox}>
            <Typography variant="h3" align="center" color={"#4D4D4D"}>
              Start recording your first thoughts...
            </Typography>
          </Box>
        ) : (
          <Box className={styles.notesBox}>
            {notes.map((note, index) => (
              <Box key={index} className={styles.noteBox}>
                <Box className={styles.noteContent}>
                  <Typography variant="body1" className={styles.noteText}>
                    {note}
                  </Typography>
                </Box>
                <IconButton
                  className={styles.deleteIcon}
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDeleteNote(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
          </Box>
        )}
      </Box>
      <Box
        // className={`${styles.micContainer} ${isRecord ? styles.recording : ""}`}
        className={`${styles.micContainer}`}
      >
        <Box className={styles.outerCircle}>
          <Box className={styles.innerCircle}>
            <IconButton
              sx={{ color: "#fff" }}
              onClick={handleToggleRecordingDialog}
            >
              <MicIcon sx={{ fontSize: "32px" }} />
            </IconButton>
          </Box>
        </Box>
      </Box>

      <Dialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        sx={{
          "& .MuiPaper-root": { backgroundColor: "#99cac0" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <DialogTitle sx={{ color: "#fff" }}>Recording</DialogTitle>
        <DialogContent>
          {!correctedTranscript && (
            <>
              <Typography variant="h6" sx={{ color: "#fff" }}>
                {Math.floor(timer / 60)}:{("0" + (timer % 60)).slice(-2)}
              </Typography>
              <Typography variant="body1" sx={{ color: "#fff" }}>
                <Box
                  className={`${styles.micContainerdialog} ${
                    isRecord ? styles.recording : ""
                  }`}
                  marginInline={10}
                >
                  <Box
                    backgroundColor="hsl(189, 45%, 86%)"
                    borderRadius="50%"
                    padding="20px"
                  >
                    <Box
                      backgroundColor="#005555"
                      borderRadius="50%"
                      padding="5px"
                    >
                      <IconButton sx={{ color: "#fff" }}>
                        <MicIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              </Typography>
            </>
          )}
          {isLoading && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mt: 2,
              }}
            >
              {/* <CircularProgress sx={{ color: "#fff" }} /> */}
              <ALoader />
            </Box>
          )}
          {correctedTranscript && (
            <Typography variant="body1" sx={{ color: "#fff", mt: 2 }}>
              Corrected Text: {correctedTranscript}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <IconButton onClick={handleCloseDialog} color="secondary">
            <RestartAltIcon sx={{ color: "#fff" }} />
          </IconButton>
          {correctedTranscript ? (
            <Button
              onClick={handleSaveNote}
              color="primary"
              variant="contained"
              startIcon={<SaveIcon />}
            >
              Save
            </Button>
          ) : (
            <IconButton onClick={handleStopRecording} color="primary">
              <StopIcon sx={{ color: "#fff" }} />
            </IconButton>
          )}
        </DialogActions>
      </Dialog>
      <Dialog open={isDeleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this note?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={confirmDeleteNote}
            color="primary"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
export default Audio;
