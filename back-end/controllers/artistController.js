import bcrypt from 'bcryptjs';
import Artist from '../models/Artist.js';
import ArtistDashboard from '../models/ArtistDashboard.js';
import Services from '../models/Services.js';

// Signup Artist 
export const signUpArtist = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    // Check if the artist already exists
    const existingArtist = await Artist.findOne({ email });
    if (existingArtist) {
      return res.status(409).json("Artist already exists!");
    }

    // Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    // Create a new artist instance
    const newArtist = new Artist({
      name,
      email,
      password: hash,
    });

    // Save the new artist to the database
    const savedArtist = await newArtist.save();
    return res.status(201).json({ message: "Artist created successfully!", artistId: savedArtist._id });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error", details: err });
  }
};

// Login Artist
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the artist by email
    const artist = await Artist.findOne({ email });
    if (!artist) {
      return res.status(404).json("User not found!");
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = bcrypt.compareSync(password, artist.password);
    if (!isPasswordValid) {
      return res.status(401).json("Invalid Password!");
    }

    return res.status(200).json({ message: 'Login successful', artist });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error", details: err });
  }
};

// Create Artist Dashboard 
export const createArtistDashboard = async (req, res) => {
  try {
    const { artistId, brandName, address, location, contactNumber, fileUrl = [], services } = req.body;

    if (!artistId) return res.status(400).json("Artist ID is required");

    // Create a new artist dashboard entry
    const newArtistDashboard = new ArtistDashboard({
      artist: artistId,
      brandName,
      address,
      location,
      contactNumber,
      fileUrl
    });

    const savedDashboard = await newArtistDashboard.save();

    // Insert services if provided
    if (services && services.length > 0) {
      const servicesData = services.map(service => ({
        artist: artistId,
        serviceName: service.serviceName,
        price: service.price,
        duration: service.duration
      }));

      const savedServices = await Services.insertMany(servicesData);

      // Update dashboard with the saved services
      savedDashboard.services = savedServices.map(service => service._id);
      await savedDashboard.save();
    }

    return res.status(201).json({
      message: services.length > 0 ? "Artist dashboard and services created successfully!" : "Artist dashboard created successfully without services!",
      artistId
    });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error", details: err });
  }
};

// Fetch Artist by ID
export const fetchArtistById = async (req, res) => {
  try {
    const artistId = req.params.id;
    if (!artistId) return res.status(400).json({ error: "ID is required" });

    // Find artist and populate dashboard and services
    const artist = await Artist.findById(artistId)
      .populate({
        path: 'dashboard',
        populate: {
          path: 'services',
          model: 'Services'
        }
      })
      .exec();

    if (!artist) {
      return res.status(404).json({ error: "Artist not found" });
    }

    const dashboard = artist.dashboard;

    if (!dashboard) {
      return res.status(404).json({ error: "Dashboard not found for this artist" });
    }

    // Prepare artist data for response
    const artistData = {
      artistId: artist._id,
      brandName: dashboard.brandName || '',
      address: dashboard.address || '',
      location: dashboard.location || '',
      contactNumber: dashboard.contactNumber || '',
      fileUrl: dashboard.fileUrl || [],
      createdAt: artist.createdAt,
      updatedAt: artist.updatedAt,
      services: dashboard.services.map(service => ({
        serviceId: service._id,
        serviceName: service.serviceName || '',
        price: service.price || 0,
        duration: service.duration || 0,
        createdAt: service.createdAt,
        updatedAt: service.updatedAt
      }))
    };

    return res.status(200).json(artistData);
  } catch (err) {
    console.error("Error fetching artist by ID:", err);
    return res.status(500).json({ error: "Internal server error", details: err });
  }
};

// Fetch artists by location
export const fetchArtistsByLocation = async (req, res) => {
  try {
    const location = req.params.location;
    if (!location) return res.status(400).json("Location is required");

    const artists = await ArtistDashboard.find({ location })
      .populate('artist')
      .populate('services')
      .exec();

    if (!artists.length) {
      return res.status(404).json("No artists found in this location");
    }

    const artistData = artists.map(artistDashboard => ({
      artistId: artistDashboard.artist._id,
      brandName: artistDashboard.brandName,
      address: artistDashboard.address,
      location: artistDashboard.location,
      contactNumber: artistDashboard.contactNumber,
      fileUrl: artistDashboard.fileUrl,
      createdAt: artistDashboard.artist.createdAt,
      updatedAt: artistDashboard.artist.updatedAt,
      services: artistDashboard.services.map(service => ({
        serviceId: service._id,
        serviceName: service.serviceName,
        price: service.price,
        duration: service.duration,
        createdAt: service.createdAt,
        updatedAt: service.updatedAt
      }))
    }));

    return res.status(200).json(artistData);
  } catch (err) {
    return res.status(500).json({ error: "Internal server error", details: err });
  }
};
