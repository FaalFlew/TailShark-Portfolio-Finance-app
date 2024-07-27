import { CompanyBalanceSheet, CompanyCashFlow, CompanyIncomeStatement, CompanyKeyMetrics } from "../Types/company";

export const cashFlowConfig = [
    {
      label: "Date",
      render: (company: CompanyCashFlow) => company.date,
    },
    {
      label: "Operating Cashflow",
      render: (company: CompanyCashFlow) => company.operatingCashFlow,
    },
    {
      label: "Investing Cashflow",
      render: (company: CompanyCashFlow) =>
        company.netCashUsedForInvestingActivites,
    },
    {
      label: "Financing Cashflow",
      render: (company: CompanyCashFlow) =>
        company.netCashUsedProvidedByFinancingActivities,
    },
    {
      label: "Cash At End of Period",
      render: (company: CompanyCashFlow) => company.cashAtEndOfPeriod,
    },
    {
      label: "CapEX",
      render: (company: CompanyCashFlow) => company.capitalExpenditure,
    },
    {
      label: "Issuance Of Stock",
      render: (company: CompanyCashFlow) => company.commonStockIssued,
    },
    {
      label: "Free Cash Flow",
      render: (company: CompanyCashFlow) => company.freeCashFlow,
    },
  ];

  
export const balanceSheetConfig = [
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
  
  
export const profileConfig = [
    {
      label: "Market Cap",
      render: (company: CompanyKeyMetrics) => company.marketCapTTM,
      subTitle: "Total value of all a company's shares of stock",
    },
    {
      label: "Current Ratio",
      render: (company: CompanyKeyMetrics) => company.currentRatioTTM,
      subTitle:
        "Measures the companies ability to pay short term debt obligations",
    },
    {
      label: "Return On Equity",
      render: (company: CompanyKeyMetrics) => company.roeTTM,
      subTitle:
        "Return on equity is the measure of a company's net income divided by its shareholder's equity",
    },
    {
      label: "Return On Assets",
      render: (company: CompanyKeyMetrics) => company.returnOnTangibleAssetsTTM,
      subTitle:
        "Return on assets is the measure of how effective a company is using its assets",
    },
    {
      label: "Free Cashflow Per Share",
      render: (company: CompanyKeyMetrics) => company.freeCashFlowPerShareTTM,
      subTitle:
        "Return on assets is the measure of how effective a company is using its assets",
    },
    {
      label: "Book Value Per Share TTM",
      render: (company: CompanyKeyMetrics) => company.bookValuePerShareTTM,
      subTitle:
        "Book value per share indicates a firm's net asset value (total assets - total liabilities) on per share basis",
    },
    {
      label: "Divdend Yield TTM",
      render: (company: CompanyKeyMetrics) => company.dividendYieldTTM,
      subTitle: "Shows how much a company pays each year relative to stock price",
    },
    {
      label: "Capex Per Share TTM",
      render: (company: CompanyKeyMetrics) => company.capexPerShareTTM,
      subTitle:
        "Capex is used by a company to aquire, upgrade, and maintain physical assets",
    },
    {
      label: "Graham Number",
      render: (company: CompanyKeyMetrics) => company.grahamNumberTTM,
      subTitle:
        "This is the upperbouind of the price range that a defensive investor should pay for a stock",
    },
    {
      label: "PE Ratio",
      render: (company: CompanyKeyMetrics) => company.peRatioTTM,
      subTitle:
        "This is the upperbouind of the price range that a defensive investor should pay for a stock",
    },
  ];

export const incomeStatementConfig = [
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
  