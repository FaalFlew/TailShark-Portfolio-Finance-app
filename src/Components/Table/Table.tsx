import React from 'react'
import { testIncomeStatementData } from './TestData'

type Props = {
    config:any;
    data:any;
}


const Table = ({config,data}: Props) => {
    const renderedRows = data.map((company:any) => {
        return (
            <tr key={company.cik}>
                {config.map((val: any) => {
                return (
                <td className="">
                    {val.render(company)}
                </td>
                )
                })}
            </tr>
        );
    } );

    const renderedHeaders = config.map((config:any) => {
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