import React, {useEffect} from 'react';
import EventsTable from './EventsTable';
import { useDispatch, useSelector } from 'react-redux';
import {getEvents} from '../../store/actions/eventActions';
const HomePage = () => {
const dispatch = useDispatch();    
const events = useSelector((state)=> state.eventsReducer.events);

useEffect(() => {
    dispatch(getEvents());
}, [])

    return (
        <div className="container-fluid">
            <EventsTable events={events}/>
        </div>
    )
}

export default HomePage;
