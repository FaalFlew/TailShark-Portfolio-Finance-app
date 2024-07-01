import React, { SyntheticEvent } from 'react'
import CardPortfolio from '../CardPortfolio/CardPortfolio'

interface Props  {
  portfolioValues: string[];
  onPortfolioDelete: (e: SyntheticEvent) => void;

}

const ListPortfolio = ({portfolioValues,onPortfolioDelete}: Props) => {
  return (
<section id="portfolio">
      <h2 className="">
        My Portfolio
      </h2>
      <div className="">
        <>
          {portfolioValues.length > 0 ? (
            portfolioValues.map((portfolioValue) => {
              return (
                <CardPortfolio
                  portfolioValue={portfolioValue}
                  onPortfolioDelete={onPortfolioDelete}
                />
              );
            })
          ) : (
            <h3 className="">
              Your portfolio is empty.
            </h3>
          )}
        </>
      </div>
    </section>
  )
}

export default ListPortfolio