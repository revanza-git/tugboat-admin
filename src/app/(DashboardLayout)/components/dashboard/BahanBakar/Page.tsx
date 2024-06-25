"use client";
import {
  Stack,
  TextField,
  FormLabel,
  FormControl,
  Box,
  Button,
  CircularProgress,
} from "@mui/material";
import BaseCard from "@/app/(DashboardLayout)/components/shared/BaseCard";
import { useEffect, useState } from "react";

interface FuelActivity {
  idShipActivity: string;
  reportRob: string;
  activityRob: string;
  filling: string;
}

const Page = (id: any) => {
  const [fetchedData, setFetchedData] = useState<FuelActivity>();
  const [formValues, setFormValues] = useState({
    reportRob: fetchedData ? fetchedData.reportRob : "",
    activityRob: fetchedData ? fetchedData.activityRob : "",
    filling: fetchedData ? fetchedData.filling : "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const idString = id.id;
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/Tugboat/fuel-activity/${idString}`
        );
        const data = await response.json();

        setFetchedData(data);
        setFormValues(data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();

    if (isSubmitted || isFailed) {
      const timer = setTimeout(() => {
        setIsSubmitted(false);
        setIsFailed(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isSubmitted, isFailed, id.id]);

  // Handle change in form fields
  const handleChange = (event: { target: { name: any; value: any } }) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setIsSubmitting(true);
    const idString = id.id;
    // Assuming `id` is available in the current scope
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/Tugboat/fuel-activity/${idString}`;
    console.log(url);

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    })
      .then(() => {
        setIsSubmitting(false);
      })
      .then(() => {
        setIsSubmitted(true);
        // Handle the response data
      })
      .catch(() => {
        setIsFailed(true);
        // Handle the error
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <BaseCard title="Bahan Bakar">
        <div>
          <Stack spacing={3} direction={{ xs: "column", sm: "row" }}>
            <Box flexGrow={1}>
              <FormControl variant="outlined" fullWidth>
                <FormLabel component="legend">ROB Laporan (Liter)</FormLabel>
                <TextField
                  id="reportRob"
                  name="reportRob"
                  variant="outlined"
                  defaultValue={formValues.reportRob}
                  onChange={handleChange}
                />
              </FormControl>
            </Box>

            <Box flexGrow={1}>
              <FormControl variant="outlined" fullWidth>
                <FormLabel component="legend">
                  ROB Hari Kegiatan (Liter)
                </FormLabel>
                <TextField
                  id="activityRob"
                  name="activityRob"
                  variant="outlined"
                  defaultValue={formValues.activityRob}
                  onChange={handleChange}
                />
              </FormControl>
            </Box>

            <Box flexGrow={1}>
              <FormControl variant="outlined" fullWidth>
                <FormLabel component="legend">Pengisian</FormLabel>
                <TextField
                  id="filling"
                  name="filling"
                  variant="outlined"
                  defaultValue={formValues.filling}
                  onChange={handleChange}
                />
              </FormControl>
            </Box>
          </Stack>
          <Box textAlign="right" mt={2}>
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
              color={
                isSubmitting
                  ? "warning"
                  : isFailed
                  ? "error"
                  : isSubmitted
                  ? "success"
                  : "primary"
              }
              onClick={handleSubmit}
              startIcon={isSubmitting && <CircularProgress size={20} />}
            >
              <span>
                {isSubmitting
                  ? "Loading..."
                  : isFailed
                  ? "Failed"
                  : isSubmitted
                  ? "Success"
                  : "Save"}
              </span>
            </Button>
          </Box>
        </div>
      </BaseCard>
    </form>
  );
};

export default Page;
