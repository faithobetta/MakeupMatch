import express from 'express';
// import { body } from 'express-validator';
import { SignUpArtist, SignUpClient, Login, fetchArtistById } from '../controllers/authController.js'; 

const router = express.Router();

// Signup route for artists
router.get('/fetchArtist/:id', fetchArtistById);
router.post('/signUpArtist', SignUpArtist);
router.post('/signUpClient', SignUpClient);
router.post('/login', Login);

// router.post('/login', authController.login);

export default router;
