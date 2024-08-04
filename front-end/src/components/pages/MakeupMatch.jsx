// import React, { useState } from 'react';
import '../CSS-pages/Home.css';
// import Img1 from './Img1.jpg';
import makeup3 from './makeup3.webp';
import Autocomplete from "react-google-autocomplete";
import pexels1 from './pexels1.webp';
import { useRef } from 'react';

// import Search from './Search';

// const artistsData = [
//     { id: 1, name: 'Ette Glamour', location: 'ludovick walk, sw15 5le', img: Img1 },
//     { id: 2, name: 'Beauty Bliss', location: 'main street, sw16 7hj', img: Img1 },
//     // Add more artist data here
// ];

function MakeupMatch() {
    const inputRef = useRef(null);
    // const [filteredArtists, setFilteredArtists] = useState(artistsData);

    // const handleFilter = (filteredArtists) => {
    //     setFilteredArtists(filteredArtists);
    // };

    return (
        <div>
            <div className="home-video">
                <video className="video1" src="/src/assets/full-video.mp4" type="video/mp4" controls={false} autoPlay loop muted ></video>
                <div className="header-content">
                    <h4>Find Your Perfect Makeup Artist, Empower Your Confidence with Expert Makeup Artist in <span>MakeupMatch</span></h4>
                    <h2>Experience Effortless Booking and Beautiful Results</h2>
              

                 
                    {/* <Search artists={artistsData} onFilter={handleFilter} /> */}
                </div>
            </div>
            <Autocomplete
          style={{ width: '80vw', }}
          ref={inputRef}
          apiKey={"AIzaSyCXF6BlbNZbDMI715io9A-fjb92VgDZaNU"}
          onPlaceSelected={(selected,) => {
            console.log(selected);
          }}
          options={{
            types: ["geocode", "establishment"],
            componentRestrictions: { country: "ru" },
          }}
          language='en'

        />
            <div className="home-section">
                <h3>Highly Recommended</h3>
                <div className="section">
                    {/* {filteredArtists.map(artist => (
                        <div key={artist.id} className="section-page">
                            <img src={artist.img} alt="makeup" />
                            <h3>{artist.name}</h3>
                            <p>{artist.location}</p>
                        </div>
                    ))} */}
                </div>
            </div>
        
        
            <div className="home-text">
                <h1>Makeup Made Easy: Book Today!</h1>
                <div className="home-img">
                    <img src={makeup3} alt="" />
                    <img src={pexels1} alt="" />
                </div>
            </div>
   
        </div>
    );
}

export default MakeupMatch;
