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
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
} from "@mui/material";
import { useState } from "react";

const Edit = (open: any, id: any) => {
  const [openDialog, setOpenDialog] = useState(false);
  setOpenDialog(open);
  const [formValues, setFormValues] = useState({
    id: id,
    waktuMulai: "",
    waktuSelesai: "",
    konsumsi: "",
    durasi: "",
    aktivitas: "",
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
    setOpenDialog(false);
  };
  return (
    <Dialog open={openDialog}>
      <form>
        <DialogTitle>Edit Report</DialogTitle>
        <DialogContent>
          <Box flexGrow={1}>
            <FormControl variant="outlined" fullWidth>
              <FormLabel component="legend">Waktu Mulai</FormLabel>
              <TextField
                id="waktuMulai"
                name="waktuMulai"
                type="date"
                variant="outlined"
                defaultValue=""
                onChange={handleChange}
              />
            </FormControl>
          </Box>

          <Box flexGrow={1}>
            <FormControl variant="outlined" fullWidth>
              <FormLabel component="legend">Waktu Selesai</FormLabel>
              <TextField
                id="waktuSelesai"
                name="waktuSelesai"
                type="date"
                variant="outlined"
                defaultValue=""
                onChange={handleChange}
              />
            </FormControl>
          </Box>

          <Box flexGrow={1}>
            <FormControl variant="outlined" fullWidth>
              <FormLabel component="legend">Konsumsi BBM</FormLabel>
              <TextField
                id="konsumsi"
                name="konsumsi"
                variant="outlined"
                defaultValue=""
                onChange={handleChange}
              />
            </FormControl>
          </Box>

          <Box flexGrow={1}>
            <FormControl variant="outlined" fullWidth>
              <FormLabel component="legend">Durasi</FormLabel>
              <TextField
                id="durasi"
                name="durasi"
                variant="outlined"
                defaultValue=""
                onChange={handleChange}
              />
            </FormControl>
          </Box>

          <Box flexGrow={1}>
            <FormControl variant="outlined" fullWidth>
              <FormLabel component="legend">aktivitas</FormLabel>
              <Select
                labelId="aktivitas"
                id="aktivitas"
                name="aktivitas"
                label="Nama Kapal"
                value=""
                onChange={handleChange}
              >
                <MenuItem value="standby">StandBy</MenuItem>
                <MenuItem value="dorong">Dorong/Tarik</MenuItem>
                <MenuItem value="sailing">Sailing</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => {
              setOpenDialog(false);
            }}
          >
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default Edit;
