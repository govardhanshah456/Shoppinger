import React, { useEffect, useState } from 'react'
import styles from '../Styles/styles'
import EventCard from './EventCard'
import { useDispatch, useSelector } from 'react-redux'
import { getAllEvents } from '../redux/actions/event'
import Loader from './Loader'
import Store from '../redux/store'
const Event = () => {
    const { allEvents, isLoading } = useSelector((state) => state.event);
    console.log(allEvents[0])
    return (
        <>
            {
                isLoading ? (
                    <Loader />
                ) : (
                    <div>
                        <div className={`${styles.section}`}>
                            <div className={`${styles.heading}`}>
                                <h1>Popular Events</h1>
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

export default Event