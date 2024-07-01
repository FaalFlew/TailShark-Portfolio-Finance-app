import React, { SyntheticEvent } from 'react'
import DeletePortfolio from '../DeletePortfolio/DeletePortfolio';

interface Props  {
    portfolioValue: string;
    onPortfolioDelete: (e: SyntheticEvent) => void;

}

const CardPortfolio = ({portfolioValue,onPortfolioDelete}: Props) => {
  return (
    <div className="">
    <p className="">{portfolioValue}</p>
    <DeletePortfolio
      portfolioValue={portfolioValue}
      onPortfolioDelete={onPortfolioDelete}
    />
  </div>
  )
}

export default CardPortfolio