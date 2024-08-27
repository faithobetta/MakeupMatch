import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import "../CSS-pages/Artist.css";

const Artist = () => {
  const { location } = useParams(); // Get the location from the URL
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await fetch(`http://localhost:5174/api/auth/fetchArtistsByLocation/${location}`);
        if (!response.ok) {
          throw new Error('Failed to fetch artists');
        }
        const data = await response.json();

        // Since Fileurl is already an array, no need to parse it
        const updatedArtists = data.map(artist => {
          return {
            ...artist,
            fileUrl: artist.fileUrl || [], // Ensuring fileUrl is always an array
          };
        });

        setArtists(updatedArtists);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchArtists();
  }, [location]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <h2 className="artist-top">Makeup Artists in {location.replace('_', ' ')}</h2>
      <div className="artist-grid">
        {artists.map((artist) => (
          <Link key={artist.artistId} to={`/makeupArtistsProfile/${artist.artistId}`} className="artist-card-link">
            <div className="artist-card">
              <h2 className="artist-header">{artist.brandName}</h2>
              {/* Render the first image if available */}
              {artist.fileUrl.length > 0 && <img className="artist-image" src={artist.fileUrl[0]} alt="Profile" />}
              <h5 className="artist-address">{artist.address}</h5>
              <h4 className="artist-location">{artist.location}</h4>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default Artist;
