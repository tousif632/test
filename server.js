const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5500;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Atlas connection URI
const mongoURI = 
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB Atlas Connected'))
  .catch((err) => console.log('Error connecting to MongoDB Atlas:', err));

// Student Schema
const studentSchema = new mongoose.Schema({
  name: String,
  rfid: String,
  regNo: String,
  feeStatus: String,
  destination: String
});

// Student Model
const Student = mongoose.model('Student', studentSchema);

// Faculty Schema
const facultySchema = new mongoose.Schema({
  name: String,
  rfid: String,
  regNo: String,
  feeStatus: String,
  destination: String
});

// Faculty Model
const Faculty = mongoose.model('Faculty', facultySchema);

// Bus Schema (for general bus information)
const busSchema = new mongoose.Schema({
  busNumber: String,
  busName: String,
  phoneNumber: String
});

// Bus Model
const Bus = mongoose.model('Bus', busSchema);

// Bus Route Management Schema (for routes with details like stops)
const busRouteManagementSchema = new mongoose.Schema({
  routeName: String, // Name of the route (e.g., "Route 1")
  routeStops: [String], // Array of stops (e.g., ["Stop 1", "Stop 2", "Stop 3"])
  startTime: String, // Departure time
  endTime: String, // Arrival time
  busAssigned: String, // Bus assigned for the route (bus number or name)
});

// Bus Route Management Model
const BusRouteManagement = mongoose.model('BusRouteManagement', busRouteManagementSchema);

// Route to get all students
app.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).send('Error fetching students');
  }
});

// Route to add a new student
app.post('/students', async (req, res) => {
  const { name, rfid, regNo, feeStatus, destination } = req.body;

  try {
    const newStudent = new Student({ name, rfid, regNo, feeStatus, destination });
    await newStudent.save();
    res.json(newStudent);
  } catch (err) {
    res.status(500).send('Error saving student');
  }
});

// Route to get all buses (Bus Information)
app.get('/buses', async (req, res) => {
  try {
    const buses = await Bus.find();
    res.json(buses);
  } catch (err) {
    res.status(500).send('Error fetching buses');
  }
});

// Route to add a new bus (Bus Information)
app.post('/buses', async (req, res) => {
  const { busNumber, busName, phoneNumber } = req.body;

  try {
    const newBus = new Bus({ busNumber, busName, phoneNumber });
    await newBus.save();
    res.json(newBus);
  } catch (err) {
    res.status(500).send('Error saving bus');
  }
});

// Route to get all bus routes for management
app.get('/busRouteManagement', async (req, res) => {
  try {
    const routes = await BusRouteManagement.find();
    res.json(routes);
  } catch (err) {
    res.status(500).send('Error fetching bus routes');
  }
});

// Route to add a new bus route for management
app.post('/busRouteManagement', async (req, res) => {
  const { routeName, routeStops, startTime, endTime, busAssigned } = req.body;

  try {
    const newRoute = new BusRouteManagement({ routeName, routeStops, startTime, endTime, busAssigned });
    await newRoute.save();
    res.json(newRoute);
  } catch (err) {
    res.status(500).send('Error saving bus route');
  }
});

// Route to get all faculty members
app.get('/faculty', async (req, res) => {
  try {
    const faculty = await Faculty.find();
    res.json(faculty);
  } catch (err) {
    res.status(500).send('Error fetching faculty');
  }
});

// Route to add a new faculty member
app.post('/faculty', async (req, res) => {
  const { name, rfid, regNo, feeStatus, destination } = req.body;

  try {
    const newFaculty = new Faculty({ name, rfid, regNo, feeStatus, destination });
    await newFaculty.save();
    res.json(newFaculty);
  } catch (err) {
    res.status(500).send('Error saving faculty');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
