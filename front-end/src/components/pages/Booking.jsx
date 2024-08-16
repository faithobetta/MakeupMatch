import "../CSS-pages/booking.css";
import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

const Booking = () => {
    const {serviceId} = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState('10:00');
    const { artistData, service } = location.state || {};
    const artistIdx = artistData?.Artist_id || null;
    const serviceIdx = service?.Service_id || null;    
    console.log(artistData,service)
    const [bookedServices, setBookedServices] = useState([]);
    const [comment, setComment] = useState("");
    const client = sessionStorage.getItem('clientId');
    useEffect(() => {
        if (serviceId && !bookedServices.some(s => s.Service_id === parseInt(serviceId))) {
            // Fetch service details from backend if needed
            axios.get(`http://localhost:5174/api/services/${serviceId}`).then(response => {
                setBookedServices(prevServices => [...prevServices, response.data]);
            }).catch(error => {
                console.error("Error fetching service details:", error);
            });
        }
    }, [serviceId, bookedServices]);

    const handleBooking = async() => {
        const bookingDate = new Date(selectedDate);
        const [hours, minutes] = selectedTime.split(':');
        bookingDate.setHours(hours, minutes);

        const bookingData = {
            Artist_id: artistIdx ,
            Client_id: parseInt(client),
            Service_id: serviceIdx,
            Booking_date: bookingDate.toISOString(),
            Comment: comment,
        };
        
          console.log(bookingData)
        try {
            const response = await axios.post('http://localhost:5174/api/appointment/booking', bookingData);
            console.log("Booking response:", response.data);
            const totalAmountx = calculateTotalPrice();
            const currency = bookedServices[0]?.currency || '£';
            const totalAmount =service?.Price
            navigate('/payment', { state: { totalAmount, currency } });
        } catch (error) {
            console.error("There was an error booking the service!", error);
        }
    };

    const handleAddMoreService = () => {
        navigate('/makeupArtistsProfile', { state: { bookedServices } });
    };

    const calculateTotalPrice = () => {
        return bookedServices.reduce((total, service) => total + parseFloat(service.Price || 0), 0).toFixed(2);
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
                    onChange={e => setSelectedDate(e.target.value)} 
                    dateFormat="MMMM d, yyyy"
                />
            </div>
        
            <div className="booking-details">
                <label className="select-time" htmlFor="time-picker">Select Time:</label>
                <input 
                     value={selectedTime}
                   onChange={(e) => setSelectedTime(e.target.value)}
                  aria-label="Time" type="time" />
            </div>
            
            <div className="booking-details">
                <label htmlFor="comment">Comment:</label>
                <textarea id="comment" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
            </div>
            <div className="booked-services">
                <ul>
                    {bookedServices.map((service, index) => (
                        <li className="booking-service" key={index}>
                            {service.Service_name}: {service.Price} {service.currency}
                            <button className="remove-service" onClick={() => handleRemoveService(index)}>Remove</button>
                        </li>
                    ))}
                </ul>
                <p className="total-price">Service Name: {service.Service_name}</p>
                <p className="total-price">Total Price: {service.Price}</p>
            </div>
            <button className="add-service-book" onClick={handleAddMoreService}>Add More Service</button>
        
            <button className="book-button" onClick={handleBooking}>Check Out</button>
        </div>
    );
};

export default Booking;
