import bcrypt from 'bcryptjs';
import { db } from '../db.js';
import Client from '../models/Client.js'; 



          // signup client 
export const SignUpClient = async (req, res) => {
  try {
    // Check if the client already exists
    const existingClient = await Client.findOne({ email: req.body.Email });
    if (existingClient) {
      return res.status(409).json("Client already exists!");
    }

    // Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.Password, salt);

    // Create a new client instance
    const newClient = new Client({
      name: req.body.Name,
      email: req.body.Email,
      password: hash,
    });

    // Save the new client to the database
    const savedClient = await newClient.save();
    return res.status(201).json({ message: "Client created successfully!", clientId: savedClient._id });
  } catch (err) {
    return res.status(500).json(err);
  }
};

      // login user
export const Login = async (req, res) => {
  try {
    // Find the client by email
    const client = await Client.findOne({ email: req.body.email });
    if (!client) {
      return res.status(404).json("User not found!");
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = bcrypt.compareSync(req.body.password, client.password);
    if (!isPasswordValid) {
      return res.status(401).json("Invalid Password!");
    }

    return res.status(200).json({ message: 'Login successful', client });
  } catch (err) {
    return res.status(500).json(err);
  }
};
      