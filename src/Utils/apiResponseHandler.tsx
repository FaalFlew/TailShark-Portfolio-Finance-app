import { AxiosResponse } from "axios";

  export const handleApiResponse = (value:  AxiosResponse | string) => {
    if (typeof value === 'string') {
      return { error: value };
    } else if (value?.data && Array.isArray(value.data)) {
      return { data: value.data };
    } else {
      console.error("Error fetching data");
      return { error: "Error fetching data" };
    }
  };