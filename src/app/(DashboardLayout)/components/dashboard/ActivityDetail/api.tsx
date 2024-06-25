// api.ts
const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/Tugboat/detail-activity`;

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

export const addActivityDetail = async (data: any) => {
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

export const deleteDetailActivity = async (idDetailActivity: any) => {
  const url = `${BASE_URL}/del/${idDetailActivity}`;
  try {
    const response = await fetch(url, {
      method: "DELETE", // Specify the method
    });
    if (!response.ok) {
      throw new Error("Failed to delete the Detail activity");
    }
    console.log("Detail activity deleted successfully");
    // Handle success response
  } catch (error) {
    console.error("Error deleting Detail activity:", error);
    // Handle errors
  }
};
