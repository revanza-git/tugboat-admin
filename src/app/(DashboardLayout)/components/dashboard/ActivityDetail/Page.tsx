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
} from "@mui/material";
import BaseCard from "../../shared/DashboardCard";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const reports = [
  {
    id: "1",
    waktuMulai: new Date().toLocaleDateString("en-GB").split("/").join("-"),
    waktuSelesai: new Date().toLocaleDateString("en-GB").split("/").join("-"),
    durasi: "12",
    konsumsi: "150",
    aktivitas: "standby",
  },
  {
    id: "2",
    waktuMulai: new Date().toLocaleDateString("en-GB").split("/").join("-"),
    waktuSelesai: new Date().toLocaleDateString("en-GB").split("/").join("-"),
    durasi: "12",
    konsumsi: "150",
    aktivitas: "dorong",
  },
  {
    id: "3",
    waktuMulai: new Date().toLocaleDateString("en-GB").split("/").join("-"),
    waktuSelesai: new Date().toLocaleDateString("en-GB").split("/").join("-"),
    durasi: "12",
    konsumsi: "150",
    aktivitas: "sailing",
  },
  {
    id: "4",
    waktuMulai: new Date().toLocaleDateString("en-GB").split("/").join("-"),
    waktuSelesai: new Date().toLocaleDateString("en-GB").split("/").join("-"),
    durasi: "12",
    konsumsi: "150",
    aktivitas: "standby",
  },
];

const Page = (id: any) => {
  const [anchorEl, setAnchorEl] = useState<null | Element>(null);
  const [CurrentReportId, setCurrentReportId] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const handleMenuClick = (id: string) => (event: React.MouseEvent) => {
    setAnchorEl(event.currentTarget);
    setCurrentReportId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = (id: string) => {
    setCurrentReportId(id);
    setOpenDialog(true);
    setAnchorEl(null);
  };

  const [formValues, setFormValues] = useState({
    id: "",
    waktuMulai: "",
    waktuSelesai: "",
    konsumsi: "",
    durasi: "",
    aktivitas: "",
  });

  // Handle change in form fields
  const handleChangeDetail = (event: { target: { name: any; value: any } }) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmitDetail = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    console.log(formValues);
    setOpenDialog(false);
    // Here you can handle your form submission logic
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
              {reports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <Box>
                        <Typography fontSize="14px" fontWeight={600}>
                          {report.waktuMulai}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" fontSize="14px">
                      {report.waktuSelesai}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography color="textSecondary" fontSize="14px">
                      {report.durasi}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography color="textSecondary" fontSize="14px">
                      {report.konsumsi}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" fontSize="14px">
                      {report.aktivitas}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={handleMenuClick(report.id)}>
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
                              id="waktuMulai"
                              name="waktuMulai"
                              type="date"
                              variant="outlined"
                              defaultValue={report.waktuMulai}
                              onChange={handleChangeDetail}
                            />
                          </FormControl>
                        </Box>

                        <Box flexGrow={1}>
                          <FormControl variant="outlined" fullWidth>
                            <FormLabel component="legend">
                              Waktu Selesai
                            </FormLabel>
                            <TextField
                              id="waktuSelesai"
                              name="waktuSelesai"
                              type="date"
                              variant="outlined"
                              defaultValue={report.waktuSelesai}
                              onChange={handleChangeDetail}
                            />
                          </FormControl>
                        </Box>

                        <Box flexGrow={1}>
                          <FormControl variant="outlined" fullWidth>
                            <FormLabel component="legend">
                              Konsumsi BBM
                            </FormLabel>
                            <TextField
                              id="konsumsi"
                              name="konsumsi"
                              variant="outlined"
                              defaultValue={report.konsumsi}
                              onChange={handleChangeDetail}
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
                              defaultValue={report.durasi}
                              onChange={handleChangeDetail}
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
                              value={report.aktivitas}
                              onChange={handleChangeDetail}
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </BaseCard>
  );
};

export default Page;
