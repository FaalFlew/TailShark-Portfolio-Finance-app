import { useOutletContext } from 'react-router-dom';
import { CompanyBalanceSheet } from '../../Types/company';
import React, { useEffect, useState } from 'react'
import { getBalanceSheet } from '../../Api/api';
import { handleApiResponse } from '../../Utils/apiResponseHandler';
import RatioList from '../RatioList/RatioList';

type Props = {}

const config = [
    {
      label: <div className="font-bold">Total Assets</div>,
      render: (company: CompanyBalanceSheet) => company.totalAssets,
    },
    {
      label: "Current Assets",
      render: (company: CompanyBalanceSheet) => company.totalCurrentAssets,
    },
    {
      label: "Total Cash",
      render: (company: CompanyBalanceSheet) => company.cashAndCashEquivalents,
    },
    {
      label: "Property & equipment",
      render: (company: CompanyBalanceSheet) => company.propertyPlantEquipmentNet,
    },
    {
      label: "Intangible Assets",
      render: (company: CompanyBalanceSheet) => company.intangibleAssets,
    },
    {
      label: "Long Term Debt",
      render: (company: CompanyBalanceSheet) => company.longTermDebt,
    },
    {
      label: "Total Debt",
      render: (company: CompanyBalanceSheet) => company.otherCurrentLiabilities,
    },
    {
      label: <div className="font-bold">Total Liabilites</div>,
      render: (company: CompanyBalanceSheet) => company.totalLiabilities,
    },
    {
      label: "Current Liabilities",
      render: (company: CompanyBalanceSheet) => company.totalCurrentLiabilities,
    },
    {
      label: "Long-Term Debt",
      render: (company: CompanyBalanceSheet) => company.longTermDebt,
    },
    {
      label: "Long-Term Income Taxes",
      render: (company: CompanyBalanceSheet) => company.otherLiabilities,
    },
    {
      label: "Stakeholder's Equity",
      render: (company: CompanyBalanceSheet) => company.totalStockholdersEquity,
    },
    {
      label: "Retained Earnings",
      render: (company: CompanyBalanceSheet) => company.retainedEarnings,
    },
  ];
  

const BalanceSheet = (props: Props) => {
    const ticker = useOutletContext<string>();
    const [serverError, setServerError] = useState<string>('');
    const [balanceSheet, setBalanceSheetData] = useState<CompanyBalanceSheet>();

    useEffect(() => {
        const getCompanyBalanceSheet = async () => {
            const cachedData = localStorage.getItem(`balanceSheet_${ticker}`);
            if (cachedData) {
                setBalanceSheetData(JSON.parse(cachedData));
            } else {
                const response = await getBalanceSheet(ticker);
                const result = handleApiResponse(response);
                if (result.error) {
                    setServerError(result.error);
                } else if (result.data) {
                    setBalanceSheetData(result.data[0]);
                    localStorage.setItem(`balanceSheet_${ticker}`, JSON.stringify(result.data[0]));
                    console.log(result.data[0], "balance");
                }
            }
        }
        getCompanyBalanceSheet();
    }, [ticker]);

    return (
        <div>
            <h2>Balance Sheet</h2>
            {balanceSheet ? (
                <RatioList config={config} data={balanceSheet}/>
            ) : (
                <p>Loading... {serverError}</p>
            )}
        </div>
    )
}

export default BalanceSheet
