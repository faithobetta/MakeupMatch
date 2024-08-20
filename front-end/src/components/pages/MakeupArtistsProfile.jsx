/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Map from "./Map";
import "../CSS-pages/MakeupArtistsProfile.css";

const MakeupArtistsProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [data, setData] = useState(null);
  const [imgData, setImgData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [reviewsError, setReviewsError] = useState(null);
  const [newRating, setNewRating] = useState(1);
  const [newComment, setNewComment] = useState("");
  const [postingReview, setPostingReview] = useState(false);
  const [postReviewError, setPostReviewError] = useState(null);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const locationCoordinates = {
    barking_dagenham: { lat: 51.5607, lng: 0.1557 },
    barnet: { lat: 51.6538, lng: -0.2003 },
    bexley: { lat: 51.455, lng: 0.166 },
    brent: { lat: 51.5588, lng: -0.2817 },
    bromley: { lat: 51.405, lng: 0.0146 },
    camden: { lat: 51.529, lng: -0.1255 },
    croydon: { lat: 51.3762, lng: -0.0982 },
    ealing: { lat: 51.5136, lng: -0.3084 },
    enfield: { lat: 51.6521, lng: -0.0812 },
    greenwich: { lat: 51.4821, lng: 0.0057 },
    hackney: { lat: 51.545, lng: -0.055 },
    hammersmith_fulham: { lat: 51.4927, lng: -0.2334 },
    haringey: { lat: 51.5908, lng: -0.1098 },
    harrow: { lat: 51.5792, lng: -0.333 },
    havering: { lat: 51.559, lng: 0.2187 },
    hillingdon: { lat: 51.5333, lng: -0.4584 },
    hounslow: { lat: 51.4746, lng: -0.3455 },
    islington: { lat: 51.538, lng: -0.1024 },
    kensington_chelsea: { lat: 51.4975, lng: -0.194 },
    kingston_upon_thames: { lat: 51.4123, lng: -0.3007 },
    lambeth: { lat: 51.4607, lng: -0.1167 },
    lewisham: { lat: 51.4416, lng: -0.0117 },
    merton: { lat: 51.4155, lng: -0.1886 },
    newham: { lat: 51.5076, lng: 0.046 },
    redbridge: { lat: 51.5898, lng: 0.0817 },
    richmond_upon_thames: { lat: 51.451, lng: -0.3067 },
    southwark: { lat: 51.5035, lng: -0.0804 },
    sutton: { lat: 51.3618, lng: -0.1942 },
    tower_hamlets: { lat: 51.5097, lng: -0.0175 },
    waltham_forest: { lat: 51.5908, lng: -0.0118 },
    wandsworth: { lat: 51.4576, lng: -0.1933 },
    westminster: { lat: 51.4975, lng: -0.1357 },
  };
  const fetchArtistById = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5174/api/auth/fetchArtist/${id}`
      );
      setData(response.data);

      const location = response.data.Location.toLowerCase().replace(" ", "_");
      if (locationCoordinates[location]) {
        const { lat, lng } = locationCoordinates[location];
        setLatitude(lat);
        setLongitude(lng);
      } else {
        console.error("Location not found in the coordinates array");
      }

      if (response.data.Fileurl) {
        const correctedUrlString = response.data.Fileurl.trim();
        try {
          const urls = JSON.parse(correctedUrlString);
          setImgData(urls);
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
      const response = await axios.get(
        `http://localhost:5174/api/review/reviews/${id}`
      );
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
      const response = await axios.post(
        `http://localhost:5174/api/review/post-review`,
        {
          Artist_id: id,
          Client_id: 1, 
          Rating: newRating,
          Comment: newComment,
        }
      );

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

  const Review = ({ review }) => {
    return (
      <div className="review">
        <div className="rating">
          {Array(review.Rating)
            .fill()
            .map((item, i) => (
              <img src="/star.png" alt="Star" key={i} />
            ))}
        </div>
        <p>
          <strong>Comment:</strong> {review.Comment}
        </p>
      </div>
    );
  };

  return (
    <div className="makeup-artists-profile">
      <h1>Makeup Artist Profile</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : data ? (
        <>
          {imgData.length > 0 && (
            <img className="profile-img" src={imgData[0]} alt="Profile" />
          )}

          <div className="profile-brandname">
          <h2>{data.BrandName}</h2>
          </div>
          
          <div className="div-address">
            <p>{data.Address}</p>
          </div>

          <div className="div-service">
            <h3>Services We Offer</h3>
            <ul>
              {data.Services?.map((service) => (
                <li key={service.Service_id} className="service-item">
                  {service.Service_name}: £{service.Price} for{" "}
                  {service.Duration} minutes
                  <button
                    className="book"
                    onClick={() =>
                      navigate("/booking", {
                        state: { artistData: data, service: service },
                      })
                    }
                  >
                    Book service
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="work-pictures">
            <h3>Pictures and Videos of Our Work</h3>
            <div className="grid-layout">
              {imgData.map((url, index) => (
                <div key={index} className="grid-item">
                  <img className="work-img"
                    src={url}
                    alt={`Upload ${index}`}
                    
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="div-contact">
            <h3>Contact Number</h3>
            <p>{data.ContactNumber}</p>
          </div>

          <div className="reviews-section">

            <div className="add-review">
              <h3>Add a Review</h3>
              <form className="addForm" onSubmit={handlePostReview}>
                <input className="comment-input"
                  type="text"
                  placeholder="Write your opinion"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  required
                />
                <select className="rating-div"
                  value={newRating}
                  onChange={(e) => setNewRating(parseInt(e.target.value))}
                  required
                >
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <option key={rating} value={rating}>
                      {rating}
                    </option>
                  ))}
                </select>
                <button className="review-submit" type="submit" disabled={postingReview}>
                  {postingReview ? "Sending..." : "Submit Review "}
                </button>
                {postReviewError && <p className="error">{postReviewError}</p>}
              </form>
              </div>

            <h2>Reviews</h2>
            {reviewsLoading ? (
              <p>Loading reviews...</p>
            ) : reviewsError ? (
              <p>{reviewsError}</p>
            ) : reviews.length > 0 ? (
              reviews.map((review) => (
                <Review key={review.id} review={review} />
              ))
            ) : (
              <p>No reviews yet.</p>
            )}


          </div>

          <div className="map-container">
            <h3>Location</h3>
            <Map latitude={latitude} longitude={longitude} />
          </div>
        </>
      ) : (
        <p>Artist not found.</p>
      )}
    </div>
  );
};

export default MakeupArtistsProfile;
