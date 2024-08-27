import "../CSS-pages/booking.css";
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

const Booking = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState('10:00');
    const { artistData, service } = location.state || {};
    console.log(artistData, service)
    const artistIdx = artistData?.artistId || null;
    const serviceIdx = service?.serviceId || null;

    const [bookedServices, setBookedServices] = useState([service || {}]);
    const [comment, setComment] = useState("");
    const client = sessionStorage.getItem('clientId');

    useEffect(() => {
        if (serviceIdx && !bookedServices.some(s => s.serviceIdx === parseInt(serviceIdx))) {
            // Fetch service details from backend if needed
            axios.get(`http://localhost:5174/api/services/${serviceIdx}`).then(response => {
                setBookedServices(prevServices => [...prevServices, response.data]);
            }).catch(error => {
                console.error("Error fetching service details:", error);
            });
        }
    }, [serviceIdx, bookedServices]);

    const handleBooking = async () => {
        const bookingDate = new Date(selectedDate);
        const [hours, minutes] = selectedTime.split(':');
        bookingDate.setHours(hours, minutes);

        const bookingData = {
            artist: artistIdx,
            client: client,
            service: serviceIdx,
            bookingDate: bookingDate.toISOString(),
            comment: comment,
        };
        console.log({
            artist: artistIdx,
            client: client,
            service: serviceIdx,
            bookingDate: bookingDate.toISOString(),
            comment: comment,
        });
        try {
            const response = await axios.post('http://localhost:5174/api/appointment/booking', bookingData);
            console.log("Booking response:", response.data);
            const currency = '£';
            const totalAmount =service?.price
            navigate('/payment', { state: { totalAmount, currency } });
        } catch (error) {
            console.error("There was an error booking the service!", error);
        }
    };

    // const handleAddMoreService = () => {
    //     navigate('/makeupArtistsProfile', { state: { bookedServices } });
    // };

    const calculateTotalPrice = () => {
        return bookedServices.reduce((total, service) => total + parseFloat(service.Price || 0), 0).toFixed(2);
    };

    // const handleRemoveService = (index) => {
    //     setBookedServices(prevServices => prevServices.filter((_, i) => i !== index));
    // };

    return (
        <div className="book-service-page">
            <h1>Book Service</h1>

            <div className="booking-details">
                <label className="select-date" htmlFor="date-picker">Select Date:</label>
                <DatePicker
                    id="date-picker" className="picker"
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    dateFormat="MMMM d, yyyy"
                />
            </div>

            <div className="booking-details">
                <label className="select-time" htmlFor="time-picker">Select Time:</label>
                <input className="picker"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    aria-label="Time" type="time" />
            </div>

            <div className="booking-details">
                <label className="booking-comment" htmlFor="comment">Comment:</label>
                <textarea className="comment" id="comment" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
            </div>

            <div className="booked-services">
                <ul>
                    {bookedServices.map((service, index) => (
<>  <p className="total-price">Service Name: {service?.serviceName}</p>
                <p className="total-price">Total Price: {service.price}</p>

</>
                    ))}
                </ul>
                          </div>
            {/* <button className="add-service-book" onClick={handleAddMoreService}>Add More Service</button> */}

            <button className="book-button" onClick={handleBooking}>Check Out</button>
        </div>
    );
};

export default Booking;
