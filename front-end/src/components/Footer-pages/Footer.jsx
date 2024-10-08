import "../CSS-pages/Footer.css"
import fb from "../../assets/fb.svg"
import Instagram from '../../assets/Instagram.svg'
import twitter from '../../assets/twitter.svg'
import {Link} from "react-router-dom";

function Footer() {
  return (
    <div className='footer'>
      <div className="footer-section">

        <div className="footer-links">
          <div className="footer-links-div">
            <h4>Company</h4>
            <Link className="footer-a" to="/about">About us</Link>
            <Link className="footer-a" to="/privacy">Privacy</Link>
            <Link className="footer-a" to="/terms">Terms and Condition</Link>               
          </div>

          <div className="footer-links-div">
            <h4>Contact</h4>
            <Link className="footer-a" to="/helpcenter">Help Center</Link>        
          </div>

          <div className="footer-links-div">
            <h4>Follow Us</h4>
            <div className="social-media">
              <img className="social-img" src={fb} alt="" />
              <img className="social-img" src={Instagram} alt="" />
              <img className="social-img" src={twitter} alt="" /> 
            </div>             
          </div>  
        </div>
        <hr></hr>

        <div className="footer-copy-section">
          <div className="copyright">
            <p> &copy;{new Date().getFullYear()} MakeupMatch | All right reserved</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Footer
