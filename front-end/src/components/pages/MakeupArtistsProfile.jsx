import { useEffect, useState } from "react";
import "../CSS-pages/MakeupArtistsProfile.css";
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

function MakeupArtistsProfile() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [imgData, setImgData] = useState([]);

    const handleBookService = () => {
        navigate('/booking');
    };

    const fetchArtistById = async () => {
        try {
            const response = await axios.get(`http://localhost:5174/api/auth/fetchArtist/${id}`);
            console.log("Artist Data:", response.data);
            setData(response.data);
            if (response.data.fileurls) {
                try {
                    let cleanedFileUrls = response.data.fileurls.replace(/\\/g, '');
                    if (!cleanedFileUrls.endsWith(']')) {
                        cleanedFileUrls += '"]';
                    }
                    const parsedFileUrls = JSON.parse(cleanedFileUrls);
                    console.log("Parsed File URLs:", parsedFileUrls);
                    setImgData(parsedFileUrls);
                } catch (parseError) {
                    console.error("Error parsing fileurls:", parseError);
                }
            }
        } catch (error) {
            console.error("Error fetching artist:", error);
        }
    };

    useEffect(() => {
        fetchArtistById();
    }, [id]);

    return (
        <div className="makeup-artists-profile">
            <h1>Makeup Artist Profile</h1>
            {imgData && <img className="profile-img" src={imgData[0]} alt="Profile" />}
            {data ? (
                <>
                    <h2>{data.Name}</h2>
                    <div className="div-address">
                        <p>{data.Address}</p>
                    </div>
                    <div className="div-service">
                        <h3>Services We Offer</h3>
                        <ul>
                            {data.Services?.map((service, index) => (
                                <li key={index} className="service-item">
                                    {service.Service_name}: £{service.Price} {service.Duration}
                                    <button className="book" onClick={handleBookService}>Book service</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="work-pictures">
                        <h3>Pictures and videos of our work</h3>
                        <div className="grid-layout">
                        {imgData?.map((url, index) => (
                                <div key={index} className="grid-item">
                                    <img src={url} alt={`Upload ${index}`} width="100" />
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
                <p>Loading...</p>
            )}
        </div>
    );
}

export default MakeupArtistsProfile;
