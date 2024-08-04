// import React from 'react'
import {Link} from 'react-router-dom'
import "./Navbar.css"

function Navbar() {
  return (
    <nav>
      <Link to="/" className='home_nav'>MakeupMatch</Link>
      <Link to="/login" className='signup_nav'>Login/SignUp</Link>
      
    </nav>
    
  )
}
export default Navbar;