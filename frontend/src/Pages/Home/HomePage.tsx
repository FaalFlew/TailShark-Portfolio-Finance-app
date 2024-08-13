import '../../Shared/Css/Global.css'
import React from 'react'
import Hero from '../../Components/Hero/Hero'

interface Props {}

const HomePage = (props: Props) => {
  return (
    <div><main className='main'><Hero /></main></div>
  )
}

export default HomePage