const express = require('express');
const Student = require('../models/Student');
const router = express.Router();

// GET all students (with optional filtering)
router.get('/', async (req, res) => {
    try {
        const { department, grade } = req.query;
        let query = {};

        if (department) {
            query.department = department;
        }
        if (grade) {
            query.grade = grade.toUpperCase();
        }

        const students = await Student.find(query).sort({ createdAt: -1 });
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch students' });
    }
});

// GET single student by ID
router.get('/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.json(student);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch student' });
    }
});

// POST new student
router.post('/', async (req, res) => {
    try {
        const { name, email, age, grade, department } = req.body;

        // Validate required fields
        if (!name || !email || !age || !grade || !department) {
            return res.status(400).json({
                error: 'All fields (name, email, age, grade, department) are required'
            });
        }

        const newStudent = new Student({
            name,
            email,
            age: parseInt(age),
            grade,
            department
        });

        const savedStudent = await newStudent.save();
        res.status(201).json(savedStudent);
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ error: 'Email already exists' });
        } else if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            res.status(400).json({ error: messages.join(', ') });
        } else {
            res.status(500).json({ error: 'Failed to create student' });
        }
    }
});

// PUT update student
router.put('/:id', async (req, res) => {
    try {
        const { name, email, age, grade, department } = req.body;

        const updateData = {};
        if (name) updateData.name = name;
        if (email) updateData.email = email;
        if (age) updateData.age = parseInt(age);
        if (grade) updateData.grade = grade;
        if (department) updateData.department = department;

        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedStudent) {
            return res.status(404).json({ error: 'Student not found' });
        }

        res.json(updatedStudent);
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ error: 'Email already exists' });
        } else if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            res.status(400).json({ error: messages.join(', ') });
        } else {
            res.status(500).json({ error: 'Failed to update student' });
        }
    }
});

// DELETE student
router.delete('/:id', async (req, res) => {
    try {
        const deletedStudent = await Student.findByIdAndDelete(req.params.id);
        if (!deletedStudent) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.json({ message: 'Student deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete student' });
    }
});

module.exports = router;