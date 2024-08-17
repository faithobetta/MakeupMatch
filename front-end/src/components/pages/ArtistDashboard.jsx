import "../CSS-pages/ArtistDashboard.css";
import { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebase";
import axios from "axios";

function ArtistDashboard() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [profilePicture, setProfilePicture] = useState(null);
    const [BrandName, setBrandName] = useState('');
    const [Address, setAddress] = useState('');
    const [Location, setLocation] = useState('');
    const [Services, setServices] = useState([{ Service_name: '', Price: '', Duration: 0 }]);
    const [ContactNumber, setContactNumber] = useState('');
    const [uploadedFiles, setUploadedFiles] = useState([]);

    const handleProfilePictureChange = (e) => {
        setProfilePicture(URL.createObjectURL(e.target.files[0]));
    };

    const handleServiceChange = (index, field, value) => {
        const updatedServices = [...Services];
        updatedServices[index][field] = value;
        setServices(updatedServices);
    };

    const handleAddService = () => {
        setServices([...Services, { Service_name: '', Price: '', Duration: 0 }]);
    };

    const handleRemoveService = (index) => {
        const updatedServices = Services.filter((_, i) => i !== index);
        setServices(updatedServices);
    };

    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        setUploadedFiles([...uploadedFiles, ...files]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Check for any empty fields in services before proceeding
        const hasEmptyServices = Services.some(service => !service.Service_name || !service.Price || !service.Duration);
        if (hasEmptyServices) {
            alert("Please fill out all fields for each service.");
            return;
        }

        try {
            // Upload files to Firebase and get URLs
            const fileUploadPromises = uploadedFiles.map(async (file) => {
                const storageRef = ref(storage, `images/${file.name}`);
                await uploadBytes(storageRef, file);
                return getDownloadURL(storageRef);
            });

            const Fileurl = await Promise.all(fileUploadPromises);
            console.log(Fileurl);

            // Send form data along with file URLs to the backend
            const response = await axios.post("http://localhost:5174/api/auth/artist-dashboard", {
                Artist_id: id,
                BrandName,
                Address,
                Location,
                Services,
                ContactNumber,
                Fileurl
            });

            if (response.status === 201) {
                console.log('Registration successful:', response.data);
                navigate(`/makeupArtistsProfile/${id}`);
            } else {
                console.error('Error:', response.data);
            }
        } catch (error) {
            console.error("Error registering:", error);
        }
    };

    return (
        <div className="profile-page">
            <h1>Makeup Artist Dashboard</h1>

            <form onSubmit={handleSubmit}>
                <div className="profile-picture">
                    <label>Profile Picture:</label>
                    <input type="file" accept="image/*" onChange={handleProfilePictureChange} />
                    {profilePicture && <img src={profilePicture} alt="Profile" width="100" />}
                </div>

                <div className="brand-name">
                    Brand Name:<input className="brandname-input" type="text" value={BrandName} onChange={(e) => setBrandName(e.target.value)} required />
                </div>

                <div className="address">
                    Address:<input className="address-input" type="text" value={Address} onChange={(e) => setAddress(e.target.value)} />
                </div>

                <div className="location">
            
                    <select className="location-input"  placeholder="Location"
                        id="location" 
                        value={Location} 
                        onChange={(e) => setLocation(e.target.value)} 
                        required
                    >
                        <option value="" disabled>Select a location</option>
                        <option value="barking_dagenham">Barking and Dagenham</option>
                        <option value="barnet">Barnet</option>
                        <option value="bexley">Bexley</option>
                        <option value="brent">Brent</option>
                        <option value="bromley">Bromley</option>
                        <option value="camden">Camden</option>
                        <option value="croydon">Croydon</option>
                        <option value="ealing">Ealing</option>
                        <option value="enfield">Enfield</option>
                        <option value="greenwich">Greenwich</option>
                        <option value="hackney">Hackney</option>
                        <option value="hammersmith_fulham">Hammersmith and Fulham</option>
                        <option value="haringey">Haringey</option>
                        <option value="harrow">Harrow</option>
                        <option value="havering">Havering</option>
                        <option value="hillingdon">Hillingdon</option>
                        <option value="hounslow">Hounslow</option>
                        <option value="islington">Islington</option>
                        <option value="kensington_chelsea">Kensington and Chelsea</option>
                        <option value="kingston_upon_thames">Kingston upon Thames</option>
                        <option value="lambeth">Lambeth</option>
                        <option value="lewisham">Lewisham</option>
                        <option value="merton">Merton</option>
                        <option value="newham">Newham</option>
                        <option value="redbridge">Redbridge</option>
                        <option value="richmond_upon_thames">Richmond upon Thames</option>
                        <option value="southwark">Southwark</option>
                        <option value="sutton">Sutton</option>
                        <option value="tower_hamlets">Tower Hamlets</option>
                        <option value="waltham_forest">Waltham Forest</option>
                        <option value="wandsworth">Wandsworth</option>
                        <option value="westminster">Westminster</option>
                    </select>
                </div>


                <div className="services">
                    {Services.map((service, index) => (
                        <div key={index} className="service">
                            Services:<input className="name-input"
                                type="text"
                                placeholder="Service Name"
                                value={service.Service_name}
                                onChange={(e) => handleServiceChange(index, 'Service_name', e.target.value)}
                                required
                            />
                            <input className="price-input"
                                type="text"
                                placeholder="Price"
                                value={service.Price}
                                onChange={(e) => handleServiceChange(index, 'Price', e.target.value)}
                                required
                            />
                            <input className="duration-input"
                                type="number"
                                placeholder="Duration"
                                value={service.Duration}
                                onChange={(e) => handleServiceChange(index, 'Duration', e.target.value)}
                                required
                            />
                            <button className="remove-button" type="button" onClick={() => handleRemoveService(index)}>Remove</button>
                        </div>
                    ))}
                    <button className="add-service" type="button" onClick={handleAddService}>Add Service</button>
                </div>

                <div className="file-upload">
                    <label>Upload Files (Pictures/Videos):</label>
                    <input className="upload-input" type="file" multiple accept="image/*,video/*" onChange={handleFileUpload} />
                    <div className="uploaded-files">
                        {uploadedFiles.map((file, index) => (
                            <div key={index} className="uploaded-file">
                                {file.type.startsWith('video') ? (
                                    <video src={URL.createObjectURL(file)} controls width="100" />
                                ) : (
                                    <img src={URL.createObjectURL(file)} alt={`Upload ${index}`} width="100" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="contact">
                    Contact Number:<input className="contact-input" type="text" value={ContactNumber} onChange={(e) => setContactNumber(e.target.value)} required />
                </div>

                <button className="artistDashboardButton" type="submit">Submit</button>
            </form>
        </div>
    );
}

export default ArtistDashboard;
