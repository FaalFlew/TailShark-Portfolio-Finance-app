export const incomeStatementProperties = [
    'symbol',
    'date',
    'revenue',
    'costOfRevenue',
    'depreciationAndAmortization',
    'operatingIncome',
    'incomeBeforeTax',
    'netIncome',
    'netIncomeRatio',
    'eps',
    'epsdiluted',
    'grossProfitRatio',
    'operatingIncomeRatio',
    'incomeBeforeTaxRatio'] as const;

  export const cashFlowProperties = [
    'symbol',
    'date',
    'operatingCashFlow',
    'netCashUsedForInvestingActivites',
    'netCashUsedProvidedByFinancingActivities',
    'cashAtEndOfPeriod',
    'capitalExpenditure',
    'commonStockIssued',
    'freeCashFlow'
  ] as const;


  export const balanceSheetProperties = [
    'symbol',
    'totalAssets',
    'totalCurrentAssets',
    'cashAndCashEquivalents',
    'propertyPlantEquipmentNet',
    'intangibleAssets',
    'longTermDebt',
    'otherCurrentLiabilities',
    'totalLiabilities',
    'totalCurrentLiabilities',
    'totalStockholdersEquity',
    'retainedEarnings',
  ] as const;

  export const profileProperties = [
    'symbol',
    'currentRatioTTM',
    'roeTTM',
    'returnOnTangibleAssetsTTM',
    'freeCashFlowPerShareTTM',
    'bookValuePerShareTTM',
    'dividendYieldTTM',
    'capexPerShareTTM',
    'grahamNumberTTM',
    'peRatioTTM',
  ] as const;