// import "../CSS-pages/ArtistDashboard.css";
// import { useState } from 'react';
// import { useNavigate } from "react-router-dom";

// function ArtistDashboard() {
//     const navigate = useNavigate();
//     const [profilePicture, setProfilePicture] = useState(null);
//     const [brandName, setBrandName] = useState('');
//     const [address, setAddress] = useState('');
//     const [services, setServices] = useState([{ name: '', price: '', currency: 'USD' }]);
//     const [contactNumber, setContactNumber] = useState('');
//     const [uploadedFiles, setUploadedFiles] = useState([]);

//     const handleProfilePictureChange = (e) => {
//         setProfilePicture(URL.createObjectURL(e.target.files[0]));
//     };

//     const handleServiceChange = (index, field, value) => {
//         const updatedServices = [...services];
//         updatedServices[index][field] = value;
//         setServices(updatedServices);
//     };

//     const handleAddService = () => {
//         setServices([...services, { name: '', price: '', currency: 'USD' }]);
//     };

//     const handleRemoveService = (index) => {
//         const updatedServices = services.filter((_, i) => i !== index);
//         setServices(updatedServices);
//     };

//     const handleFileUpload = (e) => {
//         const files = Array.from(e.target.files);
//         setUploadedFiles([...uploadedFiles, ...files.map(file => URL.createObjectURL(file))]);
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const formData = {
//             profilePicture,
//             brandName,
//             address,
//             services,
//             contactNumber,
//             uploadedFiles,
//         };
//         console.log('Form Submitted:', formData);
//         navigate('/makeup-artists-profile', { state: formData });
//     };

//     return (
//         <div className="profile-page">
//             <h1>Makeup Artist Dashboard</h1>

//             <form onSubmit={handleSubmit}>
//                 <div className="profile-picture">
//                     <label>Profile Picture:</label>
//                     <input type="file" accept="image/*" onChange={handleProfilePictureChange} />
//                     {profilePicture && <img src={profilePicture} alt="Profile" width="100" />}
//                 </div>

//                 <div className="brand-name">
//                     <label>Brand Name:</label>
//                     <input type="text" value={brandName} onChange={(e) => setBrandName(e.target.value)} />
//                 </div>

//                 <div className="address">
//                     <label>Address:</label>
//                     <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
//                 </div>

//                 <div className="services">
//                     <label>Services:</label>
//                     {services.map((service, index) => (
//                         <div key={index} className="service">
//                             <input
//                                 type="text"
//                                 placeholder="Service Name"
//                                 value={service.name}
//                                 onChange={(e) => handleServiceChange(index, 'name', e.target.value)}
//                             />
//                             <input
//                                 type="text"
//                                 placeholder="Price"
//                                 value={service.price}
//                                 onChange={(e) => handleServiceChange(index, 'price', e.target.value)}
//                             />
//                             <select
//                                 value={service.currency}
//                                 onChange={(e) => handleServiceChange(index, 'currency', e.target.value)}
//                             >
//                                 <option value="USD">USD</option>
//                                 <option value="GBP">GBP</option>
//                             </select>
//                             <button type="button" onClick={() => handleRemoveService(index)}>Remove</button>
//                         </div>
//                     ))}
//                     <button className="add-service-book" type="button" onClick={handleAddService}>Add Service</button>
//                 </div>

//                 <div className="contact">
//                     <label>Contact Number:</label>
//                     <input type="text" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />
//                 </div>

//                 <div className="file-upload">
//                     <label>Upload Files (Pictures/Videos):</label>
//                     <input type="file" multiple accept="image/*,video/*" onChange={handleFileUpload} />
//                     <div className="uploaded-files">
//                         {uploadedFiles.map((file, index) => (
//                             <div key={index} className="uploaded-file">
//                                 {file.endsWith('.mp4') ? (
//                                     <video src={file} controls width="100" />
//                                 ) : (
//                                     <img src={file} alt={`Upload ${index}`} width="100" />
//                                 )}
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 <button className="artistDashboardButton" type="submit">Submit</button>
//             </form>
//         </div>
//     );
// }

// export default ArtistDashboard;
