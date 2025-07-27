// Import the Express.js framework
const express = require('express');

// Create an Express application instance
const app = express();

// Middleware to parse incoming JSON requests (needed for POST/PUT body parsing)
app.use(express.json());

// Dummy data: Array of student objects (acting like a temporary database)
const students = [
    { id: 1, name: 'Arun' },
    { id: 2, name: 'Divya' }
];

// ------------------------- GET all students -------------------------

// Route to get all students
// URL: GET http://localhost:3000/students
app.get('/students', (req, res) => {
    // Respond with the full array of students in JSON format
    res.json(students);
});

// ------------------------- GET a specific student by ID -------------------------

// Route to get a single student based on ID (passed as URL param)
// URL: GET http://localhost:3000/students/1
app.get('/students/:id', (req, res) => {
    // Find the student in the array with matching ID
    const student = students.find(s => s.id == req.params.id);

    // If student is not found, return 404 Not Found
    if (!student) return res.status(404).send('Student not found');

    // If found, return the student object as JSON
    res.json(student);
});

// ------------------------- POST a new student -------------------------

// Route to add a new student to the list
// URL: POST http://localhost:3000/students
// Body (JSON): { "name": "Karthik" }
app.post('/students', (req, res) => {
    // Create a new student object with a new ID and the name from request body
    const newStudent = {
        id: students.length + 1, // Auto-incrementing ID
        name: req.body.name      // Get name from request JSON body
    };

    // Push the new student into the array
    students.push(newStudent);

    // Respond with 201 Created and the new student object
    res.status(201).json(newStudent);
});

// ------------------------- PUT (update) a student -------------------------

// Route to update an existing student's name
// URL: PUT http://localhost:3000/students/2
// Body (JSON): { "name": "Divya R" }
app.put('/students/:id', (req, res) => {
    // Find the student by ID
    const student = students.find(s => s.id == req.params.id);

    // If student not found, return 404
    if (!student) return res.status(404).send('Student not found');

    // Update the student's name with value from request body
    student.name = req.body.name;

    // Respond with the updated student
    res.json(student);
});

// ------------------------- DELETE a student -------------------------

// Route to delete a student by ID
// URL: DELETE http://localhost:3000/students/1
app.delete('/students/:id', (req, res) => {
    // Find the index of the student in the array
    const index = students.findIndex(s => s.id == req.params.id);

    // If student not found, return 404
    if (index === -1) return res.status(404).send('Student not found');

    // Remove the student from the array using splice
    const deleted = students.splice(index, 1);

    // Respond with the deleted student object
    res.json(deleted[0]);
});

// ------------------------- Start the Server -------------------------

// Start the Express server on port 3000
// Visit http://localhost:3000 in Postman to test routes
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
