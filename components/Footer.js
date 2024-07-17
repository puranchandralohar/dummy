import React from "react";
import { useDispatch } from "react-redux";
import MicIcon from "@mui/icons-material/Mic";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { toggleRecordingDialog } from "../redux/recordingSlice";

const FooterContainer = styled("footer")({
  width: "100%",
  backgroundColor: "#f8f8f8",
  textAlign: "center",
  padding: "1rem",
  position: "sticky",
  bottom: 0,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  zIndex: 1000,
});

const HoverContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  "&:hover .hover-text": {
    display: "block",
  },
});

const Footer = () => {
  const dispatch = useDispatch();

  const handleUploadAudio = () => {
    dispatch(toggleRecordingDialog());
  };

  const handleEditNote = () => {
    console.log("Edit note clicked");
  };

  return (
    <FooterContainer sx={{ backgroundColor: "transparent", boxShadow: "none" }}>
      <Tooltip title="Upload Audio">
        <HoverContainer>
          <IconButton
            aria-label="upload audio"
            onMouseEnter={() => console.log("Hover Upload Audio")}
          >
            <ArrowUpwardIcon
              sx={{
                fontSize: 50,
                padding: "10px",
                backgroundColor: "gray",
                color: "#fff",
                borderRadius: "50%",
              }}
            />
          </IconButton>
        </HoverContainer>
      </Tooltip>
      <MicIcon
        onClick={handleUploadAudio}
        sx={{
          backgroundColor: "#ff5c0a",
          color: "#fff",
          fontSize: 100,
          borderRadius: "50%",
          padding: "20px",
        }}
      />
      <Tooltip title="Rewrite the Text Note">
        <HoverContainer>
          <IconButton
            aria-label="edit note"
            onMouseEnter={() => console.log("Hover Rewrite the Text Note")}
          >
            <EditIcon
              sx={{
                fontSize: 50,
                padding: "10px",
                backgroundColor: "gray",
                color: "#fff",
                borderRadius: "50%",
              }}
            />
          </IconButton>
        </HoverContainer>
      </Tooltip>
    </FooterContainer>
  );
};

export default Footer;
