// Report/Page.tsx
import React, { useState } from "react";
import BaseCard from "../../shared/DashboardCard";
import SearchBar from "./components/SearchBar";
import ActivityTable from "./components/ActivityTable"; // Ensure this path is correct
import useTugboatData from "./hooks/useTugboatData";
import { useRouter } from "next/navigation"; // Corrected import based on provided context

const Page = () => {
  const router = useRouter(); // Corrected based on standard Next.js routing

  const {
    tugboatActivities,
    shipData,
    searchInput,
    setSearchInput,
    fetchData,
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
        />
      </>
    </BaseCard>
  );
};

export default Page;
