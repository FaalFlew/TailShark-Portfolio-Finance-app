import { ErrorCodes } from "../Utils/ErrorCodes";
import axios, { AxiosError } from "axios";

export class CustomError extends Error {
  public code: ErrorCodes;
  public originalError?: AxiosError | unknown;

  constructor(
    code: ErrorCodes,
    message: string,
    originalError?: AxiosError | unknown
  ) {
    super(message);
    this.code = code;
    this.originalError = originalError;
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

export const AxiosErrorHandler = (error: unknown): CustomError => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      const status = error.response.status;
      if (status >= 500) {
        return new CustomError(
          ErrorCodes.SERVER_ERROR,
          `Server error: ${status} - ${error.response.statusText}`,
          error
        );
      } else if (status >= 400) {
        return new CustomError(
          ErrorCodes.CLIENT_ERROR,
          `Client error: ${status} - ${error.response.statusText}`,
          error
        );
      }
    } else if (error.request) {
      return new CustomError(
        ErrorCodes.NETWORK_ERROR,
        "No response from the server. Please check your network connection.",
        error
      );
    } else if (error.message === "Network Error") {
      return new CustomError(
        ErrorCodes.NETWORK_ERROR,
        "Network error: Please check your internet connection.",
        error
      );
    } else if (error.code === "ECONNABORTED") {
      return new CustomError(
        ErrorCodes.TIMEOUT_ERROR,
        "Request timeout: The server took too long to respond.",
        error
      );
    }
  }

  return new CustomError(
    ErrorCodes.UNEXPECTED_ERROR,
    "An unexpected error has occurred.",
    error
  );
};
