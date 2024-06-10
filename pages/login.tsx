import {
  Box,
  Button,
  Card,
  Grid,
  TextField,
  Typography,
  styled,
} from "@mui/material";

import { useEffect, useRef, useState } from "react";
import { signIn } from "next-auth/react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const passwordFieldRef = useRef<HTMLInputElement>(null);
  const [buttonWidth, setButtonWidth] = useState<number | undefined>(undefined);

  const StyledCard = styled(Card)({
    boxShadow: "none",
    paddingTop: "3rem",
    paddingBottom: "3rem",
    borderRadius: "20px",
    "@media (max-width:600px)": {
      // Move the card up in mobile view
      marginLeft: "20px",
      marginRight: "20px",
    },
  });

  const StyledImg = styled("img")({
    position: "absolute",
    top: "40px",
    left: "40px",
    width: "200px",
    "@media (max-width:600px)": {
      width: "300px", // Increase the size of the logo in mobile view
      top: "50px",
      left: "50%",
      transform: "translateX(-50%)", // Center the logo
    },
  });

  useEffect(() => {
    if (passwordFieldRef.current) {
      setButtonWidth(passwordFieldRef.current.offsetWidth);
    }
    document.body.style.overflow = "hidden";
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    return () => {
      document.body.style.overflow = "unset";
      document.body.style.margin = "";
      document.body.style.padding = "";
    };
  }, []);
  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    signIn("credentials", { username, password })
      .then((result) => {
        if (result && result.error) {
          console.log(`Failed to sign in: ${result.error}`);
        } else {
          console.log("Successfully signed in");
        }
      })
      .catch((error) => {
        console.log(`An error occurred: ${error.message}`);
      });
  };

  return (
    <Grid
      container
      justifyContent="flex-end"
      alignItems="center"
      style={{
        height: "100vh",
        backgroundImage: "url('/images/backgrounds/nr-bg.png')",
        backgroundRepeat: "no-repeat",
      }}
    >
      <StyledImg src="/images/logos/nr-logo.png" alt="Logo" />

      <Grid item xs={12} sm={8} md={6} lg={4}>
        <StyledCard>
          <form onSubmit={handleSubmit}>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Typography
                variant="h4"
                style={{
                  color: "black",
                  marginBottom: "2rem",
                  fontWeight: "bold",
                }}
              >
                Selamat Datang!
              </Typography>
              <TextField
                label="Username"
                type="text"
                margin="normal"
                variant="outlined"
                InputProps={{
                  style: {
                    borderRadius: 20,
                    boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .3)",
                  },
                }}
              />
              <TextField
                label="Password"
                type="password"
                margin="normal"
                variant="outlined"
                ref={passwordFieldRef}
                InputProps={{
                  style: {
                    borderRadius: 20,
                    boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .3)",
                  },
                }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                style={{
                  marginTop: "5rem",
                  backgroundColor: "black",
                  color: "white",
                  width: buttonWidth,
                  borderRadius: 20,
                  boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .3)",
                }}
              >
                Log in
              </Button>
            </Box>
          </form>
        </StyledCard>
      </Grid>
    </Grid>
  );
}
