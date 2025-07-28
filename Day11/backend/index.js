const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

let students = [
    { id: 1, name: 'Arun' },
    { id: 2, name: 'Divya' }
];

// GET all students
app.get('/students', (req, res) => {
    res.json(students);
});

// POST new student
app.post('/students', (req, res) => {
    const newStudent = {
        id: Date.now(),
        name: req.body.name
    };
    students.push(newStudent);
    res.status(201).json(newStudent);
});

// PUT update student
app.put('/students/:id', (req, res) => {
    const student = students.find(s => s.id == req.params.id);
    if (!student) return res.status(404).send('Not found');
    student.name = req.body.name;
    res.json(student);
});

// DELETE student
app.delete('/students/:id', (req, res) => {
    students = students.filter(s => s.id != req.params.id);
    res.sendStatus(204);
});

// Start server
app.listen(3000, () => console.log('🚀 Backend running on http://localhost:3000'));
