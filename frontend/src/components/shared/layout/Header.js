import React from 'react';
import { NavLink} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../../store/actions/userActions';
import { isEmpty } from '../../../utils';
import { useSelector } from 'react-redux';

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state)=> state.authReducer.user);
    return (
        <header className="header" style={{/* backgroundColor: 'lightblue', */ width: '100%', /* minWidth: '100vw',  */minHeight: '5vh'/* , padding: '24px' */}}>
            <nav className="navbar navbar-expand-sm  navbar-dark">
    {/* <div className="navbar-brand logo" >
        <Link to="/">Logo
        
        </Link></div> */}
  
  <ul className="nav nav-pills" role="tablist">
  <li className="nav-item" >
      <NavLink className="nav-link" data-toggle="pill" to="/home">Home</NavLink>
    </li>
    {isEmpty(user) && <li className="nav-item " >
      <NavLink className="nav-link" data-toggle="pill" to="/register">Register</NavLink>
    </li>}

    {isEmpty(user) && <li className="nav-item" >
      <NavLink className="nav-link" data-toggle="pill" to="/login">Login</NavLink>
    </li>}

    {!isEmpty(user) && <li className="nav-item" >
      <NavLink className="nav-link" data-toggle="pill" to="/add-event">Add Event</NavLink>
    </li>}

    {!isEmpty(user) && <li className="nav-item" >
      <a style={{cursor: 'pointer'}} className="nav-link" data-toggle="pill" onClick={()=>dispatch(logout())}>Logout</a>
    </li>}
    
    
  </ul>
 
</nav>
            
        </header>
    )
}

export default Header;
