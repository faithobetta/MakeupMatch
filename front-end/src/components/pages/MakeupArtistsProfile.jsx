import { useEffect, useState } from "react";
import "../CSS-pages/MakeupArtistsProfile.css";
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import Map from './Map';

function MakeupArtistsProfile() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [imgData, setImgData] = useState([]); // Initialize as an empty array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [reviewsLoading, setReviewsLoading] = useState(true);
    const [reviewsError, setReviewsError] = useState(null);
    const [newRating, setNewRating] = useState(1);
    const [newComment, setNewComment] = useState("");
    const [postingReview, setPostingReview] = useState(false);
    const [postReviewError, setPostReviewError] = useState(null);

    const handleBookService = () => {
        navigate('/booking');
    };

    const fetchArtistById = async () => {
        try {
            const response = await axios.get(`http://localhost:5174/api/auth/fetchArtist/${id}`);
            console.log("Artist Data:", response.data);
            setData(response.data);

            if (response.data.Fileurl) {
                const correctedUrlString = response.data.Fileurl.trim();

                console.log("Raw Fileurl:", correctedUrlString);

                try {
                    
                    const urls = JSON.parse(correctedUrlString);
                    setImgData(urls); 
                    console.log("Image URLs:", urls); 
                } catch (jsonError) {
                    console.error("Error parsing Fileurl:", jsonError);
                    setError("Error processing image URLs.");
                }
            }
        } catch (error) {
            console.error("Error fetching artist:", error);
            setError("Error fetching artist data. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const fetchReviews = async () => {
        try {
            const response = await axios.get(`http://localhost:5174/api/review/reviews/${id}`);
            setReviews(response.data);
        } catch (error) {
            console.error("Error fetching reviews:", error);
            setReviewsError("Error fetching reviews. Please try again later.");
        } finally {
            setReviewsLoading(false);
        }
    };

    const handlePostReview = async (e) => {
        e.preventDefault();
        setPostingReview(true);
        setPostReviewError(null);

        try {
            const response = await axios.post(`http://localhost:5174/api/review/reviews`, {
                Artist_id: id,
                Client_id: 1, // Adjust as needed for client authentication
                Rating: newRating,
                Comment: newComment
            });
            
            setReviews((prevReviews) => [...prevReviews, response.data]);
            setNewRating(1);
            setNewComment("");
        } catch (error) {
            console.error("Error posting review:", error);
            setPostReviewError("Error posting review. Please try again later.");
        } finally {
            setPostingReview(false);
        }
    };

    useEffect(() => {
        fetchArtistById();
        fetchReviews();
    }, [id]);

    return (
        <div className="makeup-artists-profile">
            <h1>Makeup Artist Profile</h1>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : data ? (
                <>
                    {imgData.length > 0 && <img className="profile-img" src={imgData[0]} alt="Profile" />}
                    <h2>{data.BrandName}</h2>
                    <div className="div-address">
                        <p>{data.Address}</p>
                    </div>
                    <div className="div-service">
                        <h3>Services We Offer</h3>
                        <ul>
                            {data.Services?.map((service) => (
                                <li key={service.Service_id} className="service-item">
                                    {service.Service_name}: £{service.Price} for {service.Duration} minutes
                                    <button className="book" onClick={handleBookService}>Book service</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="work-pictures">
                        <h3>Pictures and Videos of Our Work</h3>
                        <div className="grid-layout">
                            {imgData.map((url, index) => (
                                <div key={index} className="grid-item">
                                    <img src={url} alt={`Upload ${index}`} width="500" height="400" />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="div-contact">
                        <h3>Contact Number</h3>
                        <p>{data.ContactNumber}</p>
                        
                    </div>

                    <div className="reviews-section">
                        <h1>Reviews</h1>
                        {reviewsLoading ? (
                            <p>Loading reviews...</p>
                        ) : reviewsError ? (
                            <p>{reviewsError}</p>
                        ) : reviews.length > 0 ? (
                            <ul className="reviews-list">
                                {reviews.map((review) => (
                                    <li key={review.id} className="review-item">
                                        <p><strong>Rating:</strong> {review.Rating} / 5</p>
                                        <p><strong>Comment:</strong> {review.Comment}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No reviews yet.</p>
                        )}
                    </div>

                    <div className="post-review-section">
                        <h3>Leave a Review</h3>
                        <form onSubmit={handlePostReview}>
                            <label className="rating">
                                Rating:
                                <select className="rate" value={newRating} onChange={(e) => setNewRating(Number(e.target.value))}>
                                    {[1, 2, 3, 4, 5].map((rating) => (
                                        <option key={rating} value={rating}>{rating}</option>
                                    ))}
                                </select>
                            </label> <br />
                            <label className="comment">
                                Comment:
                                <textarea className="text"
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    required
                                ></textarea>
                            </label><br />
                            <button className="review-button" type="submit" disabled={postingReview}>Submit Review</button>
                            {postReviewError && <p>{postReviewError}</p>}
                        </form>
                    </div>
                    <div className="map-div">
                        <Map className="map"/>
                    </div>
                    
                </>
            ) : (
                <p>No artist data found.</p>
            )}
           
            
        </div>
    );
}

export default MakeupArtistsProfile;
