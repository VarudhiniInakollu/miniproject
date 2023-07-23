const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  jobid: {
    type: String,
    required: true,
    unique: true
  },
  jobrole: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  salary: {
    type: String,
    required: true
  },
  enddate:{
    type:String,
    required:true
  },
  appliedStudents: [String],
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
