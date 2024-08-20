import "../CSS-pages/admin.css";
import  { useEffect, useState } from 'react';
import axios from 'axios';

const Admin = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all appointments on component mount
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:5174/api/appointment/appointments'); // Make sure this endpoint matches your backend
        setAppointments(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchAppointments();
  }, []);

  const handleCancel = async (bookingId) => {
    try {
      await axios.delete(`http://localhost:5174/api/appointment/appointments/${bookingId}`); // Make sure this endpoint matches your backend
      setAppointments(appointments.filter(appt => appt.Booking_id !== bookingId));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Appointments</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Artist ID</th>
            <th>Client ID</th>
            <th>Service ID</th>
            <th>Booking Date</th>
            <th>Comment</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(appt => (
            <tr key={appt.Booking_id}>
              <td>{appt.Artist_id}</td>
              <td>{appt.Client_id}</td>
              <td>{appt.Service_id}</td>
              <td>{new Date(appt.Booking_date).toLocaleString()}</td>
              <td>{appt.Comment}</td>
              <td>
                <button onClick={() => handleCancel(appt.Booking_id)}>Cancel</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
