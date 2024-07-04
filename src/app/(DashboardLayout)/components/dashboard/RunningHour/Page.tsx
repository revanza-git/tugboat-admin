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

interface EngineActivity {
  idShipActivity: string;
  mainEngine: string;
  auxiliaryEngine1: string;
  auxiliaryEngine2: string;
  auxiliaryEngine3: string;
  fifi: string;
}

const Page = (id: any) => {
  const [fetchedData, setFetchedData] = useState<EngineActivity>();
  const [formValues, setFormValues] = useState({
    mainEngine: fetchedData ? fetchedData.mainEngine : "",
    auxiliaryEngine1: fetchedData ? fetchedData.auxiliaryEngine1 : "",
    auxiliaryEngine2: fetchedData ? fetchedData.auxiliaryEngine2 : "",
    auxiliaryEngine3: fetchedData ? fetchedData.auxiliaryEngine3 : "",
    fifiEngine: fetchedData ? fetchedData.fifi : "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const idString = id.id;
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/Tugboat/engine-activity/${idString}`
        );
        const data = await response.json();

        console.log(data);

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
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/Tugboat/engine-activity/${idString}`;

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
      <BaseCard title="Running Hour">
        <div>
          <Stack spacing={3} direction={{ xs: "column", sm: "row" }}>
            <Box flexGrow={1}>
              <FormControl variant="outlined" fullWidth>
                <FormLabel component="legend">M/E (Jam)</FormLabel>
                <TextField
                  id="mainEngine"
                  name="mainEngine"
                  variant="outlined"
                  type="time"
                  defaultValue={formValues.mainEngine}
                  onChange={handleChange}
                />
              </FormControl>
            </Box>

            <Box flexGrow={1}>
              <FormControl variant="outlined" fullWidth>
                <FormLabel component="legend">A/E No.1 (Jam)</FormLabel>
                <TextField
                  id="auxiliaryEngine1"
                  name="auxiliaryEngine1"
                  variant="outlined"
                  type="time"
                  defaultValue={formValues.auxiliaryEngine1}
                  onChange={handleChange}
                />
              </FormControl>
            </Box>

            <Box flexGrow={1}>
              <FormControl variant="outlined" fullWidth>
                <FormLabel component="legend">A/E No.2 (Jam)</FormLabel>
                <TextField
                  id="auxiliaryEngine2"
                  name="auxiliaryEngine2"
                  variant="outlined"
                  type="time"
                  defaultValue={formValues.auxiliaryEngine2}
                  onChange={handleChange}
                />
              </FormControl>
            </Box>
            <Box flexGrow={1}>
              <FormControl variant="outlined" fullWidth>
                <FormLabel component="legend">A/E No.3 (Jam)</FormLabel>
                <TextField
                  id="auxiliaryEngine3"
                  name="auxiliaryEngine3"
                  variant="outlined"
                  type="time"
                  defaultValue={formValues.auxiliaryEngine3}
                  onChange={handleChange}
                />
              </FormControl>
            </Box>
            <Box flexGrow={1}>
              <FormControl variant="outlined" fullWidth>
                <FormLabel component="legend">FIFI (Jam)</FormLabel>
                <TextField
                  id="fifiEngine"
                  name="fifiEngine"
                  variant="outlined"
                  type="time"
                  defaultValue={formValues.fifiEngine}
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
