import React, { ChangeEvent, useState, SyntheticEvent } from "react";
import "./Search.css";

interface Props {
  onSearchSubmit: (e: SyntheticEvent) => void;
  search: string | undefined;
  handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Search: React.FC<Props> = ({
  onSearchSubmit,
  search,
  handleSearchChange,
}: Props): JSX.Element => {
  return (
    <section className="search-section">
      <div className="search-container">
        <form className="search-form" onSubmit={onSearchSubmit}>
          <input
            className="search-input"
            id="search-input"
            placeholder="Search by Ticker"
            value={search}
            onChange={handleSearchChange}
          ></input>
        </form>
      </div>
    </section>
  );
};

export default Search;
