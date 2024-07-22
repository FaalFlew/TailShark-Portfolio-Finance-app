import axios, { AxiosResponse } from "axios";
import { CompanyKeyMetrics, CompanyProfile, CompanySearch } from "./company";
import { apiRequest } from './apiMethod';
import { financeApiPath } from "./environment";

export interface SearchResponse {
    data: CompanySearch[];
}

export const searchCompanies = async (query: string): Promise<AxiosResponse<SearchResponse> | string> => {
    const url = `${financeApiPath}search-ticker?query=${query}&limit=10&exchange=NASDAQ&apikey=${process.env.REACT_APP_API_KEY}`;
    return apiRequest<SearchResponse>(url);
}

export const getCompanyProfile = async (query: string): Promise<AxiosResponse<CompanyProfile[]> | string> => {
    const url = `${financeApiPath}profile/${query}?apikey=${process.env.REACT_APP_API_KEY}`;
    return apiRequest<CompanyProfile[]>(url);
}

export const getKeyMetrics = async (query: string): Promise<AxiosResponse<CompanyKeyMetrics[]> | string> => {
    const url = `${financeApiPath}key-metrics-ttm/${query}?apikey=${process.env.REACT_APP_API_KEY}`;
    return apiRequest<CompanyKeyMetrics[]>(url);
}
