// ReportTable.tsx
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  IconButton,
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
import { fetchTankData, fetchReportDetail } from "./api";
import { set } from "lodash";

type ReportItem = {
  idDetailActivity: string;
  soundingTankCode: string;
  soundingTankName: string;
  size: string;
  usage: string;
  idShip: string;
};

type ReportTank = {
  idTank: string;
  soundingTankCode: string;
  soundingTankName: string;
  size: string;
  usage: string;
  idShip: string;
};

interface ReportTableProps {
  idShipActivity: string;
  report: ReportItem[];
  updateReport: (id: string, data: any) => Promise<void>;
  onUpdateSuccess: () => void;
  onUpdateError: (error: Error) => void;
  onDeleteTankActivity: (
    idDetailActivity: string,
    idShipActivity: string
  ) => void;
}

const ReportTable = ({
  idShipActivity,
  report,
  updateReport,
  onUpdateSuccess,
  onUpdateError,
  onDeleteTankActivity,
}: ReportTableProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentReportId, setCurrentReportId] = useState("");
  const [formValues, setFormValues] = useState({
    idShipActivity: idShipActivity,
    soundTankCode: "",
    usage: "",
    size: "",
    weight: "",
  });

  //   const [report, setReport] = useState<ReportItem[]>(initialReport);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteReportId, setDeleteReportId] = useState("");

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

      onUpdateSuccess();
      setOpenDialog(false);
    } catch (error) {
      if (error instanceof Error) {
        onUpdateError(error);
      } else {
        onUpdateError(new Error("An unknown error occurred"));
      }
    }
  };

  // Function to open the delete confirmation dialog
  const handleDeleteClick = (reportId: string) => {
    setDeleteReportId(reportId);
    setOpenDeleteDialog(true);
    handleMenuClose();
  };

  // Function to confirm deletion
  const handleConfirmDelete = async () => {
    try {
      onDeleteTankActivity(deleteReportId, idShipActivity);
      setOpenDeleteDialog(false);
    } catch (error) {
      console.error("Failed to delete report data:", error);
    }
  };

  if (!report.length) return <Typography>No data available</Typography>;

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nama Tank</TableCell>
              <TableCell>Penggunaan(liter)</TableCell>
              <TableCell>Size(cm)</TableCell>
              <TableCell>Weight(kg)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {report.map((item: any) => (
              <TableRow key={item.idTankActivity}>
                <TableCell>{item.soundingTankName}</TableCell>
                <TableCell>{item.usage}</TableCell>
                <TableCell>{item.size}</TableCell>
                <TableCell>{item.weight}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={(e) => handleMenuClick(e, item.idTankActivity)}
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
            Are you sure you want to delete this tank item?
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
}) => {
  const [tanks, setTanks] = useState<ReportTank[]>([]);

  useEffect(() => {
    fetchTankData()
      .then((data) => {
        console.log(data);
        setTanks(data);
      })
      .catch((error) => {
        console.error("Failed to fetch tank data", error);
      });
  }, []);

  return (
    <>
      <FormControl variant="outlined" fullWidth margin="normal">
        <FormLabel>Nama Tank</FormLabel>
        <Select
          name="soundingTankCode"
          value={formValues.soundingTankCode}
          onChange={handleChangeDetail}
        >
          {tanks.map((tank) => (
            <MenuItem key={tank.soundingTankCode} value={tank.soundingTankCode}>
              {tank.soundingTankName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl variant="outlined" fullWidth margin="normal">
        <FormLabel>Penggunaan</FormLabel>
        <TextField
          name="usage"
          value={formValues.usage}
          onChange={handleChangeDetail}
          InputLabelProps={{ shrink: true }}
        />
      </FormControl>
    </>
  );
};

ReportTable.propTypes = {
  report: PropTypes.array.isRequired,
};

export default ReportTable;
