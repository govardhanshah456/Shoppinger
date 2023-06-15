import React from 'react'
import { useSelector } from 'react-redux';
import Loader from './Loader';
import EventCard from './EventCard';
import { useParams } from 'react-router-dom';
import styles from '../Styles/styles';
const EventById = () => {
    const { allEvents, isLoading } = useSelector((state) => state.event);
    // console.log(allEvents[0])
    const { id } = useParams()
    const event = allEvents && allEvents.find((i) => i._id === id)
    console.log(event)
    return (
        <>
            {
                isLoading ? (
                    <Loader />
                ) : (
                    <div>
                        <div className={`${styles.section}`}>
                            <div className={`${styles.heading}`}>
                                <h1>Event You're Browsing</h1>
                            </div>
                            <div className='w-full grid'>
                                <EventCard data={allEvents && allEvents[0]} />
                            </div>
                        </div>
                    </div>
                )
            }
        </>

    )
}

export default EventById