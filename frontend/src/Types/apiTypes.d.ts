import { CustomError } from "../Helpers/AxiosErrorHandler";

export type Result<T> = T | CustomError;