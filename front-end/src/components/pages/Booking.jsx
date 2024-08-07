import "../CSS-pages/booking.css";
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import axios from 'axios';

const Booking = () => {
    const { ArtistId, ClientId, ServiceId } = useParams();
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState('10:00');
    const [bookedServices, setBookedServices] = useState([]);
    const [comment, setComment] = useState("");

    useEffect(() => {
        if (serviceId && !bookedServices.some(s => s.id === serviceId)) {
            // Fetch service details from backend if needed
            axios.get(`/Services/${serviceId}`).then(response => {
                setBookedServices(prevServices => [...prevServices, response.data]);
            });
        }
    }, [serviceId]);

    const handleBooking = () => {
        const bookingDate = new Date(selectedDate);
        const [hours, minutes] = selectedTime.split(':');
        bookingDate.setHours(hours, minutes);

        const bookingData = {
            Artist_id: artistId,
            Client_id: clientId,
            Service_id: serviceId,
            booking_date: bookingDate.toISOString(),
            Comment: comment,
        };

        axios.post('/booking/book', bookingData)
            .then(response => {
                const totalAmount = calculateTotalPrice();
                const currency = bookedServices[0]?.currency || 'USD';
                navigate('/payment', { state: { totalAmount, currency } });
            })
            .catch(error => {
                console.error("There was an error booking the service!", error);
            });
    };

    const handleAddMoreService = () => {
        navigate('/makeup-artists-profile', { state: { bookedServices } });
    };

    const calculateTotalPrice = () => {
        return bookedServices.reduce((total, service) => total + parseFloat(service.price || 0), 0).toFixed(2);
    };

    const handleRemoveService = (index) => {
        setBookedServices(prevServices => prevServices.filter((_, i) => i !== index));
    };

    return (
        <div className="book-service-page">
            <h1>Book Service</h1>

            <div className="booking-details">
                <label className="select-date" htmlFor="date-picker">Select Date:</label>
                <DatePicker 
                    id="date-picker"
                    selected={selectedDate} 
                    onChange={date => setSelectedDate(date)} 
                    dateFormat="MMMM d, yyyy"
                />
            </div>
        
            <div className="booking-details">
                <label className="select-time" htmlFor="time-picker">Select Time:</label>
                <TimePicker 
                    id="time-picker"
                    onChange={setSelectedTime} 
                    value={selectedTime}
                />
            </div>
            <div className="booking-details">
                <label htmlFor="comment">Comment:</label>
                <textarea id="comment" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
            </div>
            <div className="booked-services">
                <ul>
                    {bookedServices.map((service, index) => (
                        <li className="booking-service" key={index}>
                            {service.name}: {service.price} {service.currency}
                            <button className="remove-service" onClick={() => handleRemoveService(index)}>Remove</button>
                        </li>
                    ))}
                </ul>
                <p className="total-price">Total Price: {calculateTotalPrice()} {bookedServices[0]?.currency}</p>
            </div>
            <button className="add-service-book" onClick={handleAddMoreService}>Add More Service</button>
        
            <button className="book-button" onClick={handleBooking}>Check Out</button>
        </div>
    );
};

export default Booking;
