import express from 'express';
import { SignUpClient, Login } from '../controllers/authController.js';
import { fetchArtistById, SignUpArtist } from '../controllers/artistController.js';
import { ArtistDashboard } from '../controllers/artistController.js';
import { Booking } from '../controllers/bookingController.js';

const router = express.Router();

router.post('/signUpArtist', SignUpArtist);
router.post('/signUpClient', SignUpClient);
router.post('/login', Login);
router.get('/fetchArtist/:id', fetchArtistById);
router.post('/artist-dashboard', ArtistDashboard);
router.post('/booking', Booking)

export default router;
