"use client";
import { Grid } from "@mui/material";
import Report from "@/app/(DashboardLayout)/components/dashboard/Report";

const Homes = () => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <Report />
      </Grid>
    </Grid>
  );
};

export default Homes;
