import axios, { AxiosResponse } from "axios";
import { CompanyProfile, CompanySearch } from "./comapny";
import { AxiosErrorHandler } from "./Helpers/AxiosErrorHandler";

export interface SearchResponse {
    data:CompanySearch[];
}

export const searchCompanies = async (query: string): Promise<AxiosResponse<SearchResponse>|string> => {

    try {
        const data = await axios.get<SearchResponse>(`https://financialmodelingprep.com/api/v3/search-ticker?query=${query}&limit=10&exchange=NASDAQ&apikey=${process.env.REACT_APP_API_KEY}`);
        console.log(data);
        return data; 
    } catch (error) {
        
        if (axios.isAxiosError(error)) {
            console.log("error message: ", error.message);
            return error.message;
          } else {
            console.log("unexpected error: ", error);
            return "An expected error has occured.";
          }
    }
}

export const getCompanyProfile = async (query: string):Promise<AxiosResponse<CompanyProfile[]>|string> => {
    try {
        const data = await axios.get<CompanyProfile[]>(
            `https://financialmodelingprep.com/api/v3/profile/${query}?apikey=${process.env.REACT_APP_API_KEY}`
        )
        return data;
    } catch (error:any) { 
      return AxiosErrorHandler(error);
    }

}