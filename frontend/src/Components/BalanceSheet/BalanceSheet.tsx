import { useOutletContext } from 'react-router-dom';
import { CompanyBalanceSheet } from '../../Types/company';
import React, { useEffect, useState } from 'react'
import { getBalanceSheet } from '../../Api/companyDataApi';
import { handleApiResponse } from '../../Utils/apiResponseHandler';
import RatioList from '../RatioList/RatioList';
import Spinner from '../Spinner/Spinner';
import { balanceSheetConfig } from '../../Utils/companyTableConfigs';

type Props = {}

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
                <RatioList config={balanceSheetConfig} data={balanceSheet}/>
            ) : (
              <><p>{serverError}</p>
                <Spinner isLoading={true} /></>
            )}
        </div>
    )
}

export default BalanceSheet
