import React from 'react';
import {Link} from 'react-router-dom';
const Header = () => {
    return (
        <header className="header" style={{/* backgroundColor: 'lightblue', */ width: '100%', /* minWidth: '100vw',  */minHeight: '5vh'/* , padding: '24px' */}}>
            <nav className="navbar navbar-expand-sm  navbar-dark">
    <div className="navbar-brand logo" >
        <Link to="/">Logo
        
        </Link></div>
  
  <ul className="nav nav-pills" role="tablist">
  <li className="nav-item " >
      <Link className="nav-link" data-toggle="pill" to="/">Home</Link>
    </li>
    
    
  </ul>
 
</nav>
            
        </header>
    )
}

export default Header;
