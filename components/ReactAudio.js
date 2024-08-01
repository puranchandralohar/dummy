import React, { useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import useClipboard from "react-use-clipboard";
import {
  Button,
  Typography,
  Box,
  CssBaseline,
  TextField,
  Card,
  CardContent,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import jsPDF from "jspdf";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

const theme = createTheme({
  typography: {
    fontFamily: '"Work Sans", sans-serif',
  },
  palette: {
    primary: {
      main: "#11a683",
    },
    secondary: {
      main: "#ff4081",
    },
    text: {
      primary: "#60657b",
      secondary: "#333",
    },
    background: {
      default: "#ffffff",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "6px",
          padding: "16px 32px",
          fontSize: "18px",
          letterSpacing: "1px",
          margin: "auto",
          display: "flex",
          position: "relative",
          cursor: "pointer",
          "&:focus, &:hover": {
            background: "#2ac9a4",
            boxShadow: "0 5px 30px 0 rgba(0, 0, 0, 0.1)",
          },
        },
        containedPrimary: {
          backgroundColor: "#0070f3",
          "&:hover": {
            backgroundColor: "#005bb5",
          },
        },
        containedSecondary: {
          backgroundColor: "#ff4081",
          "&:hover": {
            backgroundColor: "#c60055",
          },
        },
        outlined: {
          borderColor: "#0070f3",
          color: "#0070f3",
          "&:hover": {
            borderColor: "#005bb5",
            color: "#005bb5",
          },
        },
      },
    },
  },
});

// Assume we get this user ID from your authentication system
const userId = "user-123";  // Replace with actual user ID from your auth system

const App = () => {
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const [textToCopy, setTextToCopy] = useState("");
  const [notes, setNotes] = useState([]);
  const [isCopied, setCopied] = useClipboard(textToCopy, { successDuration: 1000 });
  const [selectedNote, setSelectedNote] = useState(null);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [showNotesDialog, setShowNotesDialog] = useState(false);

  const startListening = () => SpeechRecognition.startListening({ continuous: true, language: "en-IN" });

  useEffect(() => {
    setTextToCopy(transcript);
  }, [transcript]);

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem(`${userId}-notes`)) || [];
    setNotes(storedNotes);
  }, []);

  const saveNotesToLocalStorage = (notes) => {
    localStorage.setItem(`${userId}-notes`, JSON.stringify(notes));
  };

  const handleStopListening = () => {
    SpeechRecognition.stopListening();
  };

  const handleDownloadPdf = () => {
    const doc = new jsPDF();
    doc.text(textToCopy, 10, 10);
    doc.save("note.pdf");
  };

  const handleSaveNote = () => {
    if (textToCopy.trim()) {
      const newNote = { text: textToCopy, id: Date.now() };
      const updatedNotes = [...notes, newNote];
      setNotes(updatedNotes);
      saveNotesToLocalStorage(updatedNotes);
      setTextToCopy("");
      resetTranscript();
    }
  };

  const handleEditNote = (id) => {
    const noteToEdit = notes.find((note) => note.id === id);
    setTextToCopy(noteToEdit.text);
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    saveNotesToLocalStorage(updatedNotes);
  };

  const handleDeleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    saveNotesToLocalStorage(updatedNotes);
  };

  const handleOpenNote = (note) => {
    setSelectedNote(note);
  };

  const handleCloseNote = () => {
    setSelectedNote(null);
  };

  const handleConfirmDelete = (id) => {
    setNoteToDelete(id);
  };

  const handleCancelDelete = () => {
    setNoteToDelete(null);
  };

  const handleConfirmDeleteNote = () => {
    if (noteToDelete !== null) {
      handleDeleteNote(noteToDelete);
      setNoteToDelete(null);
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return <p>Browser doesn't support speech recognition.</p>;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          padding: 3,
          marginInline: "20%",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            color: theme.palette.text.primary,
            textAlign: "center",
            fontSize: { xs: "28px", sm: "48px" },
            letterSpacing: "-0.2px",
            fontFamily: '"Merriweather", serif',
            marginBottom: 2,
          }}
        >
          Speech to Text Converter with
          <span style={{ marginLeft: "10px" }}>
            Oscar
          </span>
        </Typography>

        <Typography
          variant="body1"
          sx={{
            maxWidth: "50rem",
            textAlign: "center",
            marginTop: 2,
            marginBottom: { xs: "20px", sm: "40px" },
          }}
        >
          <span style={{ color: '#ff5c0a', marginRight: '10px', fontSize: "25px" }}>
            Oscar
          </span>
          converts speech from the microphone to text.
        </Typography>
        <TextField
          placeholder="Text to show"
          variant="outlined"
          fullWidth
          multiline
          minRows={2}
          value={transcript}
          onChange={(e) => setTextToCopy(e.target.value)}
          sx={{
            maxWidth: "50rem",
            marginTop: 2,
            backgroundColor: theme.palette.background.default,
            borderRadius: "16px",
          }}
        />

        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              color="secondary"
              onClick={startListening}
              fullWidth
            >
              Start Recording
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button variant="outlined" onClick={handleStopListening} fullWidth>
              Stop Recording
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              color="primary"
              onClick={setCopied}
              fullWidth
            >
              {isCopied ? "Copied!" : "Copy to clipboard"}
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleDownloadPdf}
              fullWidth
            >
              Download as PDF
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSaveNote}
              fullWidth
            >
              Save Note
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setShowNotesDialog(true)}
              fullWidth
            >
              Show Notes
            </Button>
          </Grid>
        </Grid>

        <Dialog
          open={showNotesDialog}
          onClose={() => setShowNotesDialog(false)}
          fullWidth
          maxWidth="md"
        >
          <DialogTitle>Notes</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              {notes.map((note) => (
                <Grid item xs={12} sm={6} md={4} key={note.id}>
                  <Card>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        {note.text.substring(0, 100)}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginTop: 2,
                        }}
                      >
                        <IconButton
                          color="primary"
                          onClick={() => handleOpenNote(note)}
                        >
                          <VisibilityIcon />
                        </IconButton>
                        <IconButton
                          color="primary"
                          onClick={() => handleEditNote(note.id)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="secondary"
                          onClick={() => handleConfirmDelete(note.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowNotesDialog(false)} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

        {selectedNote && (
          <Dialog open={!!selectedNote} onClose={handleCloseNote} fullWidth>
            <DialogTitle>Note Details</DialogTitle>
            <DialogContent>
              <Typography variant="body1">{selectedNote.text}</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseNote} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        )}

        {noteToDelete !== null && (
          <Dialog
            open={noteToDelete !== null}
            onClose={handleCancelDelete}
            fullWidth
          >
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
              <Typography variant="body1">
                Are you sure you want to delete this note?
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCancelDelete} color="primary">
                Cancel
              </Button>
              <Button onClick={handleConfirmDeleteNote} color="secondary">
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default App;













// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import SpeechRecognition, {
//   useSpeechRecognition,
// } from "react-speech-recognition";
// import useClipboard from "react-use-clipboard";
// import {
//   Button,
//   Typography,
//   Box,
//   CssBaseline,
//   TextField,
//   Card,
//   CardContent,
//   IconButton,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Grid,
// } from "@mui/material";
// import { ThemeProvider, createTheme } from "@mui/material/styles";
// import jsPDF from "jspdf";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import VisibilityIcon from "@mui/icons-material/Visibility";

// const theme = createTheme({
//   typography: {
//     fontFamily: '"Work Sans", sans-serif',
//   },
//   palette: {
//     primary: {
//       main: "#11a683",
//     },
//     secondary: {
//       main: "#ff4081",
//     },
//     text: {
//       primary: "#60657b",
//       secondary: "#333",
//     },
//     background: {
//       default: "#ffffff",
//     },
//   },
//   components: {
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           borderRadius: "6px",
//           padding: "16px 32px",
//           fontSize: "18px",
//           letterSpacing: "1px",
//           margin: "auto",
//           display: "flex",
//           position: "relative",
//           cursor: "pointer",
//           "&:focus, &:hover": {
//             background: "#2ac9a4",
//             boxShadow: "0 5px 30px 0 rgba(0, 0, 0, 0.1)",
//           },
//         },
//         containedPrimary: {
//           backgroundColor: "#0070f3",
//           "&:hover": {
//             backgroundColor: "#005bb5",
//           },
//         },
//         containedSecondary: {
//           backgroundColor: "#ff4081",
//           "&:hover": {
//             backgroundColor: "#c60055",
//           },
//         },
//         outlined: {
//           borderColor: "#0070f3",
//           color: "#0070f3",
//           "&:hover": {
//             borderColor: "#005bb5",
//             color: "#005bb5",
//           },
//         },
//       },
//     },
//   },
// });

// const App = () => {
//   const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
//     useSpeechRecognition();
//   const [textToCopy, setTextToCopy] = useState("");
//   const [notes, setNotes] = useState([]);
//   const [isCopied, setCopied] = useClipboard(textToCopy, {
//     successDuration: 1000,
//   });
//   const [selectedNote, setSelectedNote] = useState(null);
//   const [noteToDelete, setNoteToDelete] = useState(null);
//   const [showNotesDialog, setShowNotesDialog] = useState(false);

//   const startListening = () =>
//     SpeechRecognition.startListening({ continuous: true, language: "en-IN" });

//   useEffect(() => {
//     setTextToCopy(transcript);
//   }, [transcript]);

//   const handleStopListening = () => {
//     SpeechRecognition.stopListening();
//   };

//   const handleDownloadPdf = () => {
//     const doc = new jsPDF();
//     doc.text(textToCopy, 10, 10);
//     doc.save("note.pdf");
//   };

//   // const handleSaveNote = async () => {
//   //   if (textToCopy.trim()) {
//   //     try {
//   //       // Call OpenAI API to get heading
//   //       const response = await axios.post('/api/apiHandler', { text: textToCopy });
//   //       const heading = response.data.heading;
//   //       setNotes([...notes, { text: textToCopy, id: Date.now(), heading }]);
//   //       setTextToCopy("");
//   //       resetTranscript();
//   //     } catch (error) {
//   //       console.error("Error generating heading:", error); // Log the error
//   //     }
//   //   }
//   // };

//   const handleSaveNote = () => {
//     if (textToCopy.trim()) {
//       setNotes([...notes, { text: textToCopy, id: Date.now() }]);
//       setTextToCopy("");
//       resetTranscript();
//     }
//   };

//   const handleEditNote = (id) => {
//     const noteToEdit = notes.find((note) => note.id === id);
//     setTextToCopy(noteToEdit.text);
//     setNotes(notes.filter((note) => note.id !== id));
//   };

//   const handleDeleteNote = (id) => {
//     setNotes(notes.filter((note) => note.id !== id));
//   };

//   const handleOpenNote = (note) => {
//     setSelectedNote(note);
//   };

//   const handleCloseNote = () => {
//     setSelectedNote(null);
//   };

//   const handleConfirmDelete = (id) => {
//     setNoteToDelete(id);
//   };

//   const handleCancelDelete = () => {
//     setNoteToDelete(null);
//   };

//   const handleConfirmDeleteNote = () => {
//     if (noteToDelete !== null) {
//       handleDeleteNote(noteToDelete);
//       setNoteToDelete(null);
//     }
//   };

//   if (!browserSupportsSpeechRecognition) {
//     return <p>Browser doesn't support speech recognition.</p>;
//   }

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//           minHeight: "100vh",
//           padding: 3,
//           marginInline: "20%",
//         }}
//       >
//         <Typography
//           variant="h2"
//           sx={{
//             color: theme.palette.text.primary,
//             textAlign: "center",
//             fontSize: { xs: "28px", sm: "48px" },
//             letterSpacing: "-0.2px",
//             fontFamily: '"Merriweather", serif',
//             marginBottom: 2,
//           }}
//         >
//           Speech to Text Converter with
//           <span style={{ marginLeft: "10px" }}>Oscar</span>
//         </Typography>

//         <Typography
//           variant="body1"
//           sx={{
//             maxWidth: "50rem",
//             textAlign: "center",
//             marginTop: 2,
//             marginBottom: { xs: "20px", sm: "40px" },
//           }}
//         >
//           <span
//             style={{ color: "#ff5c0a", marginRight: "10px", fontSize: "25px" }}
//           >
//             Oscar
//           </span>
//           converts speech from the microphone to text.
//         </Typography>
//         <TextField
//           placeholder="Text to show"
//           variant="outlined"
//           fullWidth
//           multiline
//           minRows={2}
//           value={textToCopy}
//           onChange={(e) => setTextToCopy(e.target.value)}
//           sx={{
//             maxWidth: "50rem",
//             marginTop: 2,
//             backgroundColor: theme.palette.background.default,
//             borderRadius: "16px",
//           }}
//         />

//         <Grid container spacing={2} sx={{ marginTop: 2 }}>
//           <Grid item xs={12} sm={6}>
//             <Button
//               variant="contained"
//               color="secondary"
//               onClick={startListening}
//               fullWidth
//             >
//               Start Recording
//             </Button>
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <Button variant="outlined" onClick={handleStopListening} fullWidth>
//               Stop Recording
//             </Button>
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={setCopied}
//               fullWidth
//             >
//               {isCopied ? "Copied!" : "Copy to clipboard"}
//             </Button>
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleDownloadPdf}
//               fullWidth
//             >
//               Download as PDF
//             </Button>
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <Button
//               variant="contained"
//               color="secondary"
//               onClick={handleSaveNote}
//               fullWidth
//             >
//               Save Note
//             </Button>
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={() => setShowNotesDialog(true)}
//               fullWidth
//             >
//               Show Notes
//             </Button>
//           </Grid>
//         </Grid>

//         <Dialog
//           open={showNotesDialog}
//           onClose={() => setShowNotesDialog(false)}
//           fullWidth
//         >
//           <DialogTitle>Notes</DialogTitle>
//           <DialogContent>
//             {notes.map((note) => (
//               <Card key={note.id} sx={{ marginBottom: 2 }}>
//                 <CardContent>
//                   <Typography variant="h6">{note.heading}</Typography>
//                   <Typography variant="body2">{note.text}</Typography>
//                   <IconButton onClick={() => handleOpenNote(note)}>
//                     <VisibilityIcon />
//                   </IconButton>
//                   <IconButton onClick={() => handleEditNote(note.id)}>
//                     <EditIcon />
//                   </IconButton>
//                   <IconButton onClick={() => handleConfirmDelete(note.id)}>
//                     <DeleteIcon />
//                   </IconButton>
//                 </CardContent>
//               </Card>
//             ))}
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setShowNotesDialog(false)}>Close</Button>
//           </DialogActions>
//         </Dialog>

//         <Dialog
//           open={Boolean(selectedNote)}
//           onClose={handleCloseNote}
//           fullWidth
//         >
//           <DialogTitle>Note Details</DialogTitle>
//           <DialogContent>
//             {selectedNote && (
//               <>
//                 <Typography variant="h6">{selectedNote.heading}</Typography>
//                 <Typography variant="body2">{selectedNote.text}</Typography>
//               </>
//             )}
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleCloseNote}>Close</Button>
//           </DialogActions>
//         </Dialog>

//         <Dialog open={Boolean(noteToDelete)} onClose={handleCancelDelete}>
//           <DialogTitle>Confirm Delete</DialogTitle>
//           <DialogContent>
//             <Typography>Are you sure you want to delete this note?</Typography>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleCancelDelete}>Cancel</Button>
//             <Button onClick={handleConfirmDeleteNote} color="error">
//               Delete
//             </Button>
//           </DialogActions>
//         </Dialog>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default App;












// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import SpeechRecognition, {
//   useSpeechRecognition,
// } from "react-speech-recognition";
// import useClipboard from "react-use-clipboard";
// import {
//   Button,
//   Typography,
//   Box,
//   CssBaseline,
//   TextField,
//   Card,
//   CardContent,
//   IconButton,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Grid,
// } from "@mui/material";
// import { ThemeProvider, createTheme } from "@mui/material/styles";
// import jsPDF from "jspdf";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import VisibilityIcon from "@mui/icons-material/Visibility";

// const theme = createTheme({
//   typography: {
//     fontFamily: '"Work Sans", sans-serif',
//   },
//   palette: {
//     primary: {
//       main: "#11a683",
//     },
//     secondary: {
//       main: "#ff4081",
//     },
//     text: {
//       primary: "#60657b",
//       secondary: "#333",
//     },
//     background: {
//       default: "#ffffff",
//     },
//   },
//   components: {
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           borderRadius: "6px",
//           padding: "16px 32px",
//           fontSize: "18px",
//           letterSpacing: "1px",
//           margin: "auto",
//           display: "flex",
//           position: "relative",
//           cursor: "pointer",
//           "&:focus, &:hover": {
//             background: "#2ac9a4",
//             boxShadow: "0 5px 30px 0 rgba(0, 0, 0, 0.1)",
//           },
//         },
//         containedPrimary: {
//           backgroundColor: "#0070f3",
//           "&:hover": {
//             backgroundColor: "#005bb5",
//           },
//         },
//         containedSecondary: {
//           backgroundColor: "#ff4081",
//           "&:hover": {
//             backgroundColor: "#c60055",
//           },
//         },
//         outlined: {
//           borderColor: "#0070f3",
//           color: "#0070f3",
//           "&:hover": {
//             borderColor: "#005bb5",
//             color: "#005bb5",
//           },
//         },
//       },
//     },
//   },
// });

// const App = () => {
//   const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
//     useSpeechRecognition();
//   const [textToCopy, setTextToCopy] = useState("");
//   const [notes, setNotes] = useState([]);
//   const [isCopied, setCopied] = useClipboard(textToCopy, {
//     successDuration: 1000,
//   });
//   const [selectedNote, setSelectedNote] = useState(null);
//   const [noteToDelete, setNoteToDelete] = useState(null);
//   const [showNotesDialog, setShowNotesDialog] = useState(false);

//   const startListening = () =>
//     SpeechRecognition.startListening({ continuous: true, language: "en-IN" });

//   useEffect(() => {
//     setTextToCopy(transcript);
//   }, [transcript]);

//   const handleStopListening = () => {
//     SpeechRecognition.stopListening();
//   };

//   const handleDownloadPdf = () => {
//     const doc = new jsPDF();
//     doc.text(textToCopy, 10, 10);
//     doc.save("note.pdf");
//   };
//   const handleSaveNote = async () => {
//     console.log('hELLO')
//     if (text.trim()) {
//       try {
//         // Call API to get heading
//         const response = await axios.post("/api/generateHeading", { text });
//         const generatedHeading = response.data.heading;
//         setHeading(generatedHeading);
//         // Save the note logic here
//       } catch (error) {
//         console.error("Error generating heading:", error); // Log the error
//       }
//     }
//   };

//   const handleEditNote = (id) => {
//     const noteToEdit = notes.find((note) => note.id === id);
//     setTextToCopy(noteToEdit.text);
//     setNotes(notes.filter((note) => note.id !== id));
//   };

//   const handleDeleteNote = (id) => {
//     setNotes(notes.filter((note) => note.id !== id));
//   };

//   const handleOpenNote = (note) => {
//     setSelectedNote(note);
//   };

//   const handleCloseNote = () => {
//     setSelectedNote(null);
//   };

//   const handleConfirmDelete = (id) => {
//     setNoteToDelete(id);
//   };

//   const handleCancelDelete = () => {
//     setNoteToDelete(null);
//   };

//   const handleConfirmDeleteNote = () => {
//     if (noteToDelete !== null) {
//       handleDeleteNote(noteToDelete);
//       setNoteToDelete(null);
//     }
//   };

//   if (!browserSupportsSpeechRecognition) {
//     return <p>Browser doesn't support speech recognition.</p>;
//   }

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//           minHeight: "100vh",
//           padding: 3,
//           marginInline: "20%",
//         }}
//       >
//         <Typography
//           variant="h2"
//           sx={{
//             color: theme.palette.text.primary,
//             textAlign: "center",
//             fontSize: { xs: "28px", sm: "48px" },
//             letterSpacing: "-0.2px",
//             fontFamily: '"Merriweather", serif',
//             marginBottom: 2,
//           }}
//         >
//           Speech to Text Converter with
//           <span style={{ marginLeft: "10px" }}>Oscar</span>
//         </Typography>

//         <Typography
//           variant="body1"
//           sx={{
//             maxWidth: "50rem",
//             textAlign: "center",
//             marginTop: 2,
//             marginBottom: { xs: "20px", sm: "40px" },
//           }}
//         >
//           <span
//             style={{ color: "#ff5c0a", marginRight: "10px", fontSize: "25px" }}
//           >
//             Oscar
//           </span>
//           converts speech from the microphone to text.
//         </Typography>
//         <TextField
//           placeholder="Text to show"
//           variant="outlined"
//           fullWidth
//           multiline
//           minRows={2}
//           value={textToCopy}
//           onChange={(e) => setTextToCopy(e.target.value)}
//           sx={{
//             maxWidth: "50rem",
//             marginTop: 2,
//             backgroundColor: theme.palette.background.default,
//             borderRadius: "16px",
//           }}
//         />

//         <Grid container spacing={2} sx={{ marginTop: 2 }}>
//           <Grid item xs={12} sm={6}>
//             <Button
//               variant="contained"
//               color="secondary"
//               onClick={startListening}
//               fullWidth
//             >
//               Start Recording
//             </Button>
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <Button variant="outlined" onClick={handleStopListening} fullWidth>
//               Stop Recording
//             </Button>
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={setCopied}
//               fullWidth
//             >
//               {isCopied ? "Copied!" : "Copy to clipboard"}
//             </Button>
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleDownloadPdf}
//               fullWidth
//             >
//               Download as PDF
//             </Button>
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <Button
//               variant="contained"
//               color="secondary"
//               onClick={handleSaveNote}
//               fullWidth
//             >
//               Save Note
//             </Button>
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={() => setShowNotesDialog(true)}
//               fullWidth
//             >
//               Show Notes
//             </Button>
//           </Grid>
//         </Grid>

//         <Dialog
//           open={showNotesDialog}
//           onClose={() => setShowNotesDialog(false)}
//           fullWidth
//         >
//           <DialogTitle>Notes</DialogTitle>
//           <DialogContent>
//             {notes.map((note) => (
//               <Card key={note.id} sx={{ marginBottom: 2 }}>
//                 <CardContent>
//                   <Typography variant="h6">{note.heading}</Typography>
//                   <Typography variant="body2">{note.text}</Typography>
//                   <IconButton onClick={() => handleOpenNote(note)}>
//                     <VisibilityIcon />
//                   </IconButton>
//                   <IconButton onClick={() => handleEditNote(note.id)}>
//                     <EditIcon />
//                   </IconButton>
//                   <IconButton onClick={() => handleConfirmDelete(note.id)}>
//                     <DeleteIcon />
//                   </IconButton>
//                 </CardContent>
//               </Card>
//             ))}
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setShowNotesDialog(false)}>Close</Button>
//           </DialogActions>
//         </Dialog>

//         <Dialog
//           open={Boolean(selectedNote)}
//           onClose={handleCloseNote}
//           fullWidth
//         >
//           <DialogTitle>Note Details</DialogTitle>
//           <DialogContent>
//             {selectedNote && (
//               <>
//                 <Typography variant="h6">{selectedNote.heading}</Typography>
//                 <Typography variant="body2">{selectedNote.text}</Typography>
//               </>
//             )}
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleCloseNote}>Close</Button>
//           </DialogActions>
//         </Dialog>

//         <Dialog open={Boolean(noteToDelete)} onClose={handleCancelDelete}>
//           <DialogTitle>Confirm Delete</DialogTitle>
//           <DialogContent>
//             <Typography>Are you sure you want to delete this note?</Typography>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleCancelDelete}>Cancel</Button>
//             <Button onClick={handleConfirmDeleteNote} color="error">
//               Delete
//             </Button>
//           </DialogActions>
//         </Dialog>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default App;
