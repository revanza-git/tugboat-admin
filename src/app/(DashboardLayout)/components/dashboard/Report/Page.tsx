import React from "react";
import BaseCard from "../../shared/DashboardCard";
import SearchBar from "./components/SearchBar";
import ActivityTable from "./components/ActivityTable";
import useTugboatData from "./hooks/useTugboatData";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  const {
    tugboatActivities,
    shipData,
    searchInput,
    setSearchInput,
    fetchData,
    handleDeleteShipActivity,
  } = useTugboatData();

  return (
    <BaseCard title="Laporan Terbaru">
      <>
        <SearchBar
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          handleSearch={fetchData}
        />
        <ActivityTable
          tugboatActivities={tugboatActivities}
          shipData={shipData}
          router={router}
          handleDeleteShipActivity={handleDeleteShipActivity}
        />
      </>
    </BaseCard>
  );
};

export default Page;
