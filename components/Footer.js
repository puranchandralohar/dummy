import React from "react";
import { useDispatch } from "react-redux";
import MicIcon from "@mui/icons-material/Mic";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import EditIcon from "@mui/icons-material/Edit";
import { Box } from "@mui/material";
import { toggleRecordingDialog } from "../redux/recordingSlice";

const Footer = () => {
  const dispatch = useDispatch();

  const handleUploadAudio = () => {
    dispatch(toggleRecordingDialog());
  };

  const handleEditNote = () => {
    console.log("Edit note clicked");
  };

  return (
    <footer
      style={{
        width: "100%",
        textAlign: "center",
        padding: "1rem",
        position: "sticky",
        bottom: 0,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <Tooltip title="Upload Audio">
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <IconButton
            aria-label="upload audio"
            onMouseEnter={() => console.log("Hover Upload Audio")}
          >
            <ArrowUpwardIcon
              style={{
                fontSize: 50,
                padding: "10px",
                backgroundColor: "gray",
                color: "#fff",
                borderRadius: "50%",
              }}
            />
          </IconButton>
        </Box>
      </Tooltip>
      <MicIcon
        onClick={handleUploadAudio}
        style={{
          backgroundColor: "#ff5c0a",
          color: "#fff",
          fontSize: 100,
          borderRadius: "50%",
          padding: "20px",
          cursor: "pointer",
        }}
      />
      <Tooltip title="Rewrite the Text Note">
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <IconButton
            aria-label="edit note"
            onMouseEnter={() => console.log("Hover Rewrite the Text Note")}
          >
            <EditIcon
              style={{
                fontSize: 50,
                padding: "10px",
                backgroundColor: "gray",
                color: "#fff",
                borderRadius: "50%",
              }}
            />
          </IconButton>
        </Box>
      </Tooltip>
    </footer>
  );
};

export default Footer;
