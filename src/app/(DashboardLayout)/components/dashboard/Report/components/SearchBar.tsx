// components/SearchBar.js
import React from "react";
import { TextField, Button, Grid, Box } from "@mui/material";

const SearchBar = ({
  searchInput,
  setSearchInput,
  handleSearch,
}: {
  searchInput: string;
  setSearchInput: (input: string) => void;
  handleSearch: () => void;
}) => (
  <Grid container spacing={2} sx={{ mb: 2 }}>
    <Grid item xs={12} sm={8} md={10} lg={11} sx={{ flexGrow: 1 }}>
      <TextField
        id="search-field"
        label="Search"
        variant="outlined"
        fullWidth
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
    </Grid>
    <Grid item xs={12} sm={4} md={2} lg={1}>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSearch}
        >
          Search
        </Button>
      </Box>
    </Grid>
  </Grid>
);

export default SearchBar;
