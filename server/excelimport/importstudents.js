const mongoose = require('mongoose');
const xlsx = require('xlsx');
var studentdb=require('../model/studentmodel'); // Replace './models/student' with the path to your student model file

// Read data from Excel sheet and import into MongoDB
function importData() {
    try {
      const workbook = xlsx.readFile('C:\\Users\\visru\\Desktop\\studentdetails.xlsx');
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = xlsx.utils.sheet_to_json(worksheet);
  
      // Loop through each row in the Excel sheet
      data.forEach(studentData => {
        const { rollnumber, username, password, branch, stream, cgpa, appliedJobs } = studentData;
  
        // Check if the student with the given roll number already exists in the database
        studentdb.findOne({ rollnumber: rollnumber })
          .then(existingStudent => {
            if (existingStudent) {
              console.log(`Student with roll number ${rollnumber} is already present in the database.`);
            } else {
              // Create a new student document and save it to the database
              const student = new studentdb({
                rollnumber: rollnumber,
                username: username,
                password: password,
                branch: branch,
                stream: stream,
                cgpa: cgpa,
                appliedJobs: appliedJobs || []
              });
  
              student.save()
                .then(savedStudent => {
                  console.log(`Student with roll number ${rollnumber} saved to the database.`);
                })
                .catch(error => {
                  console.error(`Error saving student with roll number ${rollnumber}:`, error);
                });
            }
          })
          .catch(error => {
            console.error(`Error searching for student with roll number ${rollnumber}:`, error);
          });
      });
  
      console.log('Data import completed.');
    } catch (error) {
      console.error('Error reading or importing data:', error);
    }
  }
  
  // Call the importData function to start the import process
module.exports = importData;