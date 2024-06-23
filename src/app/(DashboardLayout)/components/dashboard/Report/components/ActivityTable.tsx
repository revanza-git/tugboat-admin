import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  IconButton,
  MenuItem,
  Menu,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import dayjs from "dayjs";

// Utility function for date formatting
const formatDate = (
  dateString: string,
  format: string = "DD/MM/YYYY HH:mm"
) => {
  return dayjs(dateString).format(format);
};

// New TableRow component
const ActivityTableRow = React.memo(
  ({
    activity,
    shipName,
    router,
  }: {
    activity: any;
    shipName: string;
    router: any;
  }) => {
    const [anchorEl, setAnchorEl] = useState<null | Element>(null);

    const handleMenuClick = (id: string) => (event: React.MouseEvent) => {
      setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
      setAnchorEl(null);
    };
    const formattedDateActivity = formatDate(
      activity.activityDate,
      "DD/MM/YYYY"
    );
    const formattedTimestamp = formatDate(activity.create_timestamp);

    return (
      <TableRow key={activity.idShipActivity}>
        <TableCell>
          <Box display="flex" alignItems="center">
            <Typography fontSize="14px" fontWeight={600}>
              {activity.idShipActivity}
            </Typography>
          </Box>
        </TableCell>
        <TableCell>
          <Typography color="textSecondary" fontSize="14px">
            {activity.author}
          </Typography>
        </TableCell>
        <TableCell align="right">
          <Typography fontSize="14px">{formattedDateActivity}</Typography>
        </TableCell>
        <TableCell align="right">
          <Typography fontSize="14px">{shipName}</Typography>
        </TableCell>
        <TableCell align="right">
          <Typography fontSize="14px">{activity.activity}</Typography>
        </TableCell>
        <TableCell align="right">
          <Typography fontSize="14px">{activity.position}</Typography>
        </TableCell>
        <TableCell align="right">
          <Typography fontSize="14px">{formattedTimestamp}</Typography>
        </TableCell>
        <TableCell>
          <IconButton onClick={handleMenuClick(activity.idShipActivity)}>
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
                router.push(`/details?id=${activity.idShipActivity}`)
              }
            >
              View
            </MenuItem>
            <MenuItem>Delete</MenuItem>
          </Menu>
        </TableCell>
      </TableRow>
    );
  }
);

const ActivityTable = ({
  tugboatActivities,
  shipData,

  router,
}: {
  tugboatActivities: any[];
  shipData: any[];

  router: any;
}) => {
  // Create ship code to name mapping
  const shipCodeToNameMap = React.useMemo(() => {
    return shipData.reduce((acc, ship) => {
      acc[ship.shipCode] = ship.shipName || "Unknown";
      return acc;
    }, {} as Record<string, string>);
  }, [shipData]);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
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
          {tugboatActivities.map((activity) => (
            <ActivityTableRow
              key={activity.idShipActivity}
              activity={activity}
              shipName={shipCodeToNameMap[activity.name] || "Unknown"}
              router={router}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ActivityTable;
