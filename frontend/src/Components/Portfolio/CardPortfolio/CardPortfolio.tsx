import React, { SyntheticEvent } from 'react'
import DeletePortfolio from '../DeletePortfolio/DeletePortfolio';
import { Link } from 'react-router-dom';

interface Props  {
    portfolioValue: string;
    onPortfolioDelete: (e: SyntheticEvent) => void;

}

const CardPortfolio = ({portfolioValue,onPortfolioDelete}: Props) => {
  return (
    <div className="">
    <Link to={`/company/${portfolioValue}`} className="">{portfolioValue}</Link>
    <DeletePortfolio
      portfolioValue={portfolioValue}
      onPortfolioDelete={onPortfolioDelete}
    />
  </div>
  )
}

export default CardPortfolio