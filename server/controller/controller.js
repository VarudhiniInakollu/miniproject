var studentdb=require('../model/studentmodel');
var jobdb=require('../model/jobmodel');


//create and save new student
exports.create=(req,res)=>{
    //validating the request
    if(!req.body){                                         //if body is empty then req.body returns false
        res.status(400).send({message:"Content can't be empty"})
        return;
    }

    //new student
    const student=new studentdb({
        rollnumber:req.body.rollnumber,
        username:req.body.username,
        password:req.body.password,
        branch:req.body.branch,
        stream:req.body.stream,
        cgpa:req.body.cgpa
    })

    //save the above student data in the database
    student
        .save(student)
        .then(data=>{
            res.send(data)
        })
        .catch(err=>{
            res.status(500).send({
                message:err.message || "Error Occured while create operation"
            });
        });
}


//create and save new job
exports.createj=(req,res)=>{
    //validating the request
    if(!req.body){
        //if body is empty then req.body returns false
        res.status(400).send({message:"Content can't be empty"})
        return;
    }
    //new student
    const job=new jobdb({
        jobid:req.body.jobid,
        jobrole:req.body.jobrole,
        company:req.body.company,
        description:req.body.description,
        salary:req.body.salary,
        enddate:req.body.enddate,
        appliedStudents:req.body.appliedStudents
    })
    job
        .save(job)
        .then(data=>{
            res.send(data)
        })
        .catch(err=>{
            res.status(500).send({
                message:err.message || "Error Occured while create operation"
            });
        });
}




//retrieve and return single/multiple students
exports.displayst=(req,res)=>{
    studentdb.find()
        .then(user=>{
            res.send(user)
        })
        .catch(err=>{
            res.status(500).send({message:err.message || "Error occured while find operation"})
        })
}

//retrieve multiple jobs
exports.displayj=(req,res)=>{
    jobdb.find()
        .then(user=>{
            res.send(user)
        })
        .catch(err=>{
            res.status(500).send({message:err.message || "Error occured while find operation"})
        })
}

//update a student using rollnumber
exports.updatest=(req, res) => {
    const rollnumber = req.params.rollnumber;
    
    // Retrieve updated student details from the request body
    const updatedDetails = req.body;
  
    // Update the student details in the database
    studentdb.findOneAndUpdate({ rollnumber: rollnumber }, updatedDetails, { new: true })
      .then(updatedStudent => {
        if (!updatedStudent) {
          return res.status(404).json({ error: 'Student not found' });
        }
        return res.json(updatedStudent);
      })
      .catch(error => {
        return res.status(500).json({ error: 'An error occurred while updating the student' });
      });
  };

//update a job using jobid
  exports.updatejob=(req, res) => {
    const jobid = req.params.jobid;
    
    // Retrieve updated student details from the request body
    const updatedDetails = req.body;
  
    // Update the student details in the database
    jobdb.findOneAndUpdate({ jobid: jobid }, updatedDetails, { new: true })
      .then(updatedStudent => {
        if (!updatedStudent) {
          return res.status(404).json({ error: 'Job not found' });
        }
        return res.json(updatedStudent);
      })
      .catch(error => {
        return res.status(500).json({ error: 'An error occurred while updating the student' });
      });
  };
//delete a student using roll number
exports.deletest=(req, res) => {
    const rollnumber = req.params.rollnumber;
  
    studentdb.findOneAndDelete({ rollnumber: rollnumber })
      .then(() => {
        res.send('Student deleted successfully');
      })
      .catch((error) => {
        res.status(500).send('Error deleting student');
      });
  };

//delete a job using jobid
exports.deletejob=(req, res) => {
    const jobid = req.params.jobid;
  
    jobdb.findOneAndDelete({ jobid: jobid })
      .then(() => {
        res.send('Student deleted successfully');
      })
      .catch((error) => {
        res.status(500).send('Error deleting student');
      });
  };
// Update a job's appliedStudents array with a student's details
exports.updatejobarray = (req, res) => {
  const jobid = req.params.jobid;
  const rollnumber = req.body.rollnumber; // Assuming you provide the rollnumber in the request body

  // Check if the student with the given rollnumber exists
  studentdb.findOne({ rollnumber: rollnumber })
    .then(student => {
      if (!student) {
        return res.status(404).json({ error: 'Student not found' });
      }

      // Update the job's appliedStudents array
      jobdb.findOneAndUpdate(
        { jobid: jobid },
        { $addToSet: { appliedStudents: rollnumber } },
        { new: true }
      )
      .then(updatedJob => {
        if (!updatedJob) {
          return res.status(404).json({ error: 'Job not found' });
        }
        return res.json(updatedJob);
      })
      .catch(error => {
        return res.status(500).json({ error: 'An error occurred while updating the job' });
      });
    })
    .catch(error => {
      return res.status(500).json({ error: 'An error occurred while searching for the student' });
    });
};

exports.updatestudentarray = (req, res) => {
  const rollnumber = req.params.rollnumber;
  const jobid = req.body.jobid; // Assuming you provide the jobid in the request body

  // Check if the job with the given jobid exists
  jobdb.findOne({ jobid: jobid })
    .then(job => {
      if (!job) {
        return res.status(404).json({ error: 'Job not found' });
      }

      // Update the student's appliedJobs array
      studentdb.findOneAndUpdate(
        { rollnumber: rollnumber },
        { $addToSet: { appliedJobs: jobid } },
        { new: true }
      )
      .then(updatedStudent => {
        if (!updatedStudent) {
          return res.status(404).json({ error: 'Student not found' });
        }
        return res.json(updatedStudent);
      })
      .catch(error => {
        return res.status(500).json({ error: 'An error occurred while updating the student' });
      });
    })
    .catch(error => {
      return res.status(500).json({ error: 'An error occurred while searching for the job' });
    });
};

//to display the applied students for a job from the appliedStudents array
exports.getAppliedStudentsForJob = (req, res) => {
  const jobid = req.params.jobid;
  //if job is present in job database or not
  jobdb.findOne({ jobid: jobid })
    .then(job => {
      if (!job) {
        return res.status(404).json({ error: 'Job not found' });
      }

      const appliedStudents = job.appliedStudents;
      return res.json(appliedStudents);
    })
    .catch(error => {
      return res.status(500).json({ error: 'An error occurred while fetching applied students for the job' });
    });
};



//display the jobs that a student applied from appliedJobs array 
exports.getJobsAppliedByStudent = (req, res) => {
  const rollnumber = req.params.rollnumber;
  //if student is present in student database or not
  studentdb.findOne({ rollnumber: rollnumber })
    .then(rollnumber => {
      if (!rollnumber) {
        return res.status(404).json({ error: 'Job not found' });
      }

      const appliedJobs = rollnumber.appliedJobs;
      return res.json(appliedJobs);
    })
    .catch(error => {
      return res.status(500).json({ error: 'An error occurred while fetching applied students for the job' });
    });
};


//Count of students applied for job i.e size of appliedStudents array
exports.getCountAppliedStudentsForJob = (req, res) => {
  const jobid = req.params.jobid;
  //if job is present in job database or not
  jobdb.findOne({ jobid: jobid })
    .then(job => {
      if (!job) {
        return res.status(404).json({ error: 'Job not found' });
      }

      const appliedStudentslength = job.appliedStudents.length;
      return res.json(appliedStudentslength);
    })
    .catch(error => {
      return res.status(500).json({ error: 'An error occurred while fetching applied students for the job' });
    });
};


//Count of jobs applied by students i.e size of appliedJobs array
exports.getCountAppliedJobsByStudent = (req, res) => {
  const rollnumber = req.params.rollnumber;
  //if student is present in student database or not
  studentdb.findOne({ rollnumber: rollnumber })
    .then(student => {
      if (!student) {
        return res.status(404).json({ error: 'Job not found' });
      }

      const appliedJobslength = student.appliedJobs.length;
      return res.json(appliedJobslength);
    })
    .catch(error => {
      return res.status(500).json({ error: 'An error occurred while fetching applied students for the job' });
    });
};