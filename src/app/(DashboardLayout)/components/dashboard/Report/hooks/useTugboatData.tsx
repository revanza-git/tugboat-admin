// hooks/useTugboatData.js
import { useState, useEffect } from "react";
import { fetchShipData, fetchTugboatActivities } from "../api/tugboat";

const useTugboatData = () => {
  const [searchInput, setSearchInput] = useState("");
  const [shipData, setShipData] = useState([]);
  const [tugboatActivities, setTugboatActivities] = useState([]);

  useEffect(() => {
    fetchData();
  }, [searchInput]);

  const fetchData = async () => {
    const shipDataResult = await fetchShipData(); // Assuming this does not depend on searchInput
    const tugboatActivitiesResult = await fetchTugboatActivities(searchInput);
    setShipData(shipDataResult);
    setTugboatActivities(tugboatActivitiesResult);
  };

  return {
    shipData,
    tugboatActivities,
    searchInput,
    setSearchInput,
    fetchData,
  };
};

export default useTugboatData;
