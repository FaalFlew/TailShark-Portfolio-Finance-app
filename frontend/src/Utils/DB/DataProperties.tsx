export const incomeStatementProperties = [
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