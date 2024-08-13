import express from 'express';
import { SignUpClient, Login } from '../controllers/authController.js';
import { fetchArtistById, fetchArtistsByLocation, SignUpArtist } from '../controllers/artistController.js';
import { ArtistDashboard } from '../controllers/artistController.js';

const router = express.Router();

router.post('/signUpArtist', SignUpArtist);
router.post('/signUpClient', SignUpClient);
router.post('/login', Login);
router.get('/fetchArtist/:id', fetchArtistById);
router.get('/fetchArtistsByLocation/:location', fetchArtistsByLocation);
router.post('/artist-dashboard', ArtistDashboard);

export default router;
