import React from 'react'
import '../../Shared/Css/Global.css'
import Table from '../../Components/Table/Table'

type Props = {}

const DesignPage = (props: Props) => {
  return (
    
    <main>
    <h1>TailShark Design Page</h1>
    <h2>This is TailShark's design page. This is where we will house various design aspects of the app.</h2>
    <Table />
    </main>
  )
}

export default DesignPage