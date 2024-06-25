// api.ts
const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/Tugboat/tank-activity`;
const TANK_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/Tugboat/tanks`;

export const fetchReport = async (id: string) => {
  const response = await fetch(`${BASE_URL}/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch report");
  }
  return response.json();
};

export const fetchReportDetail = async (id: string) => {
  const response = await fetch(`${BASE_URL}/detail/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch report");
  }
  return response.json();
};

export const fetchTankData = async () => {
  const response = await fetch(`${TANK_URL}`);
  if (!response.ok) {
    throw new Error("Failed to fetch report");
  }
  return response.json();
};

export const updateReport = async (id: string, data: any) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to update the activity detail");
  }
  return response;
};

export const addTankDetail = async (data: any) => {
  // Replace this URL with your actual API endpoint
  const response = await fetch(`${BASE_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response;
};

export const deleteTankActivity = async (idTankActivity: any) => {
  const url = `${BASE_URL}/del/${idTankActivity}`;
  try {
    const response = await fetch(url, {
      method: "DELETE", // Specify the method
    });
    if (!response.ok) {
      throw new Error("Failed to delete the Tank activity");
    }
    console.log("Tank activity deleted successfully");
    // Handle success response
  } catch (error) {
    console.error("Error deleting Tank activity:", error);
    // Handle errors
  }
};
