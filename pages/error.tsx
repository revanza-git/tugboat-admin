// pages/tugboat/admin/error.tsx
import { Box, Typography, Button } from "@mui/material";
import { useRouter } from "next/router";

export default function ErrorPage() {
  const router = useRouter();

  const handleBackToLogin = () => {
    router.push("/login");
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      flexDirection="column"
    >
      <Typography variant="h4" color="error">
        Authentication Error
      </Typography>
      <Typography variant="body1">
        There was an error with your authentication. Please try again.
      </Typography>
      <Button variant="contained" color="primary" onClick={handleBackToLogin}>
        Back to Login
      </Button>
    </Box>
  );
}
