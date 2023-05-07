import React from 'react'
import Header from '../Components/Header'
import EventCard from '../Components/EventCard'

const EventPage = () => {
    return (
        <>
            <Header activeHeading={4} />
            <EventCard active={true} />
        </>

    )
}

export default EventPage