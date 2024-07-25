import axios, { AxiosResponse } from "axios";
import { CompanyIncomeStatement, CompanyKeyMetrics, CompanyProfile, CompanySearch } from "../Types/company";
import { apiRequest } from './apiMethod';
import { financeApiPath } from "../environment";
import {Result} from '../Types/apiTypes'
export interface SearchResponse {
    data: CompanySearch[];
}

export type Error = string;

export const searchCompanies = async (query: string): Promise<Result<AxiosResponse<SearchResponse>>> => {
    const url = `${financeApiPath}search-ticker?query=${query}&limit=10&exchange=NASDAQ&apikey=${process.env.REACT_APP_API_KEY}`;
    return apiRequest<SearchResponse>(url);
}

export const getCompanyProfile = async (query: string): Promise<Result<AxiosResponse<CompanyProfile[]>>> => {
    const url = `${financeApiPath}profile/${query}?apikey=${process.env.REACT_APP_API_KEY}`;
    return apiRequest<CompanyProfile[]>(url);
}

export const getKeyMetrics = async (query: string): Promise<Result<AxiosResponse<CompanyKeyMetrics[]>>> => {
    const url = `${financeApiPath}key-metrics-ttm/${query}?limit=40&apikey=${process.env.REACT_APP_API_KEY}`;
    return apiRequest<CompanyKeyMetrics[]>(url);
}

export const getIncomeStatement = async (query: string): Promise<Result<AxiosResponse<CompanyIncomeStatement[]>>> => {
    const url = `${financeApiPath}income-statement/${query}?limit=50&apikey=${process.env.REACT_APP_API_KEY}`;
    return apiRequest<CompanyIncomeStatement[]>(url);
}