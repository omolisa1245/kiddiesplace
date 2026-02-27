import React from 'react'
import Hero from '../../component/Hero/Hero'
import BestSeller from '../../component/LattestCollection/BestSeller'
import OurOffers from '../../component/ourOffers/OurOffers'
import HomeCollection from '../../component/HomeCollection/HomeCollection'
import Banner from '../../component/Banner/Banner'
import Review from '../../component/Review/Review'
import Arrival from '../../component/Arrival/Arrival'

const Home = () => {
  return (
    <div>
      <Hero/>
      <OurOffers/>
      <BestSeller/>
      <HomeCollection/>
      <Banner/>
      <Arrival/>
      <Review/>
    </div>
  )
}

export default Home