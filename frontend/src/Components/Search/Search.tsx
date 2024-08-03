import React, {ChangeEvent, useState, SyntheticEvent} from 'react'


interface Props {
    onSearchSubmit: (e: SyntheticEvent) => void;
    search: string | undefined;
    handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;

}

const Search: React.FC <Props>= ({onSearchSubmit, search, handleSearchChange}: Props): JSX.Element => {

    return (
      <section className="">
      <div className="">
        <form
          className=""
          onSubmit={onSearchSubmit}
        >
          <input
            className=""
            id="search-input"
            placeholder="Search companies"
            value={search}
            onChange={handleSearchChange}
          ></input>
        </form>
      </div>
    </section>
  )
}

export default Search