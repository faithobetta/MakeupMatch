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
