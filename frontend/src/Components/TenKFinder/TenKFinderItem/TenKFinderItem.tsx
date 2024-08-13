import { Link } from 'react-router-dom';
import { CompanyTenK } from '../../../Types/company'
import React from 'react'

type Props = {
    tenK:CompanyTenK;
}

const TenKFinderItem = ({tenK}: Props) => {
    const fillingDate = new Date(tenK.fillingDate).getFullYear();
  return (
    <Link
    reloadDocument
    to={tenK.finalLink}
    type="button"
    className=""
    > 10k - {tenK.symbol} - {fillingDate}</Link>
  )
}

export default TenKFinderItem