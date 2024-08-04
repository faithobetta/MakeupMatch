import "../CSS-pages/booking.css";
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';

const Booking = () => {
    const { Name,
        Email,
        Password,
        ProfilePicture,
        BrandName,
        Address,
        Services,
        UploadedFiles, 
        ContactNumber } = useParams();
    const navigate = useNavigate();

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState('10:00');
    const [bookedServices, setBookedServices] = useState(initialBookedServices || [service]);

    useEffect(() => {
        if (service && !bookedServices.some(s => s.name === service.name)) {
            setBookedServices(prevServices => [...prevServices, service]);
        }
    }, [service]);

    const handleBooking = () => {
        const totalAmount = calculateTotalPrice();
        const currency = bookedServices[0]?.currency || 'USD';
        navigate('/payment', { state: { totalAmount, currency } });
    };

    const handleAddMoreService = () => {
        navigate('/makeup-artists-profile', { state: { profilePicture, brandName, address, services, contactNumber, uploadedFiles, bookedServices } });
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
