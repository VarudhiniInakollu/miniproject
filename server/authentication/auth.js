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

      // Compare the provided password with the stored password in the database
      if (student.password != password) {
        return res.status(401).json({ error: 'Invalid password' });
      }

      // Password is valid, so return all the student details
      return res.json({message: "Login Successful",student:student});
    })
    .catch(error => {
      return res.status(500).json({ error: 'An error occurred while authenticating the student' });
    });
};
