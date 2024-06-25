"use client";
import {
  Stack,
  TextField,
  FormLabel,
  FormControl,
  Select,
  MenuItem,
  Box,
  Button,
  CircularProgress,
} from "@mui/material";
import BaseCard from "@/app/(DashboardLayout)/components/shared/BaseCard";
import { useEffect, useState } from "react";

interface TugboatActivity {
  idShipActivity: string;
  author: string;
  activityDate: string;
  name: string;
  activity: string;
  position: string;
  create_timestamp: string;
}

const Page = (id: any) => {
  // New state for fetched data
  const [fetchedData, setFetchedData] = useState<TugboatActivity>();
  const [formValues, setFormValues] = useState({
    author: fetchedData ? fetchedData.author : "",
    activityDate: fetchedData ? fetchedData.activityDate : "",
    name: fetchedData ? fetchedData.name : "",
    activity: fetchedData ? fetchedData.activity : "",
    position: fetchedData ? fetchedData.position : "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const idString = id.id;
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/Tugboat/tugboat-activity/${idString}`
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

  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

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
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/Tugboat/tugboat-activity/${idString}`;

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
      <BaseCard title="Data Kapal">
        <div>
          <Stack spacing={3} direction={{ xs: "column", sm: "row" }}>
            <Box flexGrow={1}>
              <FormControl variant="outlined" fullWidth>
                <FormLabel component="legend">Nama Lengkap</FormLabel>
                <TextField
                  id="author"
                  name="author"
                  variant="outlined"
                  defaultValue={fetchedData?.author}
                  onChange={handleChange}
                />
              </FormControl>
            </Box>

            <Box flexGrow={1}>
              <FormControl variant="outlined" fullWidth>
                <FormLabel component="legend">Tanggal Kegiatan</FormLabel>
                <TextField
                  id="activityDate"
                  name="activityDate"
                  type="date"
                  variant="outlined"
                  defaultValue={
                    fetchedData ? formatDate(fetchedData.activityDate) : ""
                  }
                  onChange={handleChange}
                />
              </FormControl>
            </Box>

            <Box flexGrow={1}>
              <FormControl variant="outlined" fullWidth>
                <FormLabel component="legend">Nama Kapal</FormLabel>
                <Select
                  labelId="name"
                  id="name"
                  name="name"
                  value={formValues ? formValues.name : ""}
                  onChange={handleChange}
                  label="Nama Kapal"
                >
                  <MenuItem value="4201">Patra Tunda 4201</MenuItem>
                  <MenuItem value="4202">Patra Tunda 4202</MenuItem>
                  <MenuItem value="aqua">Aqua Harbor</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box flexGrow={1}>
              <FormControl variant="outlined" fullWidth>
                <FormLabel component="legend">Kegiatan</FormLabel>
                <TextField
                  id="activity"
                  name="activity"
                  variant="outlined"
                  defaultValue={fetchedData ? fetchedData.activity : ""}
                />
              </FormControl>
            </Box>

            <Box flexGrow={1}>
              <FormControl variant="outlined" fullWidth>
                <FormLabel component="legend">Posisi</FormLabel>
                <TextField
                  id="position"
                  name="position"
                  variant="outlined"
                  defaultValue={fetchedData ? fetchedData.position : ""}
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
