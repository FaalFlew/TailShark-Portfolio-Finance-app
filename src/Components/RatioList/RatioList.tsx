import React from 'react'
import { TestDataCompany } from '../Table/TestData'

type Props = {}

const data = TestDataCompany[0];

type Company = typeof data;

const config = [
    {
        label:"company name",
        render: (company:Company) => company.companyName,
        subTitle:"Company name"
    },
]

const RatioList = (props: Props) => {
    const renderedRows = config.map((row) => {
        return (
            <li> 
                <div>
                    <div>
                        <p>{row.label}</p>
                        {row.subTitle && <p> {row.subTitle} </p>}
                    </div>
                    <div>
                        {row.render(data)}
                    </div>
                </div>
            </li>
        )
    })

  return (
    <div>
        <ul>{renderedRows}</ul>
    </div>
  )
}

export default RatioList