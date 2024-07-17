import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import styles from "../styles/SignupPage.module.css"; // Assuming you have a separate CSS file for styling
import { jwtDecode } from "jwt-decode";

const GoogleLoginComponent = ({ open, onClose }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  const onSignIn = async (credentialResponse) => {
    const token = credentialResponse.credential;
    const decoded = jwtDecode(token);
    console.log(decoded);
    // Store necessary details in local storage
    localStorage.setItem("googleToken", token);
    localStorage.setItem("googleUser", JSON.stringify(decoded));
    router.push("/dashboard");

  };

  const onGoogleLoginFail = (errorResponse) => {
    console.error("Google login failed:", errorResponse);
    setLoading(false);
  };

  const handleEmailLogin = () => {
    console.log("Email login clicked");
    // Implement your email login functionality here
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{ className: styles.dialogPaper }}
    >
      <DialogTitle className={styles.dialogTitle}>
        <Typography variant="h4">Sign Up / Log In</Typography>
      </DialogTitle>
      <DialogContent>
        <Box mt={4}>
          <GoogleLogin
            onSuccess={onSignIn}
            onError={onGoogleLoginFail}
            useOneTap
            render={(renderProps) => (
              <Button
                variant="contained"
                onClick={renderProps.onClick}
                style={{
                  backgroundColor: "#ff5c0a",
                  color: "#fff",
                  fontFamily: "cursive",
                  border: "none",
                  fontSize: "18px",
                  padding: "15px",
                  borderRadius: "50px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  margin: "10px 0",
                  transition: "box-shadow 0.3s ease",
                }}
              >
                Log In with Google
              </Button>
            )}
          />
        </Box>
        <Box mt={2}>
          <button className={styles.secondaryButton} onClick={handleEmailLogin}>
            Or sign up / log in with email
          </button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default GoogleLoginComponent;
