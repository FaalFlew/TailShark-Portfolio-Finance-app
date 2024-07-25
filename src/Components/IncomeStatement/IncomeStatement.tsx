import { Result } from '@/Types/apiTypes';
import { getIncomeStatement } from '../../Api/api';
import { CompanyIncomeStatement } from '@/Types/company';
import { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router';
import { handleApiResponse } from '../..//Utils/apiResponseHandler';
import Table from '../Table/Table';


type Props = {}


const configs = [
  {
    label: "Date",
    render: (company: CompanyIncomeStatement) => company.date,
  },
  {
    label: "Revenue",
    render: (company: CompanyIncomeStatement) => company.revenue,
  },
  {
    label: "Cost Of Revenue",
    render: (company: CompanyIncomeStatement) => company.costOfRevenue,
  },
  {
    label: "Depreciation",
    render: (company: CompanyIncomeStatement) =>
      company.depreciationAndAmortization,
  },
  {
    label: "Operating Income",
    render: (company: CompanyIncomeStatement) => company.operatingIncome,
  },
  {
    label: "Income Before Taxes",
    render: (company: CompanyIncomeStatement) => company.incomeBeforeTax,
  },
  {
    label: "Net Income",
    render: (company: CompanyIncomeStatement) => company.netIncome,
  },
  {
    label: "Net Income Ratio",
    render: (company: CompanyIncomeStatement) => company.netIncomeRatio,
  },
  {
    label: "Earnings Per Share",
    render: (company: CompanyIncomeStatement) => company.eps,
  },
  {
    label: "Earnings Per Diluted",
    render: (company: CompanyIncomeStatement) => company.epsdiluted,
  },
  {
    label: "Gross Profit Ratio",
    render: (company: CompanyIncomeStatement) => company.grossProfitRatio,
  },
  {
    label: "Opearting Income Ratio",
    render: (company: CompanyIncomeStatement) => company.operatingIncomeRatio,
  },
  {
    label: "Income Before Taxes Ratio",
    render: (company: CompanyIncomeStatement) => company.incomeBeforeTaxRatio,
  },
];


const IncomeStatement = (props: Props) => {
  const ticker = useOutletContext<string>();
  const [incomeStatement, setIncomeStatement] = useState<CompanyIncomeStatement[]>();
  const [error, setServerError] = useState<string>('');

  useEffect(() => {
    const incomeStatementFetch = async () => {
      const response = await getIncomeStatement(ticker);
      const result = handleApiResponse(response);

      if (result.error) {
        setServerError(result.error);
      } else {
        setIncomeStatement(result!.data);
      }
    }
    incomeStatementFetch()
  },[])


  return (
    <div>{incomeStatement ? <><Table config={configs} data={incomeStatement} /></>: <>Loading...</>}</div>
  )
}

export default IncomeStatement

