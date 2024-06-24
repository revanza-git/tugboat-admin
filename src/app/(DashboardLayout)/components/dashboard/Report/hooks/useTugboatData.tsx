// hooks/useTugboatData.js
import { useState, useEffect } from "react";
import {
  fetchShipData,
  fetchTugboatActivities,
  deleteShipActivity,
} from "../api/tugboat";

const useTugboatData = () => {
  const [searchInput, setSearchInput] = useState("");
  const [shipData, setShipData] = useState([]);
  const [tugboatActivities, setTugboatActivities] = useState<{ id: string }[]>(
    []
  );

  useEffect(() => {
    fetchData();
  }, [searchInput]);

  const fetchData = async () => {
    const shipDataResult = await fetchShipData(); // Assuming this does not depend on searchInput
    const tugboatActivitiesResult = await fetchTugboatActivities(searchInput);
    setShipData(shipDataResult);
    setTugboatActivities(tugboatActivitiesResult);
  };

  const handleDeleteShipActivity = async (idShipActivity: any) => {
    try {
      await deleteShipActivity(idShipActivity);
      // Filter out the deleted activity from the tugboatActivities state
      const tugboatActivitiesResult = await fetchTugboatActivities(searchInput);
      setTugboatActivities(tugboatActivitiesResult);
      console.log("Ship activity deleted successfully");
    } catch (error) {
      console.error("Error deleting ship activity:", error);
    }
  };

  return {
    shipData,
    tugboatActivities,
    searchInput,
    setSearchInput,
    fetchData,
    handleDeleteShipActivity,
  };
};

export default useTugboatData;
