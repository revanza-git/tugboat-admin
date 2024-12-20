// api/tugboat.js
export const fetchShipData = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/Tugboat/ships`
  );
  return await response.json();
};

export const fetchTugboatActivities = async (searchInput = "") => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/Tugboat/tugboat-activity`
  );
  const data = await response.json();
  return data.filter(
    ({
      name,
      activityDate,
      author,
      activity,
      position,
    }: {
      name: string;
      activityDate: string;
      author: string;
      activity: string;
      position: string;
    }) => {
      const lowerCaseSearchInput = searchInput.toLowerCase();
      return (
        (name && name.toLowerCase().includes(lowerCaseSearchInput)) ||
        (activityDate && activityDate.includes(lowerCaseSearchInput)) ||
        (author && author.toLowerCase().includes(lowerCaseSearchInput)) ||
        (activity && activity.toLowerCase().includes(lowerCaseSearchInput)) ||
        (position && position.toLowerCase().includes(lowerCaseSearchInput))
      );
    }
  );
};

export const deleteShipActivity = async (idShipActivity: any) => {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/Tugboat/tugboat-activity/del/${idShipActivity}`;
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
