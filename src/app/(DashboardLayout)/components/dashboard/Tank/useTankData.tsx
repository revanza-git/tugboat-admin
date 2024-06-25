// useReportData.ts
import { useState, useEffect } from "react";
import {
  fetchReport,
  updateReport,
  deleteTankActivity,
  addTankDetail,
} from "./api";
import { useCallback } from "react";

export const useTankData = (id: string) => {
  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = useCallback(async () => {
    try {
      const data = await fetchReport(id);
      setReport(data);
    } catch (error) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  }, [id]); // Dependencies for useCallback

  useEffect(() => {
    fetchData();
  }, [fetchData]); // Dependency array for useEffect

  const updateReportData = async (idDetailActivity: string, data: any) => {
    try {
      await updateReport(idDetailActivity, data);
      const updatedData = await fetchReport(id);
      setReport(updatedData);
    } catch (error) {
      setError("Failed to update data");
    }
  };

  const handleAddTankActivity = async (idShipActivity: any, data: any) => {
    try {
      await addTankDetail(data);
      // Filter out the deleted activity from the tugboatActivities state
      const updatedData = await fetchReport(idShipActivity);
      setReport(updatedData);
      console.log("Ship activity deleted successfully");
    } catch (error) {
      console.error("Error deleting ship activity:", error);
    }
  };

  const handleDeleteTankActivity = async (
    idTankActivity: any,
    idShipActivity: any
  ) => {
    try {
      await deleteTankActivity(idTankActivity);
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
    fetchData,
    handleDeleteTankActivity,
  };
};
