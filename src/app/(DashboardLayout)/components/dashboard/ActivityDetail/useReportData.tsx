// useReportData.ts
import { useState, useEffect } from "react";
import { fetchReport, updateReport, deleteDetailActivity } from "./api";

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

  const handleDeleteDetailActivity = async (
    idDetailActivity: any,
    idShipActivity: any
  ) => {
    try {
      await deleteDetailActivity(idDetailActivity);
      // Filter out the deleted activity from the tugboatActivities state
      const updatedData = await fetchReport(idShipActivity);
      setReport(updatedData);
      console.log("Ship activity deleted successfully");
    } catch (error) {
      console.error("Error deleting ship activity:", error);
    }
  };

  return {
    report,
    loading,
    error,
    updateReportData,
    handleDeleteDetailActivity,
  };
};
