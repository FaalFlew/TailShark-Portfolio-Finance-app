import React from 'react'
import { testIncomeStatementData } from './TestData'

const data = testIncomeStatementData
type Props = {}

type Company = (typeof data)[0];

const configs = [
    {
        label: "Year",
        render:(company:Company) => company.acceptedDate
    },
    {
        label: "Cost of revenue",
        render:(company:Company) => company.costOfRevenue
    }
]

const Table = (props: Props) => {
    const renderedRows = data.map((company) => {
        return (
            <tr key={company.cik}>
                {configs.map((val: any) => {
                return (
                <td className="">{val.render(company)}</td>
                )
                })}
            </tr>
        )
    } )

    const renderedHeaders = configs.map((config:any) => {
        return (
            <th key={config.label}>{config.label}</th>
        )

    })
  return (
    <div>
        <table>
            <thead><tr>{renderedHeaders}</tr></thead>
            <tbody>{renderedRows}</tbody>
        </table>
    </div>
  )
}

export default Table