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
} from "@mui/material";
import BaseCard from "../shared/DashboardCard";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useRouter } from "next/navigation";

const reports = [
  {
    id: "1",
    shipname: "Patra Tunda",
    author: "Elite Admin",
    status: "Melebihi",
    pbg: "red",
    tanggal: new Date().toLocaleDateString("en-GB").split('/').join('-'),
  },
  {
    id: "2",
    shipname: "Aqua Harbor",
    author: "Real Homes WP Theme",
    status: "Sesuai",
    pbg: "success.main",
    tanggal: new Date().toLocaleDateString("en-GB").split('/').join('-'),
  },
  {
    id: "3",
    shipname: "Patra Tunda",
    author: "MedicalPro WP Theme",
    status: "Melebihi",
    pbg: "red",
    tanggal: new Date().toLocaleDateString("en-GB").split('/').join('-'),
  },
  {
    id: "4",
    shipname: "Patra Tunda",
    author: "Hosting Press HTML",
    status: "Sesuai",
    pbg: "success.main",
    tanggal: new Date().toLocaleDateString("en-GB").split('/').join('-'),
  },
];

const Report = () => {
  const [anchorEl, setAnchorEl] = useState<null | Element>(null);
  const [CurrentReportId, setCurrentReportId] = useState("");

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
                  Nama Kapal
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Nama Pengisi Laporan
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Status
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography color="textSecondary" variant="h6">
                  Tanggal
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
            {reports.map((report) => (
              <TableRow key={report.shipname}>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Box>
                      <Typography fontSize="14px" fontWeight={600}>
                        {report.shipname}
                      </Typography>
                     
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" fontSize="14px">
                    {report.author}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    sx={{
                      pl: "4px",
                      pr: "4px",
                      backgroundColor: report.pbg,
                      color: "#fff",
                    }}
                    size="small"
                    label={report.status}
                  ></Chip>
                </TableCell>
                <TableCell align="right">
                  <Typography fontSize="14px">{report.tanggal}</Typography>
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
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </BaseCard>
  );
};

export default Report;
