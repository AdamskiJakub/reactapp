import React from 'react'
import { NavLink, Link } from 'react-router-dom';


const NavBar = () => {
    return (
    <nav className="navbar navbar-expand-lg bg-light">
    <div className="container-fluid">
      <Link className="navbar-brand" to="#">Medica</Link>
      <button className="navbar-toggler" 
        type="button" 
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup" 
        aria-controls="navbarNavAltMarkup" 
        aria-expanded="false" 
        aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <NavLink className="nav-link active" aria-current="page" to="/patients">Patients</NavLink>
          <NavLink className="nav-link" to="/researchProjects">Research Projects</NavLink>
          <NavLink className="nav-link" to="/tests">Tests</NavLink>
          <NavLink className="nav-link" to="/login">Login</NavLink>
          <NavLink className='nav-link' to='/register'>Register</NavLink>
        </div>
      </div>
    </div>
  </nav>  
  );
}
 
export default NavBar;