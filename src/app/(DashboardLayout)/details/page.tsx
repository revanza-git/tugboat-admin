"use client";
import { Button, Grid } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter, useSearchParams } from "next/navigation";
import ActivityReports from "@/app/(DashboardLayout)/components/dashboard/ActivityDetail/Page";
import DataKapal from "@/app/(DashboardLayout)/components/dashboard/DataKapal/Page";
import BahanBakar from "@/app/(DashboardLayout)/components/dashboard/BahanBakar/Page"; // Add this import
import RunningHour from "@/app/(DashboardLayout)/components/dashboard/RunningHour/Page"; // Add this import

const Details = () => {
  const router = useRouter();
  const params: any = useSearchParams();
  const id = params.get("id");

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} lg={12}>
        <Button onClick={() => router.back()}>
          <ArrowBackIcon />
        </Button>
        <DataKapal id={id} />
      </Grid>

      <Grid item xs={12} lg={12}>
        <ActivityReports id={id} />
      </Grid>

      <Grid item xs={12} lg={12}>
        <BahanBakar id={id} />
      </Grid>

      <Grid item xs={12} lg={12}>
        <RunningHour id={id} />
      </Grid>
    </Grid>
  );
};

export default Details;
