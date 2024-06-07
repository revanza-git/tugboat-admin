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
    robLaporan: "21111",
    robHariKegiatan: "31111",
    pengisian: "41111",
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
                <FormLabel component="legend">ROB Laporan (Liter)</FormLabel>
                <TextField
                  id="robLaporan"
                  variant="outlined"
                  defaultValue={formValues.robLaporan}
                  onChange={handleChange}
                />
              </FormControl>
            </Box>

            <Box flexGrow={1}>
              <FormControl variant="outlined" fullWidth>
                <FormLabel component="legend">
                  ROB Hari Kegiatan (Liter)
                </FormLabel>
                <TextField
                  id="robHariKegiatan"
                  variant="outlined"
                  defaultValue={formValues.robHariKegiatan}
                  onChange={handleChange}
                />
              </FormControl>
            </Box>

            <Box flexGrow={1}>
              <FormControl variant="outlined" fullWidth>
                <FormLabel component="legend">Pengisian</FormLabel>
                <TextField
                  id="pengisian"
                  variant="outlined"
                  defaultValue={formValues.pengisian}
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
