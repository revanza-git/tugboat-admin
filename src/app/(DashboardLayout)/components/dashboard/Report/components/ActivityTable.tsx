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
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
    handleDeleteShipActivity,
  }: {
    activity: any;
    shipName: string;
    router: any;
    handleDeleteShipActivity(id: string): void;
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
    const [dialogOpen, setDialogOpen] = useState(false);
    const [deleteActivityId, setDeleteActivityId] = useState(null);

    // Step 3: Create a function to open the Dialog
    const handleOpenDialog = (id: any) => {
      setDeleteActivityId(id);
      setDialogOpen(true);
    };

    // Step 3: Modify handleDeleteShipActivity to show Snackbar
    const handleDeleteShip = () => {
      if (deleteActivityId) {
        handleDeleteShipActivity(deleteActivityId);
        console.log(`Deleting activity with id: ${deleteActivityId}`);
        // Close the dialog
        setDialogOpen(false);
        // Reset the deleteActivityId
        setDeleteActivityId(null);
        // Optionally, show a snackbar with a success message
      }
    };

    return (
      <>
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
              <MenuItem
                onClick={() => handleOpenDialog(activity.idShipActivity)}
              >
                Delete
              </MenuItem>
            </Menu>
          </TableCell>
        </TableRow>

        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
          <DialogTitle>{"Confirm Delete"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this ship activity?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleDeleteShip} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
);

// Explicitly setting the display name for the component
ActivityTableRow.displayName = "ActivityTableRow";

const ActivityTable = ({
  tugboatActivities,
  shipData,
  router,
  handleDeleteShipActivity,
}: {
  tugboatActivities: any[];
  shipData: any[];
  router: any;
  handleDeleteShipActivity: (id: string) => void;
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tugboatActivities.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(tugboatActivities.length / itemsPerPage))
    );
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  // Create ship code to name mapping
  const shipCodeToNameMap = React.useMemo(() => {
    return shipData.reduce((acc, ship) => {
      acc[ship.shipCode] = ship.shipName || "Unknown";
      return acc;
    }, {} as Record<string, string>);
  }, [shipData]);

  return (
    <>
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
            {currentItems.map((activity) => (
              <ActivityTableRow
                key={activity.idShipActivity}
                activity={activity}
                shipName={shipCodeToNameMap[activity.name] || "Unknown"}
                router={router}
                handleDeleteShipActivity={handleDeleteShipActivity}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box display="flex" justifyContent="center" m={2}>
        <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </Button>
        <Button
          onClick={handleNextPage}
          disabled={currentPage * itemsPerPage >= tugboatActivities.length}
        >
          Next
        </Button>
      </Box>
    </>
  );
};

export default ActivityTable;
