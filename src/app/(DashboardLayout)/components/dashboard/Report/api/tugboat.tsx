// api/tugboat.js
export const fetchShipData = async () => {
  const response = await fetch("https://localhost:44317/Tugboat/ships");
  return await response.json();
};

export const fetchTugboatActivities = async (searchInput = "") => {
  const response = await fetch(
    "https://localhost:44317/Tugboat/tugboat-activity"
  );
  const data = await response.json();
  return data.filter(
    ({ name, activityDate }: { name: string; activityDate: string }) => {
      const lowerCaseSearchInput = searchInput.toLowerCase();
      return (
        (name && name.toLowerCase().includes(lowerCaseSearchInput)) ||
        (activityDate && activityDate.includes(lowerCaseSearchInput))
      );
    }
  );
};
