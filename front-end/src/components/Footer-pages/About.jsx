import "../CSS-pages/about.css"
import img4 from "./img4.jpg"
import me from "./me.jpg"

const About = () => {
  return (
    <div className="about">
      <div className="about-section">
        <div className="about-info">
          <h1>About Us</h1>
          <p>We believe makeup is an art form, a way to express yourself and unlock your inner confidence. But finding the right makeup artist can be overwhelming. That's where we come in. At MakeupMatch, we're passionate about makeup and dedicated to helping you find the perfect makeup artist for your unique beauty. We empower you to experiment, discover, and create a look that makes you feel fabulous! MakeupMatch is your one-stop destination for effortless makeup matching! Our desire is to help in finding a makeup artist within your location. We believe makeup is a journey of self-discovery, and we are here to guide you in every step of the way.</p>
        </div>
        <div className="img-about">
            <img src={img4} alt="" />
        </div>
      </div>

      <div className="about-container">
          <div className="about-mission">
            <h1>MakeupMatch Mission</h1>
            <p>Finding the perfect makeup artist shouldn't be a struggle. That's why we're dedicated to simplifying your search and ensuring a stress-free experience. Our mission is to bridge the gap between you and talented makeup artists who fit your unique needs.  Browse verified profiles, explore diverse portfolios, and read honest client reviews to discover the artist perfectly suited to your style and budget.  With a few clicks, book appointments directly, receive instant confirmations, and communicate seamlessly.  Our platform empowers you to look and feel your absolute best, for any occasion. We're committed to connecting you with the artist who will bring your makeup vision to life.</p>
            <p>We believe in the transformative power of makeup artistry. Our mission is to empower you to connect with clients who appreciate your unique skills and vision.  Through our website, you can showcase your talent, build a thriving clientele, and focus on what you do best – creating unforgettable makeup looks.  Say goodbye to endless marketing and hello to a platform that connects you with ideal clients seeking your specific expertise.  Join our thriving community, manage your bookings seamlessly, and embark on a fulfilling journey as a successful makeup artist.</p>
          
          </div>

          <div className="about-value">
            <h1>Our Values</h1>
            <p>Finding the perfect makeup artist can feel overwhelming.  Our website simplifies this process by offering you a curated selection of talented artists based on your location, budget, and desired style.  Say goodbye to endless online searches and unreliable recommendations.  Browse verified artist profiles, view their portfolios to see their work firsthand, and read client reviews to get a sense of their experience.   Our platform provides all the information you need to make an informed decision.  With a few clicks, you can book appointments directly with the artist and receive instant  confirmation.  Let us help you find your perfect match and ensure a stress-free and enjoyable makeup experience for any occasion.</p>
            <p>Finding the right clients can be a time-consuming and frustrating experience for makeup artists.  Our website cuts through the noise by connecting you with ideal clients who are actively seeking your specific skills and expertise.  No more cold calls or generic marketing efforts.  Our streamlined platform allows you to showcase your portfolio, highlight your strengths, and filter client requests based on your preferences.  This means you can focus on what you do best – creating stunning makeup looks – while we handle the client matchmaking.  Get ready to expand your clientele, manage your bookings efficiently, and build a thriving makeup artistry career.</p>
          </div>
      </div>

      <div className="about-founder">
        <div className="founder-text">
          <h1>Founder</h1>
          <img src={me} alt="" />
          <h3>Faith Obetta</h3>
          <p>Welcome to MakeupMatch! As the founder, I'm passionate about creating a space where beauty comes alive through seamless connections. This platform goes beyond matchmaking. It's a community built on empowering both talented makeup artists to connect with ideal clients and discerning individuals to find their perfect match. We stand out by expertise matching, focus on inclusivity, and streamlined booking.  Your feedback fuels our growth, so feel free to share your thoughts!  Thank you for joining us on this journey to unlock everyone's inner beauty confidence.</p>
        </div>
      </div>
      
    </div>
  )
}

export default About
