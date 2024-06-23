// api.ts
const BASE_URL = "https://localhost:44317/Tugboat/detail-activity";

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
