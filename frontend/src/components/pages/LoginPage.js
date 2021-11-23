import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/actions/userActions';
import Joi from 'joi-browser';
import {isEmpty} from '../../utils';
import { useHistory } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const serverError = useSelector((state)=> state.authReducer.error);
  const schema = {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    
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
  const dispatch = useDispatch();
   const history = useHistory();
   const user = useSelector((state)=> state.authReducer.user);
  const handleChange = (evt) => {
    if (evt.target.name == 'email') { setEmail(evt.target.value); }
    else if (evt.target.name == 'password') { setPassword(evt.target.value); }
    validateInput(evt.target.name, evt.target.value);

  };


  const handleSubmit = (evt) => {
    evt.preventDefault();
    const form = {email, password,};
    const { error, value } = validate(form);
    if(error){
      let formErrors = {};
    for (let i = 0; i < error.details.length; i++) {
      formErrors[error.details[i].path[0]] = error.details[i].message;
    }
    setErrors(formErrors);
    } else {
      dispatch(login(form));
    }
    
    
      
  };

 

  useEffect(() => {
   if(!isEmpty(user)) {
    history.push('/home');}
  
  }, [user]);

  const isEmptyForm = () => {
    return (email + password == "");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        
        

        <div className="form-group">
          <label for="email">email:</label>
          <input type="text" className="form-control" id="email" placeholder="Enter email" name="email"
            value={email} onChange={handleChange} />
        </div>
        {errors?.email && <div class="alert alert-danger">
          {errors.email} 
        </div>}

        <div className="form-group">
          <label for="password">Password:</label>
          <input type="password" className="form-control" id="password" placeholder="Enter password" name="password"
            value={password} onChange={handleChange} />
        </div>
        {errors?.password && <div class="alert alert-danger">
          {errors.password} 
        </div>}
        <button type="submit" className="btn btn-primary" disabled={!isEmpty(errors) || isEmptyForm()}>Submit</button>
      </form>
      {serverError && <p className="alert alert-danger text-center" style={{width: '100%',   top: '50%'}}>{serverError.message}</p>}
    </div>
  )
}

export default LoginPage;
