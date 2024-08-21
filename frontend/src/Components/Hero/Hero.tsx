import React from 'react'
import hero from './Hero.png'
import { Link } from 'react-router-dom'

interface Props {

}

const Hero = (props: Props) => {
  return (
    <section id="hero">
    <div className="">
      <div className="">
        <h1 className="">
          Financial data with no news.
        </h1>
        <p className="">
          Search relevant financial documents for stocks
        </p>
        <div className="">
          <Link
            to="/search"
            className=""
          >
            Get Started
          </Link>
        </div>
      </div>
      <div className="">
        <img src={hero} alt="" />
      </div>
    </div>
  </section>
    )
}

export default Hero