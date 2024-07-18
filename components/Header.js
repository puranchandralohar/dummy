import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Box, Typography, Dialog, DialogTitle, Button } from "@mui/material";
import GoogleLoginComponent from "./GoogleLogin";
import theme from "@/styles/theme";

const Header = () => {
  const [openAccountDialog, setOpenAccountDialog] = useState(false);
  const [openSignupDialog, setOpenSignupDialog] = useState(false);

  const handleAccountClick = () => {
    setOpenAccountDialog(true);
  };

  const handleCloseAccountDialog = () => {
    setOpenAccountDialog(false);
  };

  const handleSignInClick = () => {
    setOpenAccountDialog(false);
    setOpenSignupDialog(true);
  };

  const handleCloseSignupDialog = () => {
    setOpenSignupDialog(false);
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{ backgroundColor: "transparent", boxShadow: "none" }}
      >
        <Toolbar>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              "&:hover .hover-text": {
                display: "block",
              },
            }}
            onClick={handleAccountClick}
          >
            <IconButton edge="start" color="inherit" aria-label="profile">
              <AccountCircleIcon sx={{ fontSize: 50 }} />
            </IconButton>
            <Typography
              className="hover-text"
              sx={{
                display: "none",
                color: "gray",
                marginLeft: "8px",
                marginRight: "8px",
              }}
            >
              Account
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              "&:hover .hover-text": {
                display: "block",
              },
            }}
          >
            <Typography
              className="hover-text"
              sx={{
                display: "none",
                color: "gray",
                marginLeft: "8px",
                marginRight: "8px",
              }}
            >
              Settings
            </Typography>
            <IconButton edge="end" color="inherit" aria-label="settings">
              <SettingsIcon sx={{ fontSize: 50 }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Account Dialog */}
      <Dialog
        open={openAccountDialog}
        onClose={handleCloseAccountDialog}
        PaperProps={{
          sx: {
            width: "600px",
            maxWidth: "80%",
            borderRadius: "12px",
            padding: theme.spacing(4),
            backgroundColor: "#f7f0f0",
          },
        }}
      >
        <DialogTitle sx={{ textAlign: "center", fontSize: "32px" }}>
          Account
        </DialogTitle>
        <Box borderBottom="10px solid #FF5C0A" marginInline={28} borderRadius={2} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 3,
            borderRadius: "20px",
          }}
        >
          <Typography variant="body1" color="textSecondary" align="center">
            You aren't currently signed in.
          </Typography>
          <Button
            onClick={handleSignInClick}
            variant="contained"
            sx={{
              backgroundColor: "#ff5c0a",
              color: "#fff",
              borderRadius: "25px",
              padding: "12px 24px",
              marginTop: "16px",
            }}
          >
            Sign in
          </Button>
        </Box>
      </Dialog>

      {/* Signup Dialog */}
      <Dialog
        open={openSignupDialog}
        onClose={handleCloseSignupDialog}
        PaperProps={{ className: "signup-dialog" }}
      >
        <GoogleLoginComponent
          open={openSignupDialog}
          onClose={handleCloseSignupDialog}
        />
      </Dialog>
    </>
  );
};

export default Header;
