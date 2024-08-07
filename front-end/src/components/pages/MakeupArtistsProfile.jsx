import { useEffect, useState } from "react";
import "../CSS-pages/MakeupArtistsProfile.css";
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

function MakeupArtistsProfile() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [imgData, setImgData] = useState([]); // Initialize as an empty array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleBookService = () => {
        navigate('/booking');
    };

    const fetchArtistById = async () => {
        try {
            const response = await axios.get(`http://localhost:5174/api/auth/fetchArtist/${id}`);
            console.log("Artist Data:", response.data);
            setData(response.data);

            // Process the Fileurl string to ensure it's a valid JSON array
            if (response.data.Fileurl) {
                const correctedUrlString = response.data.Fileurl.trim();

                // Log the raw Fileurl string
                console.log("Raw Fileurl:", correctedUrlString);

                try {
                    // Parse the corrected Fileurl string
                    const urls = JSON.parse(correctedUrlString);
                    setImgData(urls); // Set the image data as an array
                    console.log("Image URLs:", urls); // Log to confirm
                } catch (jsonError) {
                    console.error("Error parsing Fileurl:", jsonError);
                    setError("Error processing image URLs.");
                }
            }
        } catch (error) {
            console.error("Error fetching artist:", error);
            setError("Error fetching artist data. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchArtistById();
    }, [id]);

    return (
        <div className="makeup-artists-profile">
            <h1>Makeup Artist Profile</h1>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : data ? (
                <>
                    {imgData.length > 0 && <img className="profile-img" src={imgData[0]} alt="Profile" />}
                    <h2>{data.BrandName}</h2>
                    <div className="div-address">
                        <p>{data.Address}</p>
                    </div>
                    <div className="div-service">
                        <h3>Services We Offer</h3>
                        <ul>
                            {data.Services?.map((service) => (
                                <li key={service.Service_id} className="service-item">
                                    {service.Service_name}: £{service.Price} for {service.Duration} minutes
                                    <button className="book" onClick={handleBookService}>Book service</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="work-pictures">
                        <h3>Pictures and Videos of Our Work</h3>
                        <div className="grid-layout">
                            {imgData.map((url, index) => (
                                <div key={index} className="grid-item">
                                    <img src={url} alt={`Upload ${index}`} width="500" height="400" />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="div-contact">
                        <h3>Contact Number</h3>
                        <p>{data.ContactNumber}</p>
                    </div>
                </>
            ) : (
                <p>No artist data found.</p>
            )}
        </div>
    );
}

export default MakeupArtistsProfile;
