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

        // Parse the Fileurl field for each artist
        const updatedArtists = data.map(artist => {
          return {
            ...artist,
            Fileurl: artist.Fileurl ? JSON.parse(artist.Fileurl) : [],
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
          
          <Link key={artist.Artist_id} to={`/makeupArtistsProfile/${artist.Artist_id}`} className="artist-card-link">
          <div className="artist-card">
            <h2 className="artist-header">{artist.BrandName}</h2>
            {/* Render the first image if available */}
            {artist.Fileurl.length > 0 && <img className="artist-image" src={artist.Fileurl[0]} alt="Profile" />}
            <h2 className="artist-name">{artist.name}</h2>
            <h4 className="artist-address">{artist.Address}</h4>
            <p className="artist-location">{artist.Location}</p>
            <p className="artist-contact">{artist.ContactNumber}</p>
          </div>
        </Link>
        ))}
      </div>
    </>
  );
}

export default Artist;
