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
    ({
      name,
      activityDate,
      author,
    }: {
      name: string;
      activityDate: string;
      author: string;
    }) => {
      const lowerCaseSearchInput = searchInput.toLowerCase();
      return (
        (name && name.toLowerCase().includes(lowerCaseSearchInput)) ||
        (activityDate && activityDate.includes(lowerCaseSearchInput)) ||
        (author && author.toLowerCase().includes(lowerCaseSearchInput))
      );
    }
  );
};

export const deleteShipActivity = async (idShipActivity: any) => {
  const url = `https://localhost:44317/Tugboat/tugboat-activity/del/${idShipActivity}`;
  try {
    const response = await fetch(url, {
      method: "DELETE", // Specify the method
    });
    if (!response.ok) {
      throw new Error("Failed to delete the ship activity");
    }
    console.log("Ship activity deleted successfully");
    // Handle success response
  } catch (error) {
    console.error("Error deleting ship activity:", error);
    // Handle errors
  }
};
