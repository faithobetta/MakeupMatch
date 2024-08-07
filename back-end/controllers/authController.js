import bcrypt from 'bcryptjs';
import { db } from '../db.js';



          // signup client 
export const SignUpClient = (req, res) => {
  const q = "SELECT * FROM client WHERE email = ?";
  db.query(q, [req.body.Email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("client already exists!");

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.Password, salt);
    const newUser = {
      Name: req.body.Name,
      Email: req.body.Email,
      Password: hash,
    };

    const insertQuery = "INSERT INTO client SET ?";
    db.query(insertQuery, newUser, (err, result) => {
      if (err) return res.status(500).json(err);
      const clientId = result.insertId;
      return res.status(201).json({ message: "Client created successfully!", clientId });
    });
  });
};

      // login user
export const Login = (req, res) => {
  const q = "SELECT * FROM client WHERE email = ?";
  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    const client = data[0];
    const isPasswordValid = bcrypt.compareSync(req.body.password, user.Password);

    if (!isPasswordValid) return res.status(401).json("Invalid Password!");

    return res.status(200).json({ message: 'Login successful', client });
  });
};

