import React from 'react'
import { TestDataCompany } from '../Table/TestData'

type Props = {
    config:any;
    data:any;
}


const RatioList = ({config, data}: Props) => {
    const renderedRows = config.map((row:any) => {
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