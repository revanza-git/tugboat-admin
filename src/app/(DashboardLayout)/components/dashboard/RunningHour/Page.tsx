"use client";
import {
  Stack,
  TextField,
  FormLabel,
  FormControl,
  Box,
  Button,
} from "@mui/material";
import BaseCard from "@/app/(DashboardLayout)/components/shared/BaseCard";
import { useState } from "react";

const Page = (id: any) => {
  const [formValues, setFormValues] = useState({
    me: "20",
    ae1: "2.5",
    ae2: "3.5",
    ae3: "2",
  });

  // Handle change in form fields
  const handleChange = (event: { target: { name: any; value: any } }) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    console.log(formValues);
    // Here you can handle your form submission logic
  };

  return (
    <form onSubmit={handleSubmit}>
      <BaseCard title="Bahan Bakar">
        <div>
          <Stack spacing={3} direction={{ xs: "column", sm: "row" }}>
            <Box flexGrow={1}>
              <FormControl variant="outlined" fullWidth>
                <FormLabel component="legend">M/E (Jam)</FormLabel>
                <TextField
                  id="me"
                  variant="outlined"
                  defaultValue={formValues.me}
                  onChange={handleChange}
                />
              </FormControl>
            </Box>

            <Box flexGrow={1}>
              <FormControl variant="outlined" fullWidth>
                <FormLabel component="legend">A/E No.1 (Jam)</FormLabel>
                <TextField
                  id="ae1"
                  variant="outlined"
                  defaultValue={formValues.ae1}
                  onChange={handleChange}
                />
              </FormControl>
            </Box>

            <Box flexGrow={1}>
              <FormControl variant="outlined" fullWidth>
                <FormLabel component="legend">A/E No.2 (Jam)</FormLabel>
                <TextField
                  id="ae2"
                  variant="outlined"
                  defaultValue={formValues.ae2}
                  onChange={handleChange}
                />
              </FormControl>
            </Box>
            <Box flexGrow={1}>
              <FormControl variant="outlined" fullWidth>
                <FormLabel component="legend">A/E No.3 (Jam)</FormLabel>
                <TextField
                  id="ae3"
                  variant="outlined"
                  defaultValue={formValues.ae3}
                  onChange={handleChange}
                />
              </FormControl>
            </Box>
          </Stack>
          <Box textAlign="right" mt={2}>
            <Button type="submit" variant="contained" color="primary">
              <span>Save</span>
            </Button>
          </Box>
        </div>
      </BaseCard>
    </form>
  );
};

export default Page;
