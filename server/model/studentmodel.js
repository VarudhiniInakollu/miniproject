const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  rollnumber: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  branch: {
    type: String,
    required: true
  },
  stream: {
    type: String,
    required: true
  },
  cgpa: {
    type: Number,
    required: true
  },
  appliedJobs:[String]
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
