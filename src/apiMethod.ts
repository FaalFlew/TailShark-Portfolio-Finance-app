
import axios, { AxiosResponse } from "axios";
import { AxiosErrorHandler } from "./Helpers/AxiosErrorHandler";
export const apiRequest = async <T>(url: string): Promise<AxiosResponse<T> | string> => {
    {
    try {
        const response = await axios.get<T>(url);
        return response;
    } catch (error: any) {
        return AxiosErrorHandler(error);
    }
}
}