import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register, upload_image } from '../../store/actions/userActions';
import Joi from 'joi-browser';
import {isEmpty} from '../../utils';
import { useHistory } from 'react-router-dom';

const RegisterPage = () => {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [image, setImage] = useState('');
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const history = useHistory();
  const uploaded_image = useSelector((state)=> state.authReducer.uploaded_image);
  const serverError = useSelector((state)=> state.authReducer.error);
  const user = useSelector((state)=> state.authReducer.user);

  const schema = {
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string().required()
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
    if (evt.target.name == 'username') { setUserName(evt.target.value); }
    else if (evt.target.name == 'email') { setEmail(evt.target.value); }
    else if (evt.target.name == 'password') { setPassword(evt.target.value); }
    else if (evt.target.name == 'confirmPassword') { setConfirmPassword(evt.target.value); }
    /* else if (evt.target.name == 'image') { console.log(evt.target.files[0].name);  handleFileUpload(evt);} */
    validateInput(evt.target.name, evt.target.value);

  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const form = { username, email, password, confirmPassword };
    const { error, value } = validate(form);
    if(!isEmpty(error)){
    let formErrors = {};
    
    for (let i = 0; i < error.details.length; i++) {
      formErrors[error.details[i].path[0]] = error.details[i].message;
    }
    setErrors(formErrors);
  }
  else {
  if(image){form['image'] = image;}
      dispatch(register(form));
  }
    };

  const handleFileUpload = (evt) => {
    const x = new FormData();
  x.append('avatar',evt.target.files[0]);
  dispatch(upload_image(x));
  
  };

  useEffect(() => {
   setImage(uploaded_image);
   if(!isEmpty(user)) {history.push('/home');}
  
  }, [uploaded_image, user]);

  const isEmptyForm = () => {
    return (username + email + password + confirmPassword + image == "");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text" className="form-control" id="username" placeholder="Enter name" name="username" value={username} onChange={handleChange} />
        </div>
        {errors?.username && <div class="alert alert-danger">
          {errors.username} 
        </div>}
        

        <div className="form-group">
          <label htmlFor="email">email:</label>
          <input type="text" className="form-control" id="email" placeholder="Enter email" name="email"
            value={email} onChange={handleChange} />
        </div>
        {errors?.email && <div class="alert alert-danger">
          {errors.email} 
        </div>}

        <div className="form-group">
          <label htmlFor="password1">Password:</label>
          <input type="password" className="form-control" id="password1" placeholder="Enter password" name="password"
            value={password} onChange={handleChange} />
        </div>
        {errors?.password && <div class="alert alert-danger">
          {errors.password} 
        </div>}

        <div className="form-group">
          <label htmlFor="password2">Confirm Password:</label>
          <input type="password" className="form-control" id="password2" placeholder="Confirm password" name="confirmPassword"
            value={confirmPassword} onChange={handleChange} />
        </div>
        {errors?.confirmPassword && <div class="alert alert-danger">
          {errors.confirmPassword} 
        </div>}

        {password != confirmPassword && <div class="alert alert-danger">
          {'passwords are not match'} 
        </div>}
        <div className="form-group">
          <label htmlFor="image">Image:</label>
          <input type="file" className="form-control" id="endDate" placeholder="Enter image" name="image"
            /* value={image} */ onChange={handleFileUpload} disabled={uploaded_image} />
        </div>




        <button type="submit" className="btn btn-primary" disabled={!isEmpty(errors) || isEmptyForm() || password != confirmPassword}>Submit</button>
      </form>
      {serverError && <p className="alert alert-danger text-center" style={{width: '100%',   top: '50%'}}>{serverError.message}</p>}
    </div>
  )
}

export default RegisterPage;
