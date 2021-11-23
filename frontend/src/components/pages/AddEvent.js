import React from 'react';
import { useState, useEffect } from 'react';
import Joi from 'joi-browser';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {isEmpty} from '../../utils';
import {addEvent, getEvents} from '../../store/actions/eventActions';

const AddEvent = () => {
const [name, setName] = useState('');
const [location, setLocation] = useState('');
const [startDate, setStartDate] = useState('');
const [endDate, setEndDate] = useState('');
const [errors, setErrors] = useState({});

const dispatch = useDispatch();
  const history = useHistory();
  const eventAdded = useSelector((state)=> state.eventsReducer.eventAdded);
  
  const schema = {
    name: Joi.string().required(),
    location: Joi.string().required(),
    startDate: Joi.date()/* .max(endDate) */.required(),
    endDate: Joi.date()/* .min(startDate) */.required()
  };
    

  const validate = (form) => { const result = Joi.validate(form, schema, { abortEarly: false }); return result; };
  const validateInput = (name, value) => {
    const { error } = Joi.validate({ [name]: value }, { [name]: schema[name] });
    if (error) setErrors({ ...errors, [name]: error.details[0].message });
    else {
      let newErrors = { ...errors };
      delete newErrors[name];
      setErrors({ ...newErrors });
    }
  };

  const handleChange = (evt) => {
    if(evt.target.name == 'name') {setName(evt.target.value);}
    else if(evt.target.name == 'location') {setLocation(evt.target.value);}
    else if(evt.target.name == 'startDate') {setStartDate(evt.target.value);}
    else if(evt.target.name == 'endDate') {setEndDate(evt.target.value);}
    validateInput(evt.target.name, evt.target.value);
};

    const handleSubmit = (evt) => {
      evt.preventDefault();
      const form = { name, location, startDate, endDate };
      const { error, value } = validate(form);
      if(!isEmpty(error)){
      let formErrors = {};
      
      for (let i = 0; i < error.details.length; i++) {
        formErrors[error.details[i].path[0]] = error.details[i].message;
      }
      setErrors(formErrors);
    }
    else {
        dispatch(addEvent(form));
    }};

    useEffect(() => {
     if(eventAdded) {dispatch(getEvents());
      history.push('/home'); }
    }, [eventAdded])



    return (
        <div>
            <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label htmlFor="name">Name:</label>
      <input type="name" className="form-control" id="name" placeholder="Enter name" name="name" value={name} onChange={handleChange} />
    </div>

    <div className="form-group">
      <label htmlFor="location">Location:</label>
      <input type="location" className="form-control" id="location" placeholder="Enter location" name="location" 
      value={location} onChange={handleChange} />
    </div>

    <div className="form-group">
      <label htmlFor="startDate">Start Date:</label>
      <input type="date" className="form-control" id="startDate" placeholder="Enter start date" name="startDate" 
      value={startDate} onChange={handleChange} />
    </div>

    <div className="form-group">
      <label htmlFor="endDate">End Date:</label>
      <input type="date" className="form-control" id="endDate" placeholder="Enter end date" name="endDate" 
      value={endDate} onChange={handleChange} />
    </div>

    
    
    
    <button type="submit" className="btn btn-primary">Submit</button>
  </form>
  
        </div>
    )
}

export default AddEvent;
