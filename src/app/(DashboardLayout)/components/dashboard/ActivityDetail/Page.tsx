// Page.tsx
import React, { useState } from "react";
import {
  Snackbar,
  Alert,
  AlertColor,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  FormLabel,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import BaseCard from "../../shared/DashboardCard";
import ReportTable from "./ReportTable";
import { useReportData } from "./useReportData";
import { addActivityDetail } from "./api";

const Page = ({ id }: { id: string }) => {
  const {
    report,
    loading: isLoading,
    error,
    updateReportData: updateReport,
    handleDeleteDetailActivity,
  } = useReportData(id);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] =
    useState<AlertColor>("success");
  const [openDialog, setOpenDialog] = useState(false);
  // Step 1: Define the state for form data
  const [formData, setFormData] = useState({
    idShipActivity: id,
    startTime: "",
    finishTime: "",
    fuelConsumption: "",
    duration: "",
    note: "standby",
  });
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  // Add to the existing state definitions
  const [formError, setFormError] = useState(false);

  // Step 2: Update handleChangeDetail function
  const handleChangeDetail = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleUpdateSuccess = () => {
    setSnackbarMessage("Successfully updated the activity detail");
    setSnackbarSeverity("success");
    setOpenSnackbar(true);
  };

  const handleUpdateError = (error: unknown) => {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    setSnackbarMessage(`Failed to update the activity detail: ${errorMessage}`);
    setSnackbarSeverity("error");
    setOpenSnackbar(true);
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
    setFormError(false); // Reset error state
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleAddActivityDetail = async () => {
    // Check if all fields are filled
    const isFormComplete = Object.values(formData).every(
      (value) => value.trim() !== ""
    );
    if (!isFormComplete) {
      setFormError(true); // Set error state to true
      return; // Prevent further execution
    }
    try {
      const response = await addActivityDetail(formData);
      if (response.ok) {
        handleUpdateSuccess(); // Call this function if the addition is successful
        setRefreshTrigger((prev) => prev + 1); // Increment the trigger
      } else {
        throw new Error("Failed to add activity detail. Please try again.");
      }
    } catch (error) {
      handleUpdateError(error); // Use the existing error handling function
    } finally {
      handleDialogClose(); // Close the dialog in both success and error cases
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <BaseCard title="Detail Kegiatan">
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-start",
            paddingBottom: "1rem",
          }}
        >
          <Button
            variant="contained"
            onClick={handleDialogOpen}
            style={{ alignSelf: "flex-start" }}
          >
            Add New
          </Button>
        </div>
        <ReportTable
          idShipActivity={id}
          report={report}
          updateReport={updateReport}
          onUpdateSuccess={handleUpdateSuccess}
          onUpdateError={handleUpdateError}
          onDeleteDetailActivity={handleDeleteDetailActivity}
          refreshTrigger={refreshTrigger} // Pass the trigger as a prop
        />
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={() => setOpenSnackbar(false)}
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
        <Dialog open={openDialog} onClose={handleDialogClose}>
          <DialogTitle>Tambah Data</DialogTitle>
          <DialogContent>
            <FormControl variant="outlined" fullWidth margin="normal">
              <FormLabel>Waktu Mulai</FormLabel>
              <TextField
                name="startTime"
                type="time"
                onChange={handleChangeDetail}
                InputLabelProps={{ shrink: true }}
                error={formError && !formData.startTime}
                helperText={
                  formError && !formData.startTime
                    ? "This field is required"
                    : ""
                }
              />
            </FormControl>
            <FormControl variant="outlined" fullWidth margin="normal">
              <FormLabel>Waktu Selesai</FormLabel>
              <TextField
                name="finishTime"
                type="time"
                onChange={handleChangeDetail}
                InputLabelProps={{ shrink: true }}
                error={formError && !formData.finishTime}
                helperText={
                  formError && !formData.finishTime
                    ? "This field is required"
                    : ""
                }
              />
            </FormControl>
            <FormControl variant="outlined" fullWidth margin="normal">
              <FormLabel>Konsumsi BBM</FormLabel>
              <TextField name="fuelConsumption" onChange={handleChangeDetail} />
            </FormControl>
            <FormControl variant="outlined" fullWidth margin="normal">
              <FormLabel>Durasi(jam)</FormLabel>
              <TextField
                name="duration"
                type="time"
                onChange={handleChangeDetail}
                InputLabelProps={{ shrink: true }}
                error={formError && !formData.duration}
                helperText={
                  formError && !formData.duration
                    ? "This field is required"
                    : ""
                }
              />
            </FormControl>
            <FormControl variant="outlined" fullWidth margin="normal">
              <FormLabel>aktivitas</FormLabel>
              <Select
                name="note"
                onChange={handleChangeDetail}
                value={formData.note}
                displayEmpty
              >
                <MenuItem value="standby">StandBy</MenuItem>
                <MenuItem value="dorong">Dorong/Tarik</MenuItem>
                <MenuItem value="sailing">Sailing</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Cancel</Button>
            <Button onClick={handleAddActivityDetail}>Add</Button>
          </DialogActions>
        </Dialog>
      </>
    </BaseCard>
  );
};

export default Page;
