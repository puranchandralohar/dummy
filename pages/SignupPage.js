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
} from "@mui/material";
import GoogleLoginComponent from "@/components/GoogleLogin";
import { Google, Mic } from "@mui/icons-material";
import CheckIcon from "@mui/icons-material/Check";

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
            sx={{ mt: 2 }}
            onClick={handleClickOpen}
          >
            <Google sx={{ marginRight: "2px" }} />
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
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKIAAACUCAMAAAAnDwKZAAAAZlBMVEX///9nZ2f29vY+Pj7Y2Nju7u6cnJzAwMBcXFz8/PwAAADm5uZNTU06OjrV1dWxsbG6urrKysre3t6kpKSOjo6UlJQbGxurq6tzc3N7e3uGhoYXFxdTU1MwMDBFRUVhYWEODg4kJCS9WBElAAAEBUlEQVR4nO2cjVbjKhCACfJTwgoMhJJEa+37v+RCkvaue+tqlUbrma+eGJuk+TIQCjkyhCAIgiAI8gNR7+Jr1KaFAWMYZ6a8MtOi/HFcKWhtAHi5GLK+K0uGSWtdYVqWdbvw5xowJ+lyWeuhCHVSPrbP24ftdvtwaM+xnXluD1EmvrYiIdaMbQ/MF5iPZwxHvwBD+yiTXtsQYNhB/s04QC5EeirX/8hx81xq74CY3bNLat048pSeTan/wXY9f20v2/PI0tNAidk2wqwpSIiE3VhqpKKU8/n2/muPcvvmTbnS8hxlIrZCrGpIrWs9easZUeS4iyK8HcSqtZG78fHV4j3PYR9WLWkOTUMvO+RuH9h1ZM7D5eYnKjYCFV+CijVAxRrcgKJ2qPh5ULEGqFiDG2h0bkHxmxd0Hoz4b65IPnq7wHVkzvMxRXkdmfP82Cii4ktuQPFjjc56iuqj3y5Y0C/57gVNbiKKqFiDG+h1o2INvrvih79dcHj1ElSsASrWABVrgIo1QMUaoGINULEGqFgDVKwBKtYAFWuAijVAxRqgYg1QsQaoWANUrAEq1gAVa4CKNUDFGqBiDVCxBqhYA1Sswc9TLHM+75qV5wHC/qIoqq+YqthvLizo3cpRpFYc9DRv9127l1QCbb9uXSRWtundhkVRtl13Ydw/CUv9A78gy4K+3wt7TaEzBLvdv39KNt8cRHfhhOpPw4Vt7xOn74Hb+0OXVv0Hy5IWhPhg92179/jrTZ7a9ikkt0qqkHKOEhSutTdgByfHX/e7+zfYPTXBdh0Y5rUuYZ9dr6I7fXQR9J4ZaYNomiABDMh/AUamYd8F6yZJzhfHK0X0FEZewuhsGPumGZp/0g/9KKyTpugtfleRO2NLF9k34Hwyo1+UsgZBEARBEARZC/Vy/ZXu3+u9wlX6i/50FjUlEFPkOALRfw1A5+RidE6WNtsdk46p3LmlJPdxa9tNNvNI2IOWczZFpbSbbZxcAqvm4WGBxpFDJCmCHykBoSLQGHUIPgmwoq+v6DsWOyt9/vDQgAs+2mRhD0noFKx1lJjO2M6EGPKl5LByb50fCPhgOq5tp6100qXItOCRmOrPJhQxggsdgxcOtDNNZzsV8hqzeugI3AFRo9IdHYKOUhKbB/Y6EjISlTSxvIOBaEmHDc/j79RIEq6QXY6LEHlnw+AiixCAZbGedRDyOBBSCFoHB6ONgUc3pTbQjdN6o8fo+SBBbnIglZM0H6qj8qL67aMIB66p54Zxk18eqFeGKZZHqzTXzjIQpKB93kl5PmWs1ACagQdgGkyuwhTyMZQaozT/3/31DTgNUdUfP/XPckqKenyaoJZzz43PsmVpkY5vLc2TOm0j89OSCwx/AxoSSeC4tZpeAAAAAElFTkSuQmCC"
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
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKIAAACUCAMAAAAnDwKZAAAAZlBMVEX///9nZ2f29vY+Pj7Y2Nju7u6cnJzAwMBcXFz8/PwAAADm5uZNTU06OjrV1dWxsbG6urrKysre3t6kpKSOjo6UlJQbGxurq6tzc3N7e3uGhoYXFxdTU1MwMDBFRUVhYWEODg4kJCS9WBElAAAEBUlEQVR4nO2cjVbjKhCACfJTwgoMhJJEa+37v+RCkvaue+tqlUbrma+eGJuk+TIQCjkyhCAIgiAI8gNR7+Jr1KaFAWMYZ6a8MtOi/HFcKWhtAHi5GLK+K0uGSWtdYVqWdbvw5xowJ+lyWeuhCHVSPrbP24ftdvtwaM+xnXluD1EmvrYiIdaMbQ/MF5iPZwxHvwBD+yiTXtsQYNhB/s04QC5EeirX/8hx81xq74CY3bNLat048pSeTan/wXY9f20v2/PI0tNAidk2wqwpSIiE3VhqpKKU8/n2/muPcvvmTbnS8hxlIrZCrGpIrWs9easZUeS4iyK8HcSqtZG78fHV4j3PYR9WLWkOTUMvO+RuH9h1ZM7D5eYnKjYCFV+CijVAxRrcgKJ2qPh5ULEGqFiDG2h0bkHxmxd0Hoz4b65IPnq7wHVkzvMxRXkdmfP82Cii4ktuQPFjjc56iuqj3y5Y0C/57gVNbiKKqFiDG+h1o2INvrvih79dcHj1ElSsASrWABVrgIo1QMUaoGINULEGqFgDVKwBKtYAFWuAijVAxRqgYg1QsQaoWANUrAEq1gAVa4CKNUDFGqBiDVCxBqhYA1Sswc9TLHM+75qV5wHC/qIoqq+YqthvLizo3cpRpFYc9DRv9127l1QCbb9uXSRWtundhkVRtl13Ydw/CUv9A78gy4K+3wt7TaEzBLvdv39KNt8cRHfhhOpPw4Vt7xOn74Hb+0OXVv0Hy5IWhPhg92179/jrTZ7a9ikkt0qqkHKOEhSutTdgByfHX/e7+zfYPTXBdh0Y5rUuYZ9dr6I7fXQR9J4ZaYNomiABDMh/AUamYd8F6yZJzhfHK0X0FEZewuhsGPumGZp/0g/9KKyTpugtfleRO2NLF9k34Hwyo1+UsgZBEARBEARZC/Vy/ZXu3+u9wlX6i/50FjUlEFPkOALRfw1A5+RidE6WNtsdk46p3LmlJPdxa9tNNvNI2IOWczZFpbSbbZxcAqvm4WGBxpFDJCmCHykBoSLQGHUIPgmwoq+v6DsWOyt9/vDQgAs+2mRhD0noFKx1lJjO2M6EGPKl5LByb50fCPhgOq5tp6100qXItOCRmOrPJhQxggsdgxcOtDNNZzsV8hqzeugI3AFRo9IdHYKOUhKbB/Y6EjISlTSxvIOBaEmHDc/j79RIEq6QXY6LEHlnw+AiixCAZbGedRDyOBBSCFoHB6ONgUc3pTbQjdN6o8fo+SBBbnIglZM0H6qj8qL67aMIB66p54Zxk18eqFeGKZZHqzTXzjIQpKB93kl5PmWs1ACagQdgGkyuwhTyMZQaozT/3/31DTgNUdUfP/XPckqKenyaoJZzz43PsmVpkY5vLc2TOm0j89OSCwx/AxoSSeC4tZpeAAAAAElFTkSuQmCC"
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
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKIAAACUCAMAAAAnDwKZAAAAZlBMVEX///9nZ2f29vY+Pj7Y2Nju7u6cnJzAwMBcXFz8/PwAAADm5uZNTU06OjrV1dWxsbG6urrKysre3t6kpKSOjo6UlJQbGxurq6tzc3N7e3uGhoYXFxdTU1MwMDBFRUVhYWEODg4kJCS9WBElAAAEBUlEQVR4nO2cjVbjKhCACfJTwgoMhJJEa+37v+RCkvaue+tqlUbrma+eGJuk+TIQCjkyhCAIgiAI8gNR7+Jr1KaFAWMYZ6a8MtOi/HFcKWhtAHi5GLK+K0uGSWtdYVqWdbvw5xowJ+lyWeuhCHVSPrbP24ftdvtwaM+xnXluD1EmvrYiIdaMbQ/MF5iPZwxHvwBD+yiTXtsQYNhB/s04QC5EeirX/8hx81xq74CY3bNLat048pSeTan/wXY9f20v2/PI0tNAidk2wqwpSIiE3VhqpKKU8/n2/muPcvvmTbnS8hxlIrZCrGpIrWs9easZUeS4iyK8HcSqtZG78fHV4j3PYR9WLWkOTUMvO+RuH9h1ZM7D5eYnKjYCFV+CijVAxRrcgKJ2qPh5ULEGqFiDG2h0bkHxmxd0Hoz4b65IPnq7wHVkzvMxRXkdmfP82Cii4ktuQPFjjc56iuqj3y5Y0C/57gVNbiKKqFiDG+h1o2INvrvih79dcHj1ElSsASrWABVrgIo1QMUaoGINULEGqFgDVKwBKtYAFWuAijVAxRqgYg1QsQaoWANUrAEq1gAVa4CKNUDFGqBiDVCxBqhYA1Sswc9TLHM+75qV5wHC/qIoqq+YqthvLizo3cpRpFYc9DRv9127l1QCbb9uXSRWtundhkVRtl13Ydw/CUv9A78gy4K+3wt7TaEzBLvdv39KNt8cRHfhhOpPw4Vt7xOn74Hb+0OXVv0Hy5IWhPhg92179/jrTZ7a9ikkt0qqkHKOEhSutTdgByfHX/e7+zfYPTXBdh0Y5rUuYZ9dr6I7fXQR9J4ZaYNomiABDMh/AUamYd8F6yZJzhfHK0X0FEZewuhsGPumGZp/0g/9KKyTpugtfleRO2NLF9k34Hwyo1+UsgZBEARBEARZC/Vy/ZXu3+u9wlX6i/50FjUlEFPkOALRfw1A5+RidE6WNtsdk46p3LmlJPdxa9tNNvNI2IOWczZFpbSbbZxcAqvm4WGBxpFDJCmCHykBoSLQGHUIPgmwoq+v6DsWOyt9/vDQgAs+2mRhD0noFKx1lJjO2M6EGPKl5LByb50fCPhgOq5tp6100qXItOCRmOrPJhQxggsdgxcOtDNNZzsV8hqzeugI3AFRo9IdHYKOUhKbB/Y6EjISlTSxvIOBaEmHDc/j79RIEq6QXY6LEHlnw+AiixCAZbGedRDyOBBSCFoHB6ONgUc3pTbQjdN6o8fo+SBBbnIglZM0H6qj8qL67aMIB66p54Zxk18eqFeGKZZHqzTXzjIQpKB93kl5PmWs1ACagQdgGkyuwhTyMZQaozT/3/31DTgNUdUfP/XPckqKenyaoJZzz43PsmVpkY5vLc2TOm0j89OSCwx/AxoSSeC4tZpeAAAAAElFTkSuQmCC"
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
      <Box>
        <Box mt={5}>
          <Box display="flex" gap={4} flexWrap="wrap">
            {[...Array(4)].map((_, idx) => (
              <Box key={idx} width="48%" mt={2}>
                <Box display="flex" gap={0.2}>
                  <IconButton
                    style={{
                      backgroundColor: "#51A09B",
                      color: "#fff",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize:"2px",
                      padding:"5px"
            
                    }}
                  >
                    <CheckIcon/>
                  </IconButton>

                  <Typography variant="h5" textAlign="left">
                    Super Private & Secure
                  </Typography>
                </Box>
                <Typography variant="body1" paddingInline={2} textAlign="left">
                  You can downlaod or save You can downlaod or save You can
                  downlaod or save You can downlaod or save You can downlaod or
                  save You can downlaod or save
                </Typography>
              </Box>
            ))}
          </Box>
          <Box mt={5} textAlign="center" fullWidth>
            <Button variant="contained" color="primary">
              Get Oscar Pro
            </Button>
          </Box>
        </Box>
      </Box>
      <GoogleLoginComponent open={dialogOpen} onClose={handleClose} />
    </Container>
  );
}
