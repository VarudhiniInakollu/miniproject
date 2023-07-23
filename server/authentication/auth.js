const express = require('express');
const studentdb = require('../model/studentmodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.authenticateStudent = (req, res) => {
  const rollnumber = req.body.rollnumber;
  const password = req.body.password;

  // Find the student with the provided rollnumber in the database
  studentdb.findOne({ rollnumber: rollnumber })
    .then(student => {
      if (!student) {
        return res.status(404).json({ error: 'Student not found' });
      }

      // Compare the provided password with the stored hashed password
      bcrypt.compare(password, student.password, (err, result) => {
        if (err) {
          return res.status(500).json({ error: 'An error occurred while comparing passwords' });
        }

        if (!result) {
          return res.status(401).json({ error: 'Invalid password' });
        }

        // At this point, the authentication is successful.
        // You can generate a JWT token or perform any other action to indicate a successful login.
        // For simplicity, let's return a success message.
        return res.json({ message: 'Authentication successful' });
      });
    })
    .catch(error => {
      return res.status(500).json({ error: 'An error occurred while authenticating the student' });
    });
};
