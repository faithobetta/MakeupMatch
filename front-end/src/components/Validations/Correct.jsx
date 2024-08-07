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
      const response = await axios.post("http://localhost:5173/api/auth/signUpArtist", {
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





import bcrypt from 'bcryptjs';
import { db } from '../db.js';


export const SignUpArtist = (req, res) => {
  // Check if artist exists
  const q = "SELECT * FROM artist WHERE email = ?";
  db.query(q, [req.body.Email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("Artist already exists!");

    // Create new artist
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.Password, salt);
    const newArtist = {
      Name: req.body.Name,
      Email: req.body.Email,
      Password: hash,
      BrandName: req.body.BrandName,
      Address: req.body.Address,
      ContactNumber: req.body.ContactNumber,
      fileURLs: JSON.stringify(req.body.fileURLs), // Save file URLs as a JSON string
    };

    const insertArtistQuery = `INSERT INTO artist (Name, Email, Password, BrandName, Address, ContactNumber, fileURLs) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    db.query(insertArtistQuery, [newArtist.Name, newArtist.Email, newArtist.Password, newArtist.BrandName, newArtist.Address, newArtist.ContactNumber, newArtist.fileURLs
    ], (err, result) => {
      if (err) return res.status(500).json(err);
      
      const artistId = result.insertId;

      // Insert services
      const services = req.body.Services;
      const insertServiceQuery = `INSERT INTO services (Artist_id, Service_name, Price, Duration) VALUES ?`;
      const serviceValues = services.map(service => [artistId, service.Service_name, service.Price, service.Duration]);
      db.query(insertServiceQuery, [serviceValues], (err, serviceResult) => {
        if (err) return res.status(500).json(err);
        return res.status(201).json({message:"Artist and services created successfully!",artistId:artistId});
      });
    });
  });
};

export const fetchArtistById = (req, res) => {
  // Check if the ID is provided
  if (!req.params.id) {
    return res.status(400).json("ID is required");
  }

  const artistId = req.params.id;

  // Fetch the artist and their services by ID
  const query = `
    SELECT 
      a.Artist_id, 
      a.Name, 
      a.Email, 
      a.Password, 
      a.BrandName, 
      a.Address, 
      a.ContactNumber, 
      a.fileurls,
      a.created_at, 
      a.updated_at,
      s.Service_id,
      s.Service_name, 
      s.Price, 
      s.Duration, 
      s.created_at as service_created_at, 
      s.updated_at as service_updated_at
    FROM artist a
    LEFT JOIN services s ON a.Artist_id = s.Artist_id
    WHERE a.Artist_id = ?
  `;

  db.query(query, [artistId], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    if (data.length === 0) {
      return res.status(404).json("Artist not found");
    }

    // Transform the result to the desired structure
    const artist = {
      Artist_id: data[0].Artist_id,
      Name: data[0].Name,
      Email: data[0].Email,
      BrandName: data[0].BrandName,
      Address: data[0].Address,
      ContactNumber: data[0].ContactNumber,
      fileurls: data[0].fileurls, // Parse fileurls as JSON
      created_at: data[0].created_at,
      updated_at: data[0].updated_at,
      Services: []
    };
    console.log(artist)
    data.forEach(row => {
      if (row.Service_id) {
        artist.Services.push({
          Service_id: row.Service_id,
          Service_name: row.Service_name,
          Price: row.Price,
          Duration: row.Duration,
          created_at: row.service_created_at,
          updated_at: row.service_updated_at
        });
      }
    });

    // Return the fetched artist with services
    return res.status(200).json(artist);
  });
};


          // signup client 
export const SignUpClient = (req, res) => {
  const q = "SELECT * FROM client WHERE email = ?";
  db.query(q, [req.body.Email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("client already exists!");

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.Password, salt);
    const newUser = {
      Name: req.body.Name,
      Email: req.body.Email,
      Password: hash,
    };

    const insertQuery = "INSERT INTO client SET ?";
    db.query(insertQuery, newUser, (err, result) => {
      if (err) return res.status(500).json(err);

      return res.status(201).json({ message: 'client created successfully' });
    });
  });
};

      // login user
export const Login = (req, res) => {
  const q = "SELECT * FROM client WHERE email = ?";
  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    const client = data[0];
    const isPasswordValid = bcrypt.compareSync(req.body.password, user.Password);

    if (!isPasswordValid) return res.status(401).json("Invalid Password!");

    return res.status(200).json({ message: 'Login successful', client });
  });
};
