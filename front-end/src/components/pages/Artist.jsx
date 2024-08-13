// Artist.js
import "../CSS-pages/Artist.css";

const artists = [
  {
    id: 1,
    header: "Featured Artist",
    image: "https://images.unsplash.com/photo-1620576504147-118a150bbca2?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWFrZSUyMHVwJTIwYXJ0aXN0fGVufDB8fDB8fHwy",
    name: "Faith",
    brandName: "Faith's Art Studio",
    address: "123 Art Lane, Creativity City",
  },
  {
    id: 2,
    header: "Emerging Talent",
    image: "https://images.unsplash.com/photo-1620576504147-118a150bbca2?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWFrZSUyMHVwJTIwYXJ0aXN0fGVufDB8fDB8fHwy",
    name: "Hope",
    brandName: "Hope's Craft Corner",
    address: "456 Inspiration Blvd, Imagination Town",
  },
  {
    id: 3,
    header: "Master of Color",
    image: "artist3.jpg",
    name: "Joy",
    brandName: "Joy's Color World",
    address: "789 Color Ave, Vibrant Village",
  },
];

const Artist = () => {
  return (
  <>
    <h2 className="artist-top">Makeup Artist in your location</h2>
    <div className="artist-grid">
      {artists.map((artist) => (
        <div key={artist.id} className="artist-card">
          <h2 className="artist-header">{artist.header}</h2>
          <img src={artist.image} alt={artist.name} className="artist-image" />
          <h2 className="artist-name">{artist.name}</h2>
          <h3 className="artist-brand-name">{artist.brandName}</h3>
          <h4 className="artist-address">{artist.address}</h4>
        </div>
      ))}
    </div>
    </>
  );
}

export default Artist;
