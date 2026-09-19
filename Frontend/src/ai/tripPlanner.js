import { axiosInstance } from "../utils/axios";

export const getTripPlan = async (trip) => {
  const { data } = await axiosInstance.post("/v1/rent/trip", trip);
  const response = typeof data === "string" ? JSON.parse(data) : data;
  const result = response.data ?? response.date ?? response;

  return {
    ...result,
    plan: {
      ...result.plan,
      days: result.plan.days.map((day) => ({
        ...day,
        activities: Array.isArray(day.activities)
          ? day.activities
          : [day.activities],
      })),
    },
  };
};
