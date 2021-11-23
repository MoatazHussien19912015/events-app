import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {deleteEvent } from '../../store/actions/eventActions';
const EventsTable = ({events}) => {
const user = useSelector((state)=> state.authReducer.user);
const serverError = useSelector((state)=> state.eventsReducer.error);
const dispatch = useDispatch();
    return (
        <div>
        <table className="table table-hover">
    <thead>
      <tr>
        <th>Event Name</th>
        <th>Location</th>
        <th>Start Date</th>
        <th>End Date</th>
        <th>Submitted At</th>
        <th className="text-center">Image</th>
        <th></th>
        
      </tr>
    </thead>
    <tbody >
        {events.map((event, index)=>{
            return (<tr key={index}>
                <td>{event.name}</td>
                <td>{event.location}</td>
                <td>{event.startDate}</td>
                <td>{event.endDate}</td>
                <td>{event.submittedAt}</td>
                <td className="text-center " style={{width: '20%'}}>
                    <img  className="mx-auto " style={{width:'20%'}} src={`http://localhost:5000${event.image}`}/></td>
                {user.id==event.user && <td><button type="button" onClick={()=>dispatch(deleteEvent(event._id))} className="btn btn-danger">&#x2715;</button></td> } 
            </tr>)
        })} 
        </tbody>
        </table>
        
        {serverError && <p className="alert alert-danger text-center" style={{width: '100%',   top: '50%'}}>{serverError.message}</p>}
        </div>
    )
}

export default EventsTable;
