// Page.tsx
import React, { useState } from "react";
import { Snackbar, Alert, AlertColor } from "@mui/material";
import BaseCard from "../../shared/DashboardCard";
import ReportTable from "./ReportTable";
import { useReportData } from "./useReportData";

const Page = ({ id }: { id: string }) => {
  const {
    report,
    loading: isLoading,
    error,
    updateReportData: updateReport,
  } = useReportData(id);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] =
    useState<AlertColor>("success");

  const handleUpdateSuccess = () => {
    setSnackbarMessage("Successfully updated the activity detail");
    setSnackbarSeverity("success");
    setOpenSnackbar(true);
  };

  const handleUpdateError = (error: Error) => {
    setSnackbarMessage(
      `Failed to update the activity detail: ${error.message}`
    );
    setSnackbarSeverity("error");
    setOpenSnackbar(true);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <BaseCard title="Detail Kegiatan">
      <>
        <ReportTable
          report={report}
          updateReport={updateReport}
          onUpdateSuccess={handleUpdateSuccess}
          onUpdateError={handleUpdateError}
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
      </>
    </BaseCard>
  );
};

export default Page;
