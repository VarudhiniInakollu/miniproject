const express=require('express')
const route=express.Router()
const controller=require('../controller/controller')
const authentication=require('../authentication/auth')


//API
route.post('/api/students',controller.create)
route.post('/api/jobs',controller.createj)
route.get('/api/displaystudents/students',controller.displayst)
route.get('/api/displayjobs/jobs',controller.displayj)
route.put('/api/studentupdate/:rollnumber',controller.updatest)
route.put('/api/jobupdate/:jobid',controller.updatejob)
route.delete('/api/studentdelete/:rollnumber',controller.deletest)
route.delete('/api/jobdelete/:jobid',controller.deletejob)
route.post('/api/jobs/:jobid',controller.updatejobarray)
route.post('/api/students/:rollnumber',controller.updatestudentarray)
route.post('/api/login',authentication.loginf)

module.exports=route