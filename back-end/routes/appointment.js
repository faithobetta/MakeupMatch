import express from 'express';
import { bookAppointment, fetchAllAppointments, cancelAppointment } from '../controllers/appointmentController.js';

const router = express.Router();

router.post('/book', bookAppointment);
router.get('/appointments', fetchAllAppointments);
router.delete('/appointments/:Booking_id', cancelAppointment);

export default router;
