import { Container, Typography, Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import { Mic } from "@mui/icons-material";
import styles from '../styles/AAudio.module.css';

const AAudio = () => {
  const transcript = true;
  const notes = [
    "This is the first note",
    "This is the second note",
    "This is the third note",
    "This is the fourth note",
    "This is the fifth note",
  ];

  return (
    <Container
      maxWidth="md"
      className={styles.container}
    >
      <Box className={styles.box}>
        <Typography variant="h5" mb={2}>
          My Transcripts ({notes.length})
        </Typography>
        {!transcript ? (
          <Box className={styles.transcriptBox}>
            <Typography variant="h3" align="center">
              Start recording your first thoughts...
            </Typography>
          </Box>
        ) : (
          <Box className={styles.notesBox}>
            {notes.map((note, index) => (
              <Box key={index} className={styles.noteBox}>
                <Typography variant="body1" noWrap>
                  {note}
                </Typography>
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
          </Box>
        )}
      </Box>
      <Box className={styles.micContainer}>
        <Box className={styles.outerCircle}>
          <Box className={styles.innerCircle}>
            <IconButton sx={{ color: "#fff" }}>
              <Mic sx={{ fontSize: "32px" }} />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default AAudio;

