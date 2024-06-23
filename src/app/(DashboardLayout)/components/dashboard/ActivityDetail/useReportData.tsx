// useReportData.ts
import { useState, useEffect } from "react";
import { fetchReport, updateReport } from "./api";

export const useReportData = (id: string) => {
  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchReport(id);
        setReport(data);
      } catch (error) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const updateReportData = async (idDetailActivity: string, data: any) => {
    try {
      await updateReport(idDetailActivity, data);
      const updatedData = await fetchReport(id);
      setReport(updatedData);
    } catch (error) {
      console.log(error);
      setError("Failed to update data");
    }
  };

  return { report, loading, error, updateReportData };
};
