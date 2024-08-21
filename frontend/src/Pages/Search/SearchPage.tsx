import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import { searchCompanies } from "../../Api/companyDataApi";
import { CompanySearch } from "../../Types/company";
import CardList from "../../Components/CardList/CardList";
import ListPortfolio from "../../Components/Portfolio/ListPortfolio/ListPortfolio";
import Search from "../../Components/Search/Search";
import { handleApiResponse } from "../../Utils/apiResponseHandler";
import { companySearchStore, fetchData, saveData } from "../../Utils/DB/DB";

interface Props {}

const SearchPage = (props: Props) => {
  const [ticker, setTicker] = useState<string>("");
  const [portfolioValues, setPortfolioValues] = useState<string[]>([]);
  const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
  const [serverError, setServerError] = useState<string>("");

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const upperCaseValue = e.target.value.toUpperCase();
    setTicker(upperCaseValue);
    console.log(upperCaseValue);
  };

  const onSearchSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const cachedData = await fetchData<CompanySearch[]>(companySearchStore,  ticker);
      if (cachedData) {
        setSearchResult(cachedData);
      } else {
        const response = await searchCompanies(ticker);
        const result = handleApiResponse(response);
        if (result.error) {
          setServerError(result.error);
        } else if (result.data) {
          const data = result.data;
          setSearchResult(data);
          await saveData(companySearchStore, ticker,data);
        }
      }
    } catch (error) {
      console.log(typeof ticker);
      console.error(error,"Error fetching companySearchStore:", error);
      setServerError("Error fetching companySearchStore.");
    }
  };

  const onPortfolioCreate = (e: any) => {
    e.preventDefault();
    const exists = portfolioValues.find((value) => value === e.target[0].value);
    if (exists) return;
    const updatedPortfolio = [...portfolioValues, e.target[0].value];
    setPortfolioValues(updatedPortfolio);
  };

  const onPortfolioDelete = (e: any) => {
    e.preventDefault();
    const removed = portfolioValues.filter((value) => {
      console.log("val" + value);
      console.log("target" + e.target[0].value);

      return value !== e.target[0].value;
    });
    setPortfolioValues(removed);
  };
  return (
    <>
      <main className="main">
        <Search
          onSearchSubmit={onSearchSubmit}
          search={ticker}
          handleSearchChange={handleSearchChange}
        />
        <ListPortfolio
          portfolioValues={portfolioValues}
          onPortfolioDelete={onPortfolioDelete}
        />
        <CardList
          searchResults={searchResult}
          onPortfolioCreate={onPortfolioCreate}
        />
        {serverError && <h1>{serverError}</h1>}
      </main>
    </>
  );
};

export default SearchPage;
