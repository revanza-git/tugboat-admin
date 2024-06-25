// ReportTable.tsx
import React, { useCallback, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Chip,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  TextField,
  FormLabel,
  Select,
  DialogActions,
  Button,
  TableContainer,
  Paper,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PropTypes from "prop-types";
import { fetchReport, fetchReportDetail, updateReport } from "./api";
import { useReportData } from "./useReportData";

type ReportItem = {
  idDetailActivity: string;
  startTime: string;
  finishTime: string;
  fuelConsumption: string;
  duration: string;
  note: string;
  isOver: boolean;
  create_timestamp: string;
};

interface ReportTableProps {
  idShipActivity: string;
  report: ReportItem[];
  updateReport: (id: string, data: any) => Promise<void>;
  onUpdateSuccess: () => void;
  onUpdateError: (error: Error) => void;
  onDeleteDetailActivity: (
    idDetailActivity: string,
    idShipActivity: string
  ) => void;
  refreshTrigger: any; // Added refreshTrigger prop
}

const ReportTable = ({
  idShipActivity,
  report: initialReport,
  updateReport,
  onUpdateSuccess,
  onUpdateError,
  onDeleteDetailActivity,
  refreshTrigger,
}: ReportTableProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentReportId, setCurrentReportId] = useState("");
  const [formValues, setFormValues] = useState({
    startTime: "",
    finishTime: "",
    fuelConsumption: "",
    duration: "",
    note: "",
  });
  // Use state to manage the report data
  const [report, setReport] = useState<ReportItem[]>(initialReport);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteReportId, setDeleteReportId] = useState("");

  // Wrap the definition of 'fetchUpdatedReport' in its own useCallback() Hook
  const fetchUpdatedReport = useCallback(async () => {
    try {
      const updatedReport = await fetchReport(idShipActivity);
      setReport(updatedReport);
    } catch (error) {
      console.error("Failed to fetch updated report data:", error);
    }
  }, [idShipActivity]); // Include all dependencies here

  useEffect(() => {
    // Call the fetchUpdatedReport function
    fetchUpdatedReport();
  }, [refreshTrigger, fetchUpdatedReport]); // Dependency array now correctly includes the memoized fetchUpdatedReport

  const handleMenuClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    reportId: React.SetStateAction<string>
  ) => {
    setAnchorEl(event.currentTarget);
    setCurrentReportId(reportId);
  };

  const handleMenuClose = () => setAnchorEl(null);

  const handleEditClick = async (id: string) => {
    try {
      const reportData = await fetchReportDetail(id);

      setFormValues({ ...reportData });

      setOpenDialog(true);
    } catch (error) {
      console.error("Failed to fetch report data:", error);
    }
    handleMenuClose();
  };

  const handleChangeDetail = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmitDetail = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      await updateReport(currentReportId, formValues);
      fetchUpdatedReport();
      onUpdateSuccess();
      setOpenDialog(false);
    } catch (error) {
      if (error instanceof Error) {
        onUpdateError(error);
      } else {
        // Handle the case where the caught value is not an Error instance
        onUpdateError(new Error("An unknown error occurred"));
      }
    }
  };

  // Function to open the delete confirmation dialog
  const handleDeleteClick = (reportId: string) => {
    setDeleteReportId(reportId);
    setOpenDeleteDialog(true);
    handleMenuClose(); // Close the menu
  };

  // Function to confirm deletion
  const handleConfirmDelete = async () => {
    try {
      await onDeleteDetailActivity(deleteReportId, idShipActivity);
      setOpenDeleteDialog(false); // Close the confirmation dialog
      fetchUpdatedReport(); // Refresh the report list or use another method to update the UI
      // Optionally, show a success notification here
    } catch (error) {
      console.error("Failed to delete report data:", error);
      // Optionally, show an error notification here
    }
  };

  if (!report.length) return <Typography>No data available</Typography>;

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Waktu Mulai</TableCell>
              <TableCell>Waktu Selesai</TableCell>
              <TableCell>Durasi</TableCell>
              <TableCell>Konsumsi BBM</TableCell>
              <TableCell>Keterangan</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {report.map((item: any) => (
              <TableRow key={item.idDetailActivity}>
                <TableCell>{item.startTime}</TableCell>
                <TableCell>{item.finishTime}</TableCell>
                <TableCell align="center">{item.duration}</TableCell>
                <TableCell align="center">{item.fuelConsumption}</TableCell>
                <TableCell>{item.note}</TableCell>
                <TableCell>
                  <Chip
                    label={item.isOver == true ? "Over" : "Normal"}
                    color={item.isOver == true ? "error" : "primary"}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={(e) => handleMenuClick(e, item.idDetailActivity)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id="item-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={() => handleEditClick(currentReportId)}>
                      Edit
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleDeleteClick(currentReportId)}
                    >
                      Delete
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
        >
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this report item?
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
            <Button onClick={handleConfirmDelete}>Delete</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Edit Report</DialogTitle>
          <DialogContent>
            <EditReportForm
              formValues={formValues}
              handleChangeDetail={handleChangeDetail}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button onClick={handleSubmitDetail}>Save</Button>
          </DialogActions>
        </Dialog>
      </TableContainer>
    </>
  );
};

const EditReportForm = ({
  formValues,
  handleChangeDetail,
}: {
  formValues: any;
  handleChangeDetail: (event: { target: { name: any; value: any } }) => void;
}) => (
  <>
    <FormControl variant="outlined" fullWidth margin="normal">
      <FormLabel>Waktu Mulai</FormLabel>
      <TextField
        name="startTime"
        type="time"
        value={formValues.startTime}
        onChange={handleChangeDetail}
        InputLabelProps={{ shrink: true }}
      />
    </FormControl>
    <FormControl variant="outlined" fullWidth margin="normal">
      <FormLabel>Waktu Selesai</FormLabel>
      <TextField
        name="finishTime"
        type="time"
        value={formValues.finishTime}
        onChange={handleChangeDetail}
        InputLabelProps={{ shrink: true }}
      />
    </FormControl>
    <FormControl variant="outlined" fullWidth margin="normal">
      <FormLabel>Konsumsi BBM</FormLabel>
      <TextField
        name="fuelConsumption"
        value={formValues.fuelConsumption}
        onChange={handleChangeDetail}
      />
    </FormControl>
    <FormControl variant="outlined" fullWidth margin="normal">
      <FormLabel>Durasi(jam)</FormLabel>
      <TextField
        name="duration"
        type="time"
        value={formValues.duration}
        onChange={handleChangeDetail}
        InputLabelProps={{ shrink: true }}
      />
    </FormControl>
    <FormControl variant="outlined" fullWidth margin="normal">
      <FormLabel>aktivitas</FormLabel>
      <Select name="note" value={formValues.note} onChange={handleChangeDetail}>
        <MenuItem value="standby">StandBy</MenuItem>
        <MenuItem value="shifting">Dorong/Tarik</MenuItem>
        <MenuItem value="sailing">Sailing</MenuItem>
      </Select>
    </FormControl>
  </>
);

ReportTable.propTypes = {
  report: PropTypes.array.isRequired,
};

export default ReportTable;
