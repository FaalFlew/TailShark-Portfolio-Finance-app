import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SearchBar.css";
import { searchSymbols } from "../../Api/companyDataApi";
import { handleApiResponse } from "../../Utils/apiResponseHandler";
import { CustomError } from "../../Helpers/AxiosErrorHandler";
import { CompanySymbolList } from "../../Types/company";

let debounceTimeoutId: ReturnType<typeof setTimeout>;

const debounce = (func: Function, delay: number) => {
  return (...args: any[]) => {
    if (debounceTimeoutId) {
      clearTimeout(debounceTimeoutId);
    }
    debounceTimeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const SearchBar = () => {
  const [companySymbols, setCompanySymbols] = useState<CompanySymbolList[]>([]);
  const [serverError, setServerError] = useState<CustomError>();
  const [inputValue, setInputValue] = useState<string>("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const companySymbolFetch = async () => {
      setIsLoading(true);
      try {
        const response = await searchSymbols();
        const result = handleApiResponse(response);
        if (result instanceof CustomError) {
          setServerError(result);
          console.log(result, "error");
        } else if (result.data) {
          const data = result.data;
          console.log(data, "success");
          setCompanySymbols(data);
        }
      } catch (error) {
        console.error("Error fetching balance sheet:", error);
      } finally {
        setIsLoading(false);
      }
    };

    companySymbolFetch();
  }, []);

  const debouncedInputChange = debounce((userData: string) => {
    if (userData) {
      const filteredArray = companySymbols
        .filter((symbolObj) =>
          symbolObj.symbol.toUpperCase().startsWith(userData.toUpperCase())
        )
        .slice(0, 6)
        .map((symbolObj) => symbolObj.symbol);
      setFilteredSuggestions(filteredArray);
      setIsActive(true);
      setSelectedIndex(-1);
    } else {
      setFilteredSuggestions([]);
      setIsActive(false);
    }
  }, 150);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const userData = e.target.value.toUpperCase();
    setInputValue(userData);
    debouncedInputChange(userData);
  };

  const renderSuggestions = () => {
    if (filteredSuggestions.length === 0 && inputValue) {
      return <li>{inputValue}</li>;
    }

    return filteredSuggestions.map((suggestion, index) => (
      <li
        key={index}
        className={selectedIndex === index ? "selected" : ""}
        onClick={() => handleSuggestionClick(suggestion)}
      >
        <Link className="full-link" to={`/company/${suggestion}/profile`}>
          <img
            src={`https://financialmodelingprep.com/image-stock/${suggestion}.png`}
            height="18px"
            width="18px"
            alt={suggestion}
            style={{ marginRight: "8px", verticalAlign: "middle" }}
          />
          {suggestion}
        </Link>
      </li>
    ));
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setFilteredSuggestions([]);
    setIsActive(false);
    setSelectedIndex(-1);
    navigateToSymbol(suggestion);
    setInputValue("");
  };

  const handleInputFocus = () => {
    setIsActive(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prevIndex) =>
        prevIndex < filteredSuggestions.length - 1 ? prevIndex + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : filteredSuggestions.length - 1
      );
    } else if (e.key === "Enter") {
      clearTimeout(debounceTimeoutId);

      if (selectedIndex >= 0) {
        handleSuggestionClick(filteredSuggestions[selectedIndex]);
      } else {
        setIsActive(false);
        navigateToSymbol(inputValue);
      }
    }
  };

  const navigateToSymbol = (symbol: string) => {
    navigate(`/company/${symbol}/profile`);
    inputRef.current?.blur();
    setInputValue("");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target as Node) &&
        isActive
      ) {
        setIsActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isActive]);

  return (
    <div ref={searchBarRef} className="container">
      <div className="searchInput">
        <input
          ref={inputRef}
          autoComplete="off"
          autoCorrect="off"
          maxLength={20}
          spellCheck="false"
          type="text"
          placeholder={isLoading ? "Loading..." : "Search"}
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          className={isLoading ? "loading" : ""}
        />
        {isActive && (
          <div className="resultBox">
            <ul>{renderSuggestions()}</ul>
          </div>
        )}
        <div className="icon">
          <i className="bx bx-search"></i>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
