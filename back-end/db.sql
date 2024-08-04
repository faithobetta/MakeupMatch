

-- Table: Users
CREATE TABLE Client (
    Client_id SERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Table: Artists
CREATE TABLE Artist (
    Artist_id SERIAL PRIMARY KEY,
    Service_id INT NOT NULL REFERENCES service(Service_id) ON DELETE CASCADE,
    Name VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL,
    brandName VARCHAR(200) NOT NULL,
    Address VARCHAR(200) NOT NULL,
    ContactNumber VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: Appointments
CREATE TABLE Appointments (
    appointment_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES Users(user_id) ON DELETE CASCADE,
    artist_id INT NOT NULL REFERENCES Artists(artist_id) ON DELETE CASCADE,
    appointment_date TIMESTAMP NOT NULL,
    status VARCHAR(10) CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: Services
CREATE TABLE Services (
    Service_id SERIAL PRIMARY KEY,
    Artist_id INT NOT NULL REFERENCES Artist(Artist_id) ON DELETE CASCADE,
    Service_name VARCHAR(255) NOT NULL,
    Price DECIMAL(10, 2) NOT NULL,
    Duration INT NOT NULL, -- in minutes
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: Reviews
CREATE TABLE Reviews (
    review_id SERIAL PRIMARY KEY,
    appointment_id INT NOT NULL REFERENCES Appointments(appointment_id) ON DELETE CASCADE,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: Availabilities
CREATE TABLE Availabilities (
    availability_id SERIAL PRIMARY KEY,
    artist_id INT NOT NULL REFERENCES Artists(artist_id) ON DELETE CASCADE,
    day_of_week VARCHAR(10) CHECK (day_of_week IN ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')),
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: Messages
CREATE TABLE Messages (
    message_id SERIAL PRIMARY KEY,
    sender_id INT NOT NULL REFERENCES Users(user_id) ON DELETE CASCADE,
    receiver_id INT NOT NULL REFERENCES Users(user_id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
