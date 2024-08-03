import React from 'react'
import '../../Shared/Css/Global.css'
import Table from '../../Components/Table/Table'
import RatioList from '../../Components/RatioList/RatioList'
import { testIncomeStatementData } from '../../Components/Table/TestData'

type Props = {}

const tableConfig = [
  {
    label: "Market Cap",
    render: (company: any) => company.marketCapTTM,
    subTitle: "Total value of all a company's shares of stock",
  },

]
const DesignPage = (props: Props) => {
  return (
    
    <main>
    <h1>TailShark Design Page</h1>
    <h2>This is TailShark's design page. This is where we will house various design aspects of the app.</h2>
    <RatioList data={testIncomeStatementData} config={tableConfig} />
    <Table data={testIncomeStatementData} config={tableConfig}/>
    </main>
  )
}

export default DesignPage