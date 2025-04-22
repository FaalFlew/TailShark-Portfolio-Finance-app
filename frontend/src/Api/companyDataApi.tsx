import axios, { AxiosResponse } from "axios";
import {
  CompanyBalanceSheet,
  CompanyCashFlow,
  CompanyIncomeStatement,
  CompanyKeyMetrics,
  CompanyProfile,
  CompanySearch,
  CompanySymbolList,
  CompanyTenK,
  CompanyQuote,
} from "../Types/company";
import { apiRequest } from "./apiMethod";
import { financeApiPath, finnhubApiPath } from "../environment";
import { Result } from "../Types/apiTypes";
export interface SearchResponse {
  data: CompanySearch[];
}

export type Error = string;

export const searchSymbols = async (): Promise<
  Result<AxiosResponse<CompanySymbolList[]>>
> => {
  const url = `${finnhubApiPath}symbol?exchange=US&mic=XNAS&securityType=Common%20Stock&token=${process.env.REACT_APP_FINNHUB_API_KEY}`;
  return apiRequest<CompanySymbolList[]>(url);
};

export const getCompanyQuote = async (
  query: string
): Promise<Result<AxiosResponse<CompanyQuote[]>>> => {
  const url = `${financeApiPath}quote/${query}?apikey=${process.env.REACT_APP_API_KEY}`;
  return apiRequest<CompanyQuote[]>(url);
};

export const searchCompanies = async (
  query: string
): Promise<Result<AxiosResponse<SearchResponse>>> => {
  const url = `${financeApiPath}search-ticker?query=${query}&limit=6&exchange=NASDAQ,NYSE&apikey=${process.env.REACT_APP_API_KEY}`;
  return apiRequest<SearchResponse>(url);
};

export const getCompanyProfile = async (
  query: string
): Promise<Result<AxiosResponse<CompanyProfile[]>>> => {
  const url = `${financeApiPath}profile/${query}?apikey=${process.env.REACT_APP_API_KEY}`;
  return apiRequest<CompanyProfile[]>(url);
};

export const getKeyMetrics = async (
  query: string
): Promise<Result<AxiosResponse<CompanyKeyMetrics[]>>> => {
  const url = `${financeApiPath}key-metrics-ttm/${query}?limit=40&apikey=${process.env.REACT_APP_API_KEY}`;
  return apiRequest<CompanyKeyMetrics[]>(url);
};

export const getIncomeStatement = async (
  query: string
): Promise<Result<AxiosResponse<CompanyIncomeStatement[]>>> => {
  const url = `${financeApiPath}income-statement/${query}?limit=50&apikey=${process.env.REACT_APP_API_KEY}`;
  return apiRequest<CompanyIncomeStatement[]>(url);
};

export const getBalanceSheet = async (
  query: string
): Promise<Result<AxiosResponse<CompanyBalanceSheet[]>>> => {
  const url = `${financeApiPath}balance-sheet-statement/${query}?limit=40&apikey=${process.env.REACT_APP_API_KEY}`;
  return apiRequest<CompanyBalanceSheet[]>(url);
};

export const getCashFlowStatement = async (
  query: string
): Promise<Result<AxiosResponse<CompanyCashFlow[]>>> => {
  const url = `${financeApiPath}cash-flow-statement/${query}?limit=40&apikey=${process.env.REACT_APP_API_KEY}`;
  return apiRequest<CompanyCashFlow[]>(url);
};

export const getTenK = async (
  query: string
): Promise<Result<AxiosResponse<CompanyTenK[]>>> => {
  const url = `${financeApiPath}sec_filings/${query}?type=10-k&page=0&apikey=${process.env.REACT_APP_API_KEY}`;
  return apiRequest<CompanyTenK[]>(url);
};
