import axios from "axios";
import { CompanyProfile, CompanySearch } from "./comapny";

export interface SearchResponse {
    data:CompanySearch[];
}

export const searchCompanies = async (query: string) => {

    try {
        const data = await axios.get<SearchResponse>(`https://financialmodelingprep.com/api/v3/search-ticker?query=${query}&limit=10&exchange=NASDAQ&apikey=${process.env.REACT_APP_API_KEY}`);
        console.log(data);
        return data; 
    } catch (error) {
        
        if(axios.isAxiosError(error)){
            console.log("Error: Axios message: ", error.message);
            return error.message;
        } else {
            console.log("unexpected error: ", error);
            return "an unexpected error has occured";
        }
    }
}

export const getCompanyProfile = async (query: string) => {
    try {
        const data = await axios.get<CompanyProfile[]>(
            `https://financialmodelingprep.com/api/v3/profile/${query}?apikey=${process.env.REACT_APP_API_KEY}`
        )
        return data;
    } catch (error:any) { 
        console.log("error message from API: ", error.message);
    }

}