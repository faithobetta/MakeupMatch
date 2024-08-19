<h1 align="center" id="title">MakeupMatch</h1>

<p id="description">MakeupMatch is a platform designed to connect clients with professional makeup artists, allowing users to find and book beauty services tailored to their needs. the website helps clients to find makeup artists in their region. It functions as a marketplace where makeup artists can showcase their work, services, and availability, while clients can browse through profiles, read reviews, and book appointments easily.</p>

  
  
<h2> Features</h2>

Here're some of the project's best features:

*   Sign-Up and Login: Client and Artist Accounts: Both clients and makeup artists can create accounts on the platform. Clients can manage their bookings, while artists can manage their profiles, services, and client interactions.
    
*   Artist Profiles: Detailed profiles for makeup artists, including their portfolio, services offered, pricing, and cutomer reviews.
Artists can upload images and videos of their work to showcase their skills.

*   Service Booking: Clients can book specific services from an artist’s profile, selecting the date and time that suits them.
The platform may include features like scheduling tools and payment processing to streamline the booking process.

*   Location-Based Search: Users can search for makeup artists based on their location, making it easier to find professionals nearby.
   
*   Reviews and Ratings: Clients can leave reviews and ratings after their appointments, helping others make informed decisions.
Makeup artists can build their reputation on the platform based on client feedback.

*   Secure Payment: Integrated payment options ensure secure transactions between clients and artists.
Users can pay for services directly through the platform, often with a range of payment methods.

*   Customizable Services: The platform allows artists to offer a variety of services, from bridal makeup to special effects makeup, catering to different client needs.
Services can be tailored with different pricing and duration options.

*   User-Friendly Interface: The platform is designed to be intuitive and easy to navigate, ensuring a smooth experience for both clients and artists.
Mobile-friendly design ensures accessibility on various devices.


<h2>🛠️ Installation Steps:</h2>

<p>1. Start by cloning the project repository to your local machine</p>

```
git clone https://github.com/yourusername/MakeupMatch.git cd MakeupMatch
```

<p>2. Navigate to the root directory and install the dependencies for both the frontend and backend</p>

```
cd frontend npm install cd frontend npm install
```

<p>3. Set Up Firebase Go to the Firebase Console create a new project and set up Firebase services (like Authentication and Firestore) that are needed. Generate the Firebase configuration object and replace the existing configuration in the frontend under src/firebaseConfig.js:</p>

```
const firebaseConfig = {   apiKey: "YOUR_API_KEY"   authDomain: "YOUR_AUTH_DOMAIN"   projectId: "YOUR_PROJECT_ID"   storageBucket: "YOUR_STORAGE_BUCKET"   messagingSenderId: "YOUR_MESSAGING_SENDER_ID"   appId: "YOUR_APP_ID" }; export default firebaseConfig;
```

<p>4. Have MySQL installed on your machine. Create a new database</p>

```
CREATE DATABASE makeupmatch;
```

<p>5. Import the database schema</p>

```
mysql -u yourusername -p makeupmatch < backend/schema.sql
```

<p>6. Update the MySQL connection details in backend/config/dbConfig.js</p>

```
const dbConfig = {   host: 'localhost'   user: 'yourusername'   password: 'yourpassword'   database: 'makeupmatch' }; module.exports = dbConfig;
```

<p>7. In the backend directory create a .env file to store environment variables</p>

```
PORT=5000 DB_HOST=localhost DB_USER=yourusername DB_PASSWORD=yourpassword DB_NAME=makeupmatch
```

<p>8. In the frontend directory create a .env file to store environment variables:</p>

```
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
```

<p>9. Start the backend server by navigating to the backend directory and running: bash</p>

```
cd backend npm start
```

<p>10. Start the frontend React app by navigating to the frontend directory and running</p>

```
cd ../frontend npm run dev
```

  
  
<h2>💻 Built with</h2>

Technologies used in the project:

*   HTML: In MakeupMatch, HTML is used to define the basic structure of web pages, including headings, paragraphs, images, forms, and links.
  
*   CSS: n MakeupMatch, CSS is used to style the user interface (UI), making the platform visually appealing and user-friendly.
   
*   React:  In MakeupMatch, React is used to build the frontend of the application. It enables the development of reusable UI components, like artist profiles, booking forms, and navigation menus. React’s component-based architecture helps in efficiently managing the UI state and updating the view when data changes.
    
*   Node.js: In MakeupMatch, Node.js could be used to build the backend server that handles requests from the frontend, processes them, and interacts with the database.
   
*   Express.js: In MakeupMatch, Express.js is used to create the backend API that the frontend (built with React) interacts with. It handles routing e.g., handling different endpoints like /login, /fetchArtist/:id, and integrations with databases like MySQL.
   
*   Firebase: In MakeupMatch, Firebase Storage is used to securely upload, store, and retrieve images such as profile pictures and portfolios, leveraging its scalable cloud infrastructure and global CDN for efficient and fast delivery.
    
*   Axios: Axios is a popular JavaScript library used to make HTTP requests from the browser or Node.js. It supports promises and async/await syntax. In MakeupMatch, Axios is used in the frontend (React) to make API requests to the backend server (Express.js). For example, Axios was used to fetch artist data, post booking details, or retrieve reviews. It simplifies the process of communicating with the backend and handling responses or errors.
    
*   MySql: MySQL is an open-source relational database management system. It’s used to store and manage structured data using SQL (Structured Query Language). In MakeupMatch, MySQL is used to store persistent data such as user accounts, artist profiles, services, bookings, and reviews. The backend server (Node.js with Express.js) interacts with the MySQL database to perform CRUD (Create, Read, Update, Delete) operations on this data.

*   Yup: Yup is a JavaScript schema validation library that allows developers to define and validate data schemas. In MakeupMatch, Yup is used to validate form inputs on the frontend, ensuring that the data entered by users (such as during sign-up, login) meets certain criteria before being submitted.
