"use client";
import {
  Stack,
  TextField,
  FormLabel,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
  Box,
  Button,
} from "@mui/material";
import BaseCard from "@/app/(DashboardLayout)/components/shared/BaseCard";
import { useState } from "react";

const Page = (id: any) => {
  const [formValues, setFormValues] = useState({
    nameDetail: "Revan",
    dateDetail: new Date().toISOString().slice(0, 10),
    kapalSelectDetail: "4201",
    posisiDetail: "NR",
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
      <BaseCard title="Data Kapal">
        <div>
          <Stack spacing={3} direction={{ xs: "column", sm: "row" }}>
            <Box flexGrow={1}>
              <FormControl variant="outlined" fullWidth>
                <FormLabel component="legend">Nama Lengkap</FormLabel>
                <TextField
                  id="nameDetail"
                  name="nameDetail"
                  variant="outlined"
                  defaultValue={formValues.nameDetail}
                  onChange={handleChange}
                />
              </FormControl>
            </Box>

            <Box flexGrow={1}>
              <FormControl variant="outlined" fullWidth>
                <FormLabel component="legend">Tanggal Kegiatan</FormLabel>
                <TextField
                  id="dateDetail"
                  name="dateDetail"
                  type="date"
                  variant="outlined"
                  defaultValue={formValues.dateDetail}
                  onChange={handleChange}
                />
              </FormControl>
            </Box>

            <Box flexGrow={1}>
              <FormControl variant="outlined" fullWidth>
                <FormLabel component="legend">Nama Kapal</FormLabel>
                <Select
                  labelId="kapalSelectDetail"
                  id="kapalSelectDetail"
                  name="kapalSelectDetail"
                  value={formValues.kapalSelectDetail}
                  onChange={handleChange}
                  label="Nama Kapal"
                >
                  <MenuItem value="4201">Patra Tunda 4201</MenuItem>
                  <MenuItem value="4202">Patra Tunda 4202</MenuItem>
                  <MenuItem value="aqua">Aqua Harbor</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box flexGrow={1}>
              <FormControl variant="outlined" fullWidth>
                <FormLabel component="legend">Posisi</FormLabel>
                <TextField
                  id="posisiDetail"
                  name="posisiDetail"
                  variant="outlined"
                  defaultValue={formValues.posisiDetail}
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
