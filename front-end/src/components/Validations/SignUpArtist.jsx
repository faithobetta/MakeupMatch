import "../CSS-pages/SignUp.css";
import { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebase";

function SignUpArtist() {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [BrandName, setBrandName] = useState('');
  const [Address, setAddress] = useState('');
  const [Services, setServices] = useState([{ Service_name: '', Price: '', Duration: 0 }]);
  const [ContactNumber, setContactNumber] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const navigate = useNavigate();

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

    try {
      // Upload files to Firebase and get URLs
      const fileUploadPromises = uploadedFiles.map(async (file) => {
        const storageRef = ref(storage, `images/${file.name}`);
        await uploadBytes(storageRef, file);
        return getDownloadURL(storageRef);
      });

      const fileURLs = await Promise.all(fileUploadPromises);
      console.log(fileURLs);

      // Send form data along with file URLs to the backend
      const response = await axios.post("http://localhost:5174/api/auth/signUpArtist", {
        Name,
        Email,
        Password,
        BrandName,
        Address,
        Services,
        ContactNumber,
        fileURLs
      });

      if (response.status === 201) {
        console.log('Registration successful:', response.data);
        navigate(`/makeupArtistsProfile/${response.data.artistId}`);
      } else {
        console.error('Error:', response.data);
      }
    } catch (error) {
      console.error("Error registering:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        console.error("Request data:", error.request);
      } else {
        console.error('Error message:', error.message);
      }
      alert("Failed to register. Please try again later.");
    }
  };

  return (
    <div className="signUp-home">
      <h2>Sign Up as Makeup Artist</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Name:' onChange={(e) => setName(e.target.value)} required /> <br />
        <input type="email" placeholder='Email:' onChange={(e) => setEmail(e.target.value)} required /> <br />
        <input type="password" placeholder='Password:' onChange={(e) => setPassword(e.target.value)} required /> <br />
        <input type="password" placeholder='Confirm Password:' required /> <br />
        <div className="brand-name">
          <label>Brand Name:</label>
          <input type="text" value={BrandName} onChange={(e) => setBrandName(e.target.value)} required />
        </div>
        <div className="address">
          <label>Address:</label>
          <input type="text" value={Address} onChange={(e) => setAddress(e.target.value)} required />
        </div>
        <div className="services">
          <label>Services:</label>
          {Services.map((service, index) => (
            <div key={index} className="service">
              <input
                type="text"
                placeholder="Service Name"
                value={service.Service_name}
                onChange={(e) => handleServiceChange(index, 'Service_name', e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Price"
                value={service.Price}
                onChange={(e) => handleServiceChange(index, 'Price', e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="Duration"
                value={service.Duration}
                onChange={(e) => handleServiceChange(index, 'Duration', e.target.value)}
                required
              />
              <button type="button" onClick={() => handleRemoveService(index)}>Remove</button>
            </div>
          ))}
          <button className="add-service-book" type="button" onClick={handleAddService} >Add Service</button>
        </div>
        <div className="file-upload">
          <label>Upload Files (Pictures/Videos):</label>
          <input type="file" multiple accept="image/*,video/*" onChange={handleFileUpload} />
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
          <label>Contact Number:</label>
          <input type="text" value={ContactNumber} onChange={(e) => setContactNumber(e.target.value)} required />
        </div>
        <input className="submit" type="submit" />
      </form>
    </div>
  );
}

export default SignUpArtist;
