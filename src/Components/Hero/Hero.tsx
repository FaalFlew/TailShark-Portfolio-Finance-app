import React from 'react'
import hero from './Hero.png'

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
          Search relevant financial documents without fear mongering and fake
          news.
        </p>
        <div className="">
          <a
            href=""
            className=""
          >
            Get Started
          </a>
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