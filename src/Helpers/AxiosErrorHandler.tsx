import axios from "axios";

export const AxiosErrorHandler = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    console.log("error message: ", error.message);
    return error.message;
  } else {
    console.log("unexpected error: ", error);
    return "An unexpected error has occurred.";
  }
};