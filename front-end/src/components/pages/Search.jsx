import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';

const Search = ({ artists, onFilter }) => {
    const [query, setQuery] = useState('');

    useEffect(() => {
        const filteredArtists = artists.filter(artist =>
            artist.location.toLowerCase().includes(query.toLowerCase())
        );
        onFilter(filteredArtists);
    }, [query, artists, onFilter]);

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    return (
        <div className="search-bar">
            <FaMapMarkerAlt className="location-icon" />
            <input
                type="text"
                placeholder="Search for Artist in your Location"
                value={query}
                onChange={handleInputChange}
                className="search-input"
            />
        </div>
    );
};

export default Search;
