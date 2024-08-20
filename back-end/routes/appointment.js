import express from 'express';
import { bookAppointment, cancelAppointment, fetchAllAppointments, } from '../controllers/AppointmentController.js';


const router = express.Router();

router.post('/booking', bookAppointment);
router.get('/appointments', fetchAllAppointments);
router.delete('/appointments/:Booking_id', cancelAppointment);

export default router;
