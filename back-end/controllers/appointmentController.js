import Booking from '../models/Booking.js';
import Artist from '../models/Artist.js';
import Service from '../models/Services.js';
import Client from '../models/Client.js';


// Book an appointment
export const bookAppointment = async (req, res) => {
  const {artist, client, service, bookingDate, comment } = req.body;

  if (!service) {
    return res.status(400).json("Service ID is required");
  }

  const now = new Date();
  const bookingDateTime = new Date(bookingDate);
  if (bookingDateTime <= now) { 
    return res.status(400).json("Booking date must be in the future");
  }

  try {
    // Check if the artist and time/date combination is available
    const existingBooking = await Booking.findOne({ artist, bookingDate: bookingDateTime });
    
    if (existingBooking) {
      return res.status(400).json("This artist is not available at the selected time and date.");
    }

    // If artist and time/date are available, proceed with booking
    const newBooking = new Booking({
      artist,
      client,
      service,
      bookingDate: bookingDateTime,
      comment
    });

    const savedBooking = await newBooking.save();
    return res.status(200).json({ message: "Appointment booked successfully.", booking: savedBooking });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const fetchAllAppointments = async (req, res) => {
  try {
    const appointments = await Booking.find()
      .populate('Artist_id', 'name email')
      .populate('Client_id', 'name email')
      .populate('Service_id', 'serviceName price')
      .exec();

    return res.status(200).json(appointments);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};



// Cancel an appointment
export const cancelAppointment = async (req, res) => {
  const { Booking_id } = req.params;

  try {
    const deletedBooking = await Booking.findByIdAndDelete(Booking_id);
    
    if (!deletedBooking) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    return res.status(200).json("Appointment canceled successfully.");
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

  
