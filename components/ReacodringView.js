import { useState, useRef, useEffect } from "react";
import {
  Typography,
  Box,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SaveIcon from "@mui/icons-material/Save";
import styles from "../styles/RecoardingView.module.css";
const { GoogleGenerativeAI } = require("@google/generative-ai");
import ReacodringLoader from "./RecoardingAnimation.jsx";
import ProcessingAnimation from "./ProcessingAnimation";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DownloadIcon from "@mui/icons-material/Download";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ShareIcon from "@mui/icons-material/Share";
import EditIcon from "@mui/icons-material/Edit";
import Image from "next/image";
import AudioHeader from "./AudioHeader";
import Tooltip from "@mui/material/Tooltip";

const ReacodringView = () => {
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
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const [tooltipTexts, setTooltipTexts] = useState({
    copy: "Copy to clipboard",
    share: "Share note",
    download: "Download note",
    delete: "Delete note",
    restart: "Restart recording",
  });

  const openaiApiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

  const handleToggleRecordingDialog = () => {
    setIsDialogOpen(true);
  };

  const handleKeepRecording = () => {
    setIsResetDialogOpen(false);
  };

  const handleCloseDialog = () => {
    setIsResetDialogOpen(true); // Open the reset confirmation dialog instead of closing the main dialog
  };

  const handleResetRecording = () => {
    setIsResetDialogOpen(false);
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

  const handleResetRecordingLast = () => {
    setIsRecord(false);
    setIsResetDialogOpen(false);
    setIsDialogOpen(false);
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
    const prompt = `Correct the following text for grammar, spelling, and clarity:\n\n"${transcript}"\n\n and return only the corrected text`;

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

  const saveTranscriptToAPI = async (transcript) => {
    try {
      const response = await fetch(
        "https://dev-oscar.merakilearn.org/api/v1/transcriptions/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("googleToken")}`,
          },
          body: JSON.stringify({ transcribedText: transcript }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save transcript to API");
      }

      const data = await response.json();
      console.log("Transcript saved:", data);
      return data; // Return the saved note
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };

  const fetchTranscriptions = async () => {
    try {
      const response = await fetch(
        "https://dev-oscar.merakilearn.org/api/v1/transcriptions",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("googleToken")}`, // Assuming you need to pass the API key in the Authorization header
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch transcriptions");
      }

      const data = await response.json();
      setNotes(data.data.map((item) => item));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchTranscriptions();
  }, []);

  const handleSaveNote = async () => {
    const savedNote = await saveTranscriptToAPI(correctedTranscript);
    if (savedNote) {
      setNotes((prevNotes) => [...prevNotes, savedNote]);
      fetchTranscriptions(); // Fetch the updated list of notes
    }
    setCorrectedTranscript("");
    setIsDialogOpen(false);
  };

  const handleDeleteNote = (id) => {
    setNoteToDelete({ id });
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteNote = async () => {
    try {
      const response = await fetch(
        `https://dev-oscar.merakilearn.org/api/v1/transcriptions/${noteToDelete.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("googleToken")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete note from API");
      }

      // Remove the deleted note from the notes state
      setNotes((prevNotes) =>
        prevNotes.filter((note) => note.id !== noteToDelete.id)
      );

      // If no notes are left, set isTransAvbl to false
      if (notes.length === 1) {
        setIsTransAvbl(false);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsDeleteDialogOpen(false);
      setNoteToDelete(null);
    }
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

  const handleTooltipChange = (key, newValue) => {
    setTooltipTexts((prev) => ({
      ...prev,
      [key]: newValue,
    }));
  };

  const handleDownloadNote = () => {
    handleTooltipChange("download", "Note downloaded");
    const element = document.createElement("a");
    const file = new Blob([correctedTranscript], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "transcript.txt";
    document.body.appendChild(element);
    element.click();
  };

  const handleCopyNote = () => {
    navigator.clipboard.writeText(correctedTranscript).then(() => {
      handleTooltipChange("copy", "Copied!");
    });
  };

  const handleShareNote = async () => {
    if (navigator.share && navigator.canShare) {
      try {
        await navigator.share({
          title: "Transcript Note",
          text: correctedTranscript,
          url: window.location.href,
        });
        // alert("Note shared successfully");
      } catch (error) {
        console.error("Error sharing note:", error);
      }
    } else {
      // Fallback for unsupported browsers
      navigator.clipboard.writeText(correctedTranscript).then(() => {
        handleTooltipChange(
          "share",
          "Text copied to clipboard! You can share."
        );
      });
    }
  };

  const handleEditNote = () => {
    // Enable editing mode or open an editor for the correctedTranscript
    // For example, you could set a state variable that makes the correctedTranscript editable
    // setIsEditing(true);
  };

  const handleDeleteCurrentNote = () => {
    // Delete the current note
    handleTooltipChange("delete", "Note deleted");
    setCorrectedTranscript("");
    setIsDialogOpen(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: notes.length > 0 ? "#fff" : "#EEF6F5",
      }}
    >
      <AudioHeader notes={notes} />
      <div maxWidth="lg" className={styles.container}>
        <Box className={styles.box}>
          <Typography variant="h5" mb={2} color={"#4D4D4D"}>
            My Transcripts ({notes.length})
          </Typography>
          {!notes.length > 0 ? (
            <Box className={styles.transcriptBox}>
              <Image
                src="/images/undraw_just_saying_re_kw9c 1.png"
                alt="Get it on Google Play"
                width={100}
                height={100}
              />
              <Typography variant="h6" align="center" color={"#4D4D4D"}>
                We are excited to see what your first transcription will be
              </Typography>
            </Box>
          ) : (
            <Box className={styles.notesBox}>
              {notes.map((note, index) => (
                <Box key={index} className={styles.noteBox}>
                  <Box className={styles.noteContent}>
                    <Typography variant="body1" className={styles.noteText}>
                      {note.transcribedText}
                    </Typography>
                  </Box>
                  <IconButton
                    className={styles.deleteIcon}
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteNote(note.id)}
                    sx={{ marginLeft: "80%" }}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                </Box>
              ))}
            </Box>
          )}
        </Box>
        <Box
          className={styles.micTextContainer}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: notes.length > 0 ? "fixed" : "static", // Adjust position
            bottom: notes.length > 0 ? "20px" : "auto", // Place at bottom if notes are available
            marginBottom: notes.length > 0 ? "0" : "20px", // Adjust margin bottom accordingly
          }}
        >
          <Box
            // className={`${styles.micContainer} ${
            //   isRecord ? styles.recording : ""
            // }`}
            className={`${styles.micContainer}`}
            style={{ marginBottom: "10px" }}
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

          <Typography fontWeight={700} fontSize="18px" zIndex={1000}>
            {notes.length > 0 ? (
              "Transcribe your thoughts in a click"
            ) : (
              <Typography fontWeight={400} align="center">
                Tap the mic to start
              </Typography>
            )}
          </Typography>
        </Box>
        <Dialog
          open={isDialogOpen}
          onClose={handleCloseDialog}
          sx={{
            "& .MuiPaper-root": {
              backgroundColor: "#99cac0",
              height: !isRecord ? "400px" : "auto",
            },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <DialogTitle sx={{ color: "#fff" }}>
            {/* {!correctedTranscript ? "Recording" : "Your transcript is ready !"} */}
            {!correctedTranscript
              ? isRecord
                ? "Recording.."
                : "Processing..."
              : "Your transcript is ready !"}
          </DialogTitle>
          <DialogContent>
            {!correctedTranscript && (
              <>
                <Typography variant="h6" sx={{ color: "#fff" }}>
                  {isRecord
                    ? `${Math.floor(timer / 60)}:${("0" + (timer % 60)).slice(
                        -2
                      )}`
                    : ""}

                  {/* {Math.floor(timer / 60)}:{("0" + (timer % 60)).slice(-2)} */}
                </Typography>
                <Typography variant="body1" sx={{ color: "#fff" }}>
                  {isRecord ? (
                    <ReacodringLoader />
                  ) : (
                    <ProcessingAnimation time={timer} />
                  )}
                </Typography>
              </>
            )}
            {correctedTranscript && (
              <Typography variant="body1" sx={{ color: "#fff", mt: 2 }}>
                {correctedTranscript}
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            {!correctedTranscript && (
              <IconButton onClick={handleCloseDialog} color="secondary">
                <RestartAltIcon sx={{ color: "#fff" }} />
              </IconButton>
            )}
            {correctedTranscript && (
              <>
                <Box
                  sx={{
                    display: "flex",
                    backgroundColor: "#fff",
                    borderRadius: "10px",
                  }}
                >
                  <Tooltip title={tooltipTexts.restart}>
                    <IconButton
                      onClick={handleResetRecordingLast}
                      color="secondary"
                    >
                      <RestartAltIcon sx={{ color: "#51A09B" }} />
                    </IconButton>
                  </Tooltip>
                  {/* <Tooltip title="Edit note">
                  <IconButton onClick={handleEditNote} color="primary">
                    <EditIcon sx={{ color: "#51A09B" }} />
                  </IconButton>
                  </Tooltip> */}
                  <Tooltip title={tooltipTexts.copy}>
                    <IconButton onClick={handleCopyNote} color="primary">
                      <ContentCopyIcon sx={{ color: "#51A09B" }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={tooltipTexts.share}>
                    <IconButton onClick={handleShareNote} color="primary">
                      <ShareIcon sx={{ color: "#51A09B" }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={tooltipTexts.download}>
                    <IconButton onClick={handleDownloadNote} color="primary">
                      <DownloadIcon sx={{ color: "#51A09B" }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={tooltipTexts.delete}>
                    <IconButton
                      onClick={handleDeleteCurrentNote}
                      color="primary"
                    >
                      <DeleteOutlineIcon sx={{ color: "#51A09B" }} />
                    </IconButton>
                  </Tooltip>
                </Box>
              </>
            )}

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
        <Dialog open={isResetDialogOpen} onClose={handleKeepRecording}>
          <DialogTitle sx={{ fontWeight: 700, mb: "0" }}>
            Reset the Recording
          </DialogTitle>
          <DialogContent mt={0}>
            <Typography fontWeight={400} fontFamily="Karla" fontSize="18px">
              Resetting the recording will erase the current audio note and{" "}
              <br />
              start a new one.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleResetRecording} sx={{ border: "1px solid" }}>
              Reset
            </Button>
            <Button onClick={handleKeepRecording} variant="contained">
              Keep Recording
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};
export default ReacodringView;
