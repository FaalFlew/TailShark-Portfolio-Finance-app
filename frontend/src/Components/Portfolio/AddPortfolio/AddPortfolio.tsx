import Button from '../../Button/Button';
import React, { SyntheticEvent } from 'react'

interface Props {
    onPortfolioCreate: (e: SyntheticEvent) => void;
    symbol:string;
}

const AddPortfolio = ({onPortfolioCreate, symbol}: Props) => {
  return (
    <div className="flex flex-col items-center justify-end flex-1 space-x-4 space-y-2 md:flex-row md:space-y-0">
      <form onSubmit={onPortfolioCreate}>
        <input readOnly={true} hidden={true} value={symbol} />
        <Button label="Add" type="add" />

      </form>
    </div>
  )
}

export default AddPortfolio