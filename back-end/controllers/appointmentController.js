import { db } from '../db.js';

// Book an appointment
export const bookAppointment = async (req, res) => {
  const { Artist_id, Client_id, Service_id, Booking_date, Comment } = req.body;

  if (!Service_id) {
    return res.status(400).json("Service ID is required");
  }

  const now = new Date();
  const bookingDateTime = new Date(Booking_date);
  if (bookingDateTime <= now) { 
    return res.status(400).json("Booking date must be in the future");
  }

  try {
    // Check if the artist and time/date combination is available
    const q = "SELECT * FROM Booking WHERE Artist_id = ? AND Booking_date = ?";
    const values = [Artist_id, Booking_date];
    
    const result = await db.query(q, values);
    
    if (result && result.length > 0) {
      return res.status(400).json("This artist is not available at the selected time and date.");
    }

    // If artist and time/date are available, proceed with booking
    const insertQuery = "INSERT INTO Booking (Artist_id, Client_id, Service_id, Booking_date, Comment) VALUES (?, ?, ?, ?, ?)";
    const insertValues = [Artist_id, Client_id, Service_id, Booking_date, Comment];
    
    const newBooking = await db.query(insertQuery, insertValues);
    return res.status(200).json({ message: "Appointment booked successfully.", booking: newBooking[0] });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Fetch all appointments
export const fetchAllAppointments = (req, res) => {
    const query = "SELECT * FROM Booking"; // Use the correct table name
  
    db.query(query, (error, results) => {
      if (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
      }
  
      return res.status(200).json(results);
    });
  };


// Cancel an appointment
export const cancelAppointment = (req, res) => {
    const { Booking_id } = req.params;
  
    const q = "DELETE FROM Booking WHERE Booking_id = ?";
    db.query(q, Booking_id, (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Appointment not found' });
      }
      return res.status(200).json("Appointment canceled successfully.");
    });
  };
  
