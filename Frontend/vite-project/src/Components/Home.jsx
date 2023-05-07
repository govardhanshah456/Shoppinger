import React from 'react'
import Header from './Header'
import Hero from './Hero'
import Categories from './Categories'
import BestDeals from './BestDeals'
import Event from './Event'
import FeaturedProducts from './FeaturedProducts'
import Sponsered from './Sponsered'
import Footer from './Footer'

const Home = () => {
    return (
        <>
            <Header activeHeading={1} />
            <Hero />
            <Categories />
            <BestDeals />
            <Event />
            <FeaturedProducts />
            <Sponsered />
            <Footer />
        </>
    )
}

export default Home