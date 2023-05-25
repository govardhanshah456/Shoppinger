import React from 'react'
import Header from '../Components/Header'
import EventCard from '../Components/EventCard'
import { useSelector } from 'react-redux'

const EventPage = () => {
    const { allEvents } = useSelector((state) => state.event)
    return (
        <>
            <Header activeHeading={4} />
            <EventCard active={true} data={allEvents && allEvents[0]} />
        </>

    )
}

export default EventPage