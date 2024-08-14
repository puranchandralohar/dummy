import React, { useState } from "react";
import { Typography, Container, Button, Grid,Box} from "@mui/material";
import Image from "next/image";
import GoogleLoginComponent from "@/components/GoogleLogin";

const LoginSection = () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const handleClickOpen = () => {
        setDialogOpen(true);
      };
    
      const handleClose = () => {
        setDialogOpen(false);
      };
  return (
    <Container maxWidth="lg" sx={{pt:2}}>
      <Typography variant="h4" align="center" fontWeight={700} gutterBottom>
        Speech to Text - Voice Typing & Transcription
      </Typography>
      <Box>
      <Typography variant="body1" align="center" fontWeight={700}>
        Take notes with your voice for free, or automatically transcribe audio &
      </Typography>
      <Typography variant="body1" align="center" fontWeight={700}>
        video recordings. Secure, accurate & blazing fast.
      </Typography>
      </Box>
      <Grid container justifyContent="center" sx={{ my: 4}}>
          <Button
            variant="contained"
            color="primary"
            sx={{paddingInline: 5 }}
            onClick={handleClickOpen}
          >
            <Image
              src="/images/Google Logo.png"
              alt="Get it on Google Play"
              width={20}
              height={20}
              style={{ borderRadius: "50%", marginInline: "10px"}}
            />
            Log in with Google
          </Button>
      </Grid>
      <GoogleLoginComponent open={dialogOpen} onClose={handleClose} />
    </Container>
  );
};

export default LoginSection;









// import React, { useCallback } from "react";
// import { Typography, Container, Grid, Box, Button } from "@mui/material";
// import Image from "next/image";
// import { useGoogleLogin } from "@react-oauth/google";
// import { useRouter } from "next/router";
// import axios from "axios";

// const HeroSection = () => {
//   const router = useRouter();

//   const onLoginSuccess = useCallback(async (response) => {
//     console.log(response)
//     try {
//       const idToken = response.code;
//       console.log("ID Token:", idToken); // Log the token
//       const apiResponse = await axios.post(
//         "https://dev-oscar.merakilearn.org/api/v1/auth/login/google",
//         { idToken }
//       );
//       localStorage.setItem("googleToken", apiResponse.data.data.token);
//       localStorage.setItem("googleUser", JSON.stringify(apiResponse.data.data));
//       router.push("/Audio");
//     } catch (error) {
//       console.error("Error during API call:", error);
//     }
//   }, [router]);

//   const onLoginError = (error) => {
//     console.error("Google login failed:", error);
//   };

//   const login = useGoogleLogin({
//     onSuccess: onLoginSuccess,
//     onError: onLoginError,
//      flow: 'auth-code'
//   });

//   return (
//     <Container maxWidth="lg" sx={{ pt: 2 }}>
//       <Typography variant="h4" align="center" fontWeight={700} gutterBottom>
//         Speech to Text - Voice Typing & Transcription
//       </Typography>
//       <Box>
//         <Typography variant="body1" align="center" fontWeight={700}>
//           Take notes with your voice for free, or automatically transcribe audio &
//         </Typography>
//         <Typography variant="body1" align="center" fontWeight={700}>
//           video recordings. Secure, accurate & blazing fast.
//         </Typography>
//       </Box>
//       <Grid container justifyContent="center" sx={{ my: 4 }}>
//         <Button
//           variant="contained"
//           color="primary"
//           sx={{ paddingInline: 5, display: "flex", alignItems: "center" }}
//           onClick={() => login()}
//         >
//           <Image
//             src="/images/Google Logo.png"
//             alt="Google Logo"
//             width={20}
//             height={20}
//             style={{ borderRadius: "50%", marginInline: "10px" }}
//           />
//           Log in with Google
//         </Button>
//       </Grid>
//     </Container>
//   );
// };

// export default HeroSection;
