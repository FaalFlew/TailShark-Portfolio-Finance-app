import logo from './logo.svg';
import './App.css';
import CardList from './Components/CardList';
import Search from './Components/Search';
import { useState, ChangeEvent, SyntheticEvent } from 'react';
import { CompanySearch } from './comapny';
import { searchCompanies } from './api';

function App() {

  const [search,setSearch] = useState<string>('');
  const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
  const [serverError, setServerError] = useState<string>("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
  {
      setSearch(e.target.value);
      console.log(e);
  };

  const onClick = async (e: SyntheticEvent) => 
  {
      const result = await searchCompanies(search);
      if (typeof result == 'string') 
      {
        setServerError(result);
      } else if (Array.isArray(result.data))
      {
        setSearchResult(result.data);
      }
      console.log("lol",setSearchResult);
  };
  
  return (
    <div className="App">
      <Search onClick={onClick} search={search} handleChange={handleChange} />
      <CardList searchResults={searchResult} />
      {/*serverError && <h1>{serverError}</h1>*/}
    </div>
  );
}

export default App;
