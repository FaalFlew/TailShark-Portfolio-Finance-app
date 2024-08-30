import { CustomError } from "../Helpers/AxiosErrorHandler";
import { AxiosResponse } from "axios";

export const handleApiResponse = (value: AxiosResponse | CustomError) => {
  if (value instanceof CustomError) {
    return value;
  } else if (value?.data && Array.isArray(value.data)) {
    return { data: value.data };
  } else {
    console.error("Error fetching data");
    return { error: "Error fetching data" };
  }
};