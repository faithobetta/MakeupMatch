import bcrypt from 'bcryptjs';
import { db } from '../db.js';

// signup Artist 
export const SignUpArtist = (req, res) => {
  const q = "SELECT * FROM artist WHERE Email = ?";
  db.query(q, [req.body.Email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("Artist already exists!");

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.Password, salt);
    const newUser = {
      Name: req.body.Name,
      Email: req.body.Email,
      Password: hash,
    };

    const insertQuery = "INSERT INTO artist SET ?";
    db.query(insertQuery, newUser, (err, result) => {
      if (err) return res.status(500).json(err);
      const artistId = result.insertId;
      return res.status(201).json({ message: "Artist and services created successfully!", artistId });
    });
  });
};

// login user
export const Login = (req, res) => {
  const q = "SELECT * FROM artist WHERE Email = ?";
  db.query(q, [req.body.Email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    const client = data[0];
    const isPasswordValid = bcrypt.compareSync(req.body.Password, client.Password);

    if (!isPasswordValid) return res.status(401).json("Invalid Password!");

    return res.status(200).json({ message: 'Login successful', client });
  });
};

// Artist dashboard 
export const ArtistDashboard = (req, res) => {
  // Check if the artist ID is provided
  const artistId = req.body.Artist_id;
  if (!artistId) return res.status(400).json("Artist ID is required");
  

// Create new artist dashboard entry
const newArtistDashboard = {
  Artist_id: artistId,
  BrandName: req.body.BrandName,
  Address: req.body.Address,
  Location: req.body.Location,
  ContactNumber: req.body.ContactNumber,
  Fileurl: JSON.stringify(req.body.Fileurl) 
};

  const insertArtistDashboardQuery = `
    INSERT INTO Artistdashboard (Artist_id,  BrandName, Address, Location, ContactNumber, Fileurl) 
    VALUES (?, ?, ?, ?, ?, ?)`;

  db.query(insertArtistDashboardQuery, [
    newArtistDashboard.Artist_id,
    newArtistDashboard.BrandName,
    newArtistDashboard.Address,
    newArtistDashboard.Location,
    newArtistDashboard.ContactNumber,
    newArtistDashboard.Fileurl
  ], (err, result) => {
    if (err) return res.status(500).json(err);

    // Insert services if provided
    if (req.body.Services && req.body.Services.length > 0) {
      const services = req.body.Services.map(service => [
        artistId, 
        service.Service_name, 
        service.Price, 
        service.Duration
      ]);

      const insertServiceQuery = `INSERT INTO Services (Artist_id, Service_name, Price, Duration) VALUES ?`;
      console.log(services);

      db.query(insertServiceQuery, [services], (err, serviceResult) => {
        if (err) return res.status(500).json(err);

        return res.status(201).json({
          message: "Artist dashboard and services created successfully!",
          artistId: artistId
        });
      });
    } else {
      return res.status(201).json({
        message: "Artist dashboard created successfully without services!",
        artistId: artistId
      });
    }
  });
};



export const fetchArtistById = (req, res) => {
  if (!req.params.id) {
      return res.status(400).json("ID is required");
  }

  const artistId = req.params.id;

  const query = `
      SELECT 
          a.Artist_id, 
          ad.BrandName, 
          ad.Address, 
          ad.Location, 
          ad.ContactNumber, 
          ad.Fileurl,
          a.created_at, 
          a.updated_at,
          s.Service_id,
          s.Service_name, 
          s.Price, 
          s.Duration, 
          s.created_at as service_created_at, 
          s.updated_at as service_updated_at
      FROM Artist a
      LEFT JOIN Artistdashboard ad ON a.Artist_id = ad.Artist_id
      LEFT JOIN Services s ON a.Artist_id = s.Artist_id
      WHERE a.Artist_id = ?
  `;

  db.query(query, [artistId], (err, data) => {
      if (err) {
          console.error("Database query error:", err); // Log the error
          return res.status(500).json(err);
      }
      if (data.length === 0) {
          return res.status(404).json("Artist not found");
      }

      console.log("Fileurl before parsing:", data[0].Fileurl); // Log Fileurl for debugging

      let fileUrls;
      try {
          fileUrls = data[0].Fileurl;
          console.log(fileUrls)
      } catch (parseError) {
          console.error("Error parsing file URLs:", parseError); // Log parsing errors
          return res.status(500).json("Error parsing file URLs");
      }

      const artist = {
          Artist_id: data[0].Artist_id,
          BrandName: data[0].BrandName,
          Address: data[0].Address,
          Location: data[0].Location,
          ContactNumber: data[0].ContactNumber,
          Fileurl: fileUrls,
          created_at: data[0].created_at,
          updated_at: data[0].updated_at,
          Services: []
      };

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

      return res.status(200).json(artist);
  });
};


// Fetch artists by location
export const fetchArtistsByLocation = (req, res) => {
  const location = req.params.location;

  if (!location) {
    return res.status(400).json("Location is required");
  }

  const query = `
    SELECT 
      a.Artist_id, 
      ad.BrandName, 
      ad.Address, 
      ad.Location, 
      ad.ContactNumber, 
      ad.Fileurl,
      a.created_at, 
      a.updated_at,
      GROUP_CONCAT(
        JSON_OBJECT(
          'Service_id', s.Service_id,
          'Service_name', s.Service_name,
          'Price', s.Price,
          'Duration', s.Duration,
          'created_at', s.created_at,
          'updated_at', s.updated_at
        ) ORDER BY s.Service_id
      ) AS Services
    FROM Artist a
    LEFT JOIN Artistdashboard ad ON a.Artist_id = ad.Artist_id
    LEFT JOIN Services s ON a.Artist_id = s.Artist_id
    WHERE ad.Location = ?
    GROUP BY a.Artist_id
  `;

  db.query(query, [location], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (data.length === 0) {
      return res.status(404).json("No artists found in this location");
    }

    const artists = data.map(artist => {
      let services = [];
      try {
        services = artist.Services ? JSON.parse(`[${artist.Services}]`) : [];
      } catch (parseError) {
        console.error("Error parsing services JSON:", parseError);
      }

      return {
        Artist_id: artist.Artist_id,
        BrandName: artist.BrandName,
        Address: artist.Address,
        Location: artist.Location,
        ContactNumber: artist.ContactNumber,
        Fileurl: artist.Fileurl,
        created_at: artist.created_at,
        updated_at: artist.updated_at,
        Services: services
      };
    });

    return res.status(200).json(artists);
  });
};

