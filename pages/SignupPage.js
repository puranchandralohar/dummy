import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
} from "@mui/material";
import styles from "../styles/SignupPage.module.css";
import GoogleLoginComponent from "../components/GoogleLogin";
import Header from "../components/Header";
import Footer from "../components/Footer";

const SignupPage = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <Header />
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100vh",
          fontFamily: "Fraunces, Arial, sans-serif !important",
        }}
      >
        <Box mt={15} textAlign="center">
          <Typography variant="h1" fontSize={90}>
            Go from fuzzy thought
          </Typography>
          <Typography variant="h1" fontSize={90}>
            to clear text.
            <span style={{ color: "#FF5C0A", fontFamily: "cursive" }}>
              {" "}
              Fast.
            </span>
          </Typography>
          <Typography
            variant="h5"
            mt={4}
            fontFamily="DM Sans"
            fontWeight="bold"
          >
            AudioPen converts voice notes into text that's easy to read and
            ready to share.
          </Typography>
          <Typography
            variant="h5"
            fontWeight="lighter"
            paddingInline={32}
            mt={4}
          >
            Create meeting notes, memos, emails, articles and more. All you have
            to do is talk.
          </Typography>
          <Box mt={5}>
            <button className={styles.primaryButton} onClick={handleClickOpen}>
              sign up / log in
            </button>
          </Box>
        </Box>

        <GoogleLoginComponent open={dialogOpen} onClose={handleClose} />
      </Container>
      <Footer />
    </>
  );
};

export default SignupPage;
