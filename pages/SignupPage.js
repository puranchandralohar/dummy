import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Paper,
  Link,
  IconButton,
  TextField,
} from "@mui/material";
import GoogleLoginComponent from "@/components/GoogleLogin";
import { Google, Mic } from "@mui/icons-material";
import CheckIcon from "@mui/icons-material/Check";
import Image from "next/image";

export default function Home() {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  return (
    <Container sx={{ textAlign: "center" }}>
      <Box textAlign="center">
        <Typography variant="h4" color="#51A09B" fontWeight={200} mt={2} mb={5}>
          Oscar
        </Typography>
      </Box>
      <Box>
        <Typography variant="h1" component="h1" gutterBottom>
          Speech to Text - Voice Typing &
        </Typography>
        <Typography variant="h1" component="h1" gutterBottom>
          Transcription
        </Typography>
        <Typography variant="body1" textAlign={"center"} paddingInline={10}>
          Take notes with your voice for free, or automatically transcribe audio
          & video recordings. Secure,
        </Typography>
        <Typography variant="body1" textAlign={"center"}>
          accurate & blazing fast.
        </Typography>
        <Box>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2, paddingInline: 5 }}
            onClick={handleClickOpen}
          >
            <Image
              src="/images/Google Logo.png"
              alt="Get it on Google Play"
              width={20}
              height={20}
              style={{ borderRadius: "50%", marginInline: "10px" }}
            />
            Log in with Google
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 2,
            color: "white",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#CAE9EB",
              borderRadius: "50%",
              opacity: 0.5,
              p: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 5,
            }}
          >
            <Box
              sx={{
                backgroundColor: "#51A09B",
                borderRadius: "50%",
                p: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IconButton sx={{ color: "#fff" }}>
                <Mic sx={{ fontSize: "32px" }} />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box>
        <Typography variant="h5" mt={5} mb={-1}>
          How it works?
        </Typography>
        <Grid container spacing={4} mt={0.5}>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 2, textAlign: "center" }}>
              <img
                src="/images/Frame (1).png"
                alt="Speech to Text"
                style={{ maxWidth: "100%" }}
              />
              <Typography variant="h6" gutterBottom>
                Speech to Text
              </Typography>
              <Typography>
                Convert your speech to text quickly and accurately.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 2, textAlign: "center" }}>
              <img
                src="/images/Frame.png"
                alt="Fast & Accurate"
                style={{ maxWidth: "100%" }}
              />
              <Typography variant="h6" gutterBottom>
                Let AI Do It Simple
              </Typography>
              <Typography>
                Experience the speed and accuracy of our transcription services.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 2, textAlign: "center" }}>
              <img
                src="/images/Frame (2).png"
                alt="Download Text"
                style={{ maxWidth: "100%" }}
              />
              <Typography variant="h6" gutterBottom>
                Download Text
              </Typography>
              <Typography>
                Download the transcribed text in various formats.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          // width: { lg: "100vw" },
          position: "relative",
          // left: {lg: "-150px" },
          backgroundColor: "#B9D9D7",
          paddingInline: {lg: "100px" },
          marginInline: {lg: "-150px" },
        }}
      >
        <Box mt={5} p={4}>
          <Box display="flex" gap={4} flexWrap="wrap">
            {[...Array(4)].map((_, idx) => (
              <Box
                key={idx}
                width={{ xs: "100%", sm: "48%", md: "23%", lg: "48%" }}
                mt={2}
              >
                <Box display="flex" gap={0.2}>
                  <IconButton
                    style={{
                      backgroundColor: "#51A09B",
                      color: "#fff",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "30px",
                      height: "30px",
                      marginInline: "15px",
                    }}
                  >
                    <CheckIcon />
                  </IconButton>
                  <Typography variant="h5" textAlign="left">
                    Super Private & Secure
                  </Typography>
                </Box>
                <Typography variant="body1" paddingInline={2} textAlign="left">
                  You can download or save You can download or save You can
                  download or save You can download or save You can download or
                  save You can download or save
                </Typography>
              </Box>
            ))}
          </Box>
          <Box mt={5} textAlign="center">
            <Button
              variant="contained"
              color="primary"
              sx={{ paddingInline: { sm: 5, md: 5, lg: 10 } }}
            >
              Get Oscar Pro
            </Button>
          </Box>
        </Box>
      </Box>

      <Grid container spacing={6} mt={4}>
        <Grid item xs={12} md={6}>
          <Box>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              textAlign="left"
            >
              Contact us
            </Typography>
            <Typography variant="body1" gutterBottom>
              Fill out the form, and we'll get back to you as soon as possible.
              Please make sure to provide accurate contact information so we can
              reach you promptly.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              "& .MuiTextField-root": {
                backgroundColor: "#fff",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    border: "none",
                  },
                  "&:hover fieldset": {
                    border: "none",
                  },
                  "&.Mui-focused fieldset": {
                    border: "none",
                  },
                },
              },
            }}
          >
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField label="First Name" variant="outlined" fullWidth />
              <TextField label="Last Name" variant="outlined" fullWidth />
            </Box>
            <TextField label="Email" variant="outlined" fullWidth />
            <TextField
              label="Message"
              variant="outlined"
              fullWidth
              multiline
              rows={6}
            />
            <Button variant="contained" color="primary" type="submit">
              Send
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ padding: 4, textAlign: "center", mt: "20px" }}>
        <Grid container alignItems="center" justifyContent="center" spacing={1}>
          <Grid item>
            <Typography variant="h5" sx={{ marginRight: 2 }}>
              Download Oscar Mobile app from playstore
            </Typography>
          </Grid>
          <Grid item>
            <Button
              href="https://play.google.com/store/apps/details?id=com.example"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ padding: 0 }}
            >
              <Image
                src="/images/Store download button.png"
                alt="Get it on Google Play"
                width={200}
                height={60}
                style={{ width: "100%", height: "auto", maxWidth: "150px" }}
              />
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ width: "100%" }} pb={2}>
        <Box
          sx={{
            height: "1px",
            backgroundColor: "#4D4D4D",
            width: "100%",
            mb: 1,
          }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "30px",
            color: "#4D4D4D",
          }}
        >
          <Typography variant="body1" textAlign="center">
            privacy policy
          </Typography>
          <Typography variant="body1" textAlign="center">
            terms of use
          </Typography>
        </Box>
      </Box>
      <GoogleLoginComponent open={dialogOpen} onClose={handleClose} />
    </Container>
  );
}
