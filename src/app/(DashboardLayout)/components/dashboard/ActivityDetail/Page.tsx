import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  TableContainer,
  IconButton,
  Menu,
  MenuItem,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  FormLabel,
  TextField,
  Select,
  Snackbar,
  Alert,
  AlertColor,
} from "@mui/material";
import BaseCard from "../../shared/DashboardCard";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface DetailActivity {
  idDetailActivity: string;
  startTime: string;
  finishTime: string;
  fuelConsumption: string;
  duration: string;
  note: string;
  create_timestamp: string;
}

const Page = (id: any) => {
  const stringId = id.id;
  const [anchorEl, setAnchorEl] = useState<null | Element>(null);
  const [CurrentReportId, setCurrentReportId] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [report, setReport] = useState<DetailActivity[]>([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleMenuClick = (id: string) => (event: React.MouseEvent) => {
    setAnchorEl(event.currentTarget);
    setCurrentReportId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const fetchReport = async () => {
      const response = await fetch(
        `https://localhost:44317/Tugboat/detail-activity/${stringId}`
      );
      const data = await response.json();
      setReport(data);
    };

    fetchReport();
  }, [id]);

  const [formValues, setFormValues] = useState({
    idDetailActivity: "",
    startTime: "",
    finishTime: "",
    duration: "",
    fuelConsumption: "",
    note: "",
  });

  const fetchReportData = (idDetailActivity: string) => {
    const reportData = report.find(
      (item) => item.idDetailActivity === idDetailActivity
    );

    return reportData;
  };

  const handleEditClick = (id: string) => {
    const reportData = fetchReportData(id);
    // Check if reportData is not undefined
    if (reportData) {
      // Update the formValues state
      setFormValues(reportData);
    } else {
      // Handle the error here, e.g., set a default value or show an error message
      console.error(`No report found with id: ${id}`);
    }
    setCurrentReportId(id);
    setOpenDialog(true);
    setAnchorEl(null);
  };

  // Handle change in form fields
  const handleChangeDetail = (event: { target: { name: any; value: any } }) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmitDetail = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    console.log(formValues);
    try {
      const response = await fetch(
        `https://localhost:44317/Tugboat/detail-activity/${CurrentReportId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValues), // replace `item` with the data you want to send
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update the activity detail");
      }

      setSnackbarMessage("Successfully updated the activity detail");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      // Re-fetch the data
      const fetchReport = async () => {
        const response = await fetch(
          `https://localhost:44317/Tugboat/detail-activity/${stringId}`
        );
        const data = await response.json();
        setReport(data);
      };

      fetchReport();
    } catch (error) {
      setSnackbarMessage(`Failed to update the activity detail: ${error}`);
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
    setOpenDialog(false);
  };

  return (
    <BaseCard title="Detail Kegiatan">
      <div>
        <TableContainer
          sx={{
            width: {
              xs: "274px",
              sm: "100%",
            },
          }}
        >
          <Table
            aria-label="simple table"
            sx={{
              whiteSpace: "nowrap",
              mt: 2,
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    Waktu Mulai
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    Waktu Selesai
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    Durasi
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    Konsumsi BBM
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    Keterangan
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {report &&
                report.map((item, index) => (
                  <TableRow key={item.idDetailActivity}>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Box>
                          <Typography fontSize="14px" fontWeight={600}>
                            {item.startTime}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary" fontSize="14px">
                        {item.finishTime}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography color="textSecondary" fontSize="14px">
                        {item.duration}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography color="textSecondary" fontSize="14px">
                        {item.fuelConsumption}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary" fontSize="14px">
                        {item.note}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={handleMenuClick(item.idDetailActivity)}
                      >
                        <MoreVertIcon />
                      </IconButton>

                      <Menu
                        id="item-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                      >
                        <MenuItem
                          onClick={() => handleEditClick(CurrentReportId)}
                        >
                          Edit
                        </MenuItem>
                        <MenuItem>Delete</MenuItem>
                      </Menu>
                    </TableCell>
                    <Dialog
                      open={openDialog}
                      onClose={() => setOpenDialog(false)}
                    >
                      <form onSubmit={handleSubmitDetail}>
                        <DialogTitle>Edit Report</DialogTitle>
                        <DialogContent>
                          <Box flexGrow={1}>
                            <FormControl variant="outlined" fullWidth>
                              <FormLabel component="legend">
                                Waktu Mulai
                              </FormLabel>
                              <TextField
                                id="startTime"
                                name="startTime"
                                type="time"
                                variant="outlined"
                                defaultValue={formValues.startTime}
                                onChange={handleChangeDetail}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                              />
                            </FormControl>
                          </Box>

                          <Box flexGrow={1}>
                            <FormControl variant="outlined" fullWidth>
                              <FormLabel component="legend">
                                Waktu Selesai
                              </FormLabel>
                              <TextField
                                id="finishTime"
                                name="finishTime"
                                type="time"
                                variant="outlined"
                                defaultValue={formValues.finishTime}
                                onChange={handleChangeDetail}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                              />
                            </FormControl>
                          </Box>

                          <Box flexGrow={1}>
                            <FormControl variant="outlined" fullWidth>
                              <FormLabel component="legend">
                                Konsumsi BBM
                              </FormLabel>
                              <TextField
                                id="fuelConsumption"
                                name="fuelConsumption"
                                variant="outlined"
                                defaultValue={formValues.fuelConsumption}
                                onChange={handleChangeDetail}
                              />
                            </FormControl>
                          </Box>

                          <Box flexGrow={1}>
                            <FormControl variant="outlined" fullWidth>
                              <FormLabel component="legend">
                                Durasi(jam)
                              </FormLabel>
                              <TextField
                                id="duration"
                                name="duration"
                                variant="outlined"
                                type="time"
                                defaultValue={formValues.duration}
                                onChange={handleChangeDetail}
                              />
                            </FormControl>
                          </Box>

                          <Box flexGrow={1}>
                            <FormControl variant="outlined" fullWidth>
                              <FormLabel component="legend">
                                aktivitas
                              </FormLabel>
                              <Select
                                labelId="note"
                                id="note"
                                name="note"
                                label="Nama Kapal"
                                onChange={handleChangeDetail}
                                value={formValues.note}
                              >
                                <MenuItem value="standby">StandBy</MenuItem>
                                <MenuItem value="shifting">
                                  Dorong/Tarik
                                </MenuItem>
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
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={() => setOpenSnackbar(false)}
            severity={snackbarSeverity as AlertColor}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </div>
    </BaseCard>
  );
};

export default Page;
