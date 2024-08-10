import React, { SyntheticEvent } from 'react'
import Button from '../../Button/Button';

interface Props {
    onPortfolioDelete: (e: SyntheticEvent) => void;
    portfolioValue: string;
}

const DeletePortfolio = ({onPortfolioDelete, portfolioValue}: Props) => {
  return (
    <form onSubmit={onPortfolioDelete}>
        <input hidden={true} value={portfolioValue} />
        <Button label="Delete" type="delete" />
    </form>
  )
}

export default DeletePortfolio