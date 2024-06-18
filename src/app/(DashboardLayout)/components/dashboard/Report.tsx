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
  TextField,
  Button,
  Grid,
} from "@mui/material";
import BaseCard from "../shared/DashboardCard";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";

interface TugboatActivity {
  idShipActivity: string;
  author: string;
  activityDate: string;
  name: string;
  activity: string;
  position: string;
  create_timestamp: string;
}

interface Ship {
  idShip: string;
  shipCode: string;
  shipName: string;
}

const Report = () => {
  const [anchorEl, setAnchorEl] = useState<null | Element>(null);
  const [CurrentReportId, setCurrentReportId] = useState("");
  const [tugboatActivities, setTugboatActivities] = useState<TugboatActivity[]>(
    []
  );
  const [shipData, setShipData] = useState<Ship[]>([]);
  const [searchInput, setSearchInput] = useState("");

  const fetchShipData = async () => {
    const response = await fetch("https://localhost:44317/Tugboat/ships");
    const data = await response.json();
    setShipData(data);
  };

  const fetchData = () => {
    fetch("https://localhost:44317/Tugboat/tugboat-activity")
      .then((response) => response.json())
      .then((data) => {
        const filteredData = data.filter(
          (activity: { name: string; activityDate: string }) => {
            const lowerCaseSearchInput = searchInput.toLowerCase();
            return (
              (activity.name &&
                activity.name.toLowerCase().includes(lowerCaseSearchInput)) ||
              (activity.activityDate &&
                activity.activityDate.includes(lowerCaseSearchInput))
            );
          }
        );
        setTugboatActivities(filteredData);
      });

    fetchShipData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = async () => {
    fetchData();
  };

  const handleMenuClick = (id: string) => (event: React.MouseEvent) => {
    setAnchorEl(event.currentTarget);
    setCurrentReportId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const router = useRouter();

  return (
    <BaseCard title="Laporan Terbaru">
      <div>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={8} md={10} lg={11} sx={{ flexGrow: 1 }}>
            <TextField
              id="search-field"
              label="Search"
              variant="outlined"
              fullWidth
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={2} lg={1}>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSearch}
              >
                Search
              </Button>
            </Box>
          </Grid>
        </Grid>
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
                    ID
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    Nama Pelapor
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    Tanggal Aktivitas
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    Nama Kapal
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    Aktivitas
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    Posisi
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    Tanggal Input
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    Actions
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tugboatActivities.map((activity) => {
                const ship = shipData.find(
                  (ship) => ship?.shipCode === activity.name
                );
                const shipName = ship ? ship?.shipName : "Unknown";
                const dateActivity = new Date(activity.activityDate);
                const formattedDateActivity =
                  dateActivity.toLocaleDateString("en-GB");

                const timestamp = dayjs(activity.create_timestamp);
                const formattedTimestamp = timestamp.format("DD/MM/YYYY HH:mm");
                return (
                  <TableRow key={activity.idShipActivity}>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Box>
                          <Typography fontSize="14px" fontWeight={600}>
                            {activity.idShipActivity}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary" fontSize="14px">
                        {activity.author}
                      </Typography>
                    </TableCell>
                    {/* <TableCell>
                  <Chip
                    sx={{
                      pl: "4px",
                      pr: "4px",
                      backgroundColor: activity.pbg,
                      color: "#fff",
                    }}
                    size="small"
                    label={activity.status}
                  ></Chip>
                </TableCell> */}
                    <TableCell align="right">
                      <Typography fontSize="14px">
                        {formattedDateActivity}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography fontSize="14px">{shipName}</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography fontSize="14px">
                        {activity.activity}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography fontSize="14px">
                        {activity.position}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography fontSize="14px">
                        {formattedTimestamp}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={handleMenuClick(activity.idShipActivity)}
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
                          onClick={() =>
                            router.push(`/details?id=${CurrentReportId}`)
                          }
                        >
                          View
                        </MenuItem>
                        <MenuItem>Delete</MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </BaseCard>
  );
};

export default Report;
