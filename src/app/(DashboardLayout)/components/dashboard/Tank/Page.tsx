import React, { useEffect, useState } from "react";
import BaseCard from "../../shared/BaseCard";
import { useTankData } from "./useTankData";
import ReportTable from "./ReportTable";
import { addTankDetail, fetchTankData } from "./api";
import {
  Alert,
  AlertColor,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
} from "@mui/material";

type ReportTank = {
  idTank: string;
  soundingTankCode: string;
  soundingTankName: string;
  size: string;
  usage: string;
  idShip: string;
};

const Page = ({ id }: { id: string }) => {
  const [formData, setFormData] = useState({
    idShipActivity: id,
    soundingTankCode: "",
    usage: "",
  });

  const {
    report,
    loading,
    error,
    updateReportData: updateReport,
    fetchData,
    handleDeleteTankActivity,
  } = useTankData(id);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] =
    useState<AlertColor>("success");
  const [openDialog, setOpenDialog] = useState(false);
  const [formError, setFormError] = useState(false);
  const [tanks, setTanks] = useState<ReportTank[]>([]);

  useEffect(() => {
    const fetchAndSetTanks = async () => {
      try {
        const fetchedTanks = await fetchTankData();
        setTanks(fetchedTanks);
      } catch (error) {
        console.error("Failed to fetch tanks data:", error);
        setSnackbarMessage("Failed to fetch tanks data. Please try again.");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    };

    if (openDialog) {
      fetchAndSetTanks();
    }
  }, [openDialog]);

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

  const handleAddTankDetail = async () => {
    // Check if all fields are filled
    const isFormComplete = Object.values(formData).every(
      (value) => value.trim() !== ""
    );
    if (!isFormComplete) {
      setFormError(true); // Set error state to true
      return; // Prevent further execution
    }
    try {
      const response = await addTankDetail(formData);
      if (response.ok) {
        fetchData();
        handleUpdateSuccess(); // Call this function if the addition is successful
      } else {
        throw new Error("Failed to add activity detail. Please try again.");
      }
    } catch (error) {
      handleUpdateError(error); // Use the existing error handling function
    } finally {
      handleDialogClose(); // Close the dialog in both success and error cases
    }
  };

  return (
    <BaseCard title="Aktivitas Tank">
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
          onDeleteTankActivity={handleDeleteTankActivity}
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
              <FormLabel>Nama Tank</FormLabel>
              <Select
                name="soundingTankCode"
                value={formData.soundingTankCode}
                onChange={handleChangeDetail}
              >
                {tanks.map((tank) => (
                  <MenuItem
                    key={tank.soundingTankCode}
                    value={tank.soundingTankCode}
                  >
                    {tank.soundingTankName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl variant="outlined" fullWidth margin="normal">
              <FormLabel>Penggunaan</FormLabel>
              <TextField
                name="usage"
                value={formData.usage}
                onChange={handleChangeDetail}
                InputLabelProps={{ shrink: true }}
              />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Cancel</Button>
            <Button onClick={handleAddTankDetail}>Add</Button>
          </DialogActions>
        </Dialog>
      </>
    </BaseCard>
  );
};

export default Page;
