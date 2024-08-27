import express from 'express';
import { SignUpClient, Login } from '../controllers/authController.js';
import { createArtistDashboard, fetchArtistById, fetchArtistsByLocation, signUpArtist } from '../controllers/artistController.js';


const router = express.Router();

router.post('/signUpArtist', signUpArtist);
router.post('/signUpClient', SignUpClient);
router.post('/login', Login);
router.get('/fetchArtist/:id', fetchArtistById);
router.get('/fetchArtistsByLocation/:location', fetchArtistsByLocation);
router.post('/artist-dashboard', createArtistDashboard);

export default router;
