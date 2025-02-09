"use client";
import { Button, Grid } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter, useSearchParams } from "next/navigation";
import ActivityReports from "@/app/(DashboardLayout)/components/dashboard/ActivityDetail/Page";
import DataKapal from "@/app/(DashboardLayout)/components/dashboard/DataKapal/Page";
import BahanBakar from "@/app/(DashboardLayout)/components/dashboard/BahanBakar/Page";
import RunningHour from "@/app/(DashboardLayout)/components/dashboard/RunningHour/Page";
import TankActivity from "@/app/(DashboardLayout)/components/dashboard/Tank/Page";

const Details = () => {
  const router = useRouter();
  const params: any = useSearchParams();
  const id = params.get("id");

  return (
    <Grid
      container
      spacing={1}
      sx={{
        p: 1,
        mt: 0,
        maxWidth: 1200,
        margin: "0 auto",
      }}
    >
      <Grid item xs={12}>
        <Button
          variant="contained"
          onClick={() => router.back()}
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 1 }}
        >
          Back
        </Button>
        <DataKapal id={id} />
      </Grid>

      <Grid item xs={12}>
        <ActivityReports id={id} />
      </Grid>

      <Grid item xs={12}>
        <BahanBakar id={id} />
      </Grid>

      <Grid item xs={12}>
        <RunningHour id={id} />
      </Grid>

      <Grid item xs={12}>
        <TankActivity id={id} />
      </Grid>
    </Grid>
  );
};

export default Details;
