const mongoose = require('mongoose');

// Student Schema with more parameters
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: [2, 'Name must be at least 2 characters long']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    age: {
        type: Number,
        required: [true, 'Age is required'],
        min: [16, 'Age must be at least 16'],
        max: [100, 'Age cannot exceed 100']
    },
    grade: {
        type: String,
        required: [true, 'Grade is required'],
        enum: {
            values: ['A', 'B', 'C', 'D', 'F'],
            message: 'Grade must be A, B, C, D, or F'
        }
    },
    department: {
        type: String,
        required: [true, 'Department is required'],
        enum: {
            values: ['Computer Science', 'Engineering', 'Business', 'Arts', 'Science'],
            message: 'Please select a valid department'
        }
    },
    enrollmentDate: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual for student's full info
studentSchema.virtual('fullInfo').get(function () {
    return `${this.name} - ${this.department} (Grade: ${this.grade})`;
});

// Static method to find students by department
studentSchema.statics.findByDepartment = function (department) {
    return this.find({ department }).sort({ createdAt: -1 });
};

// Static method to find students by grade
studentSchema.statics.findByGrade = function (grade) {
    return this.find({ grade: grade.toUpperCase() }).sort({ createdAt: -1 });
};

// Instance method to get student status
studentSchema.methods.getStatus = function () {
    if (this.grade === 'A' || this.grade === 'B') {
        return 'Excellent';
    } else if (this.grade === 'C') {
        return 'Good';
    } else if (this.grade === 'D') {
        return 'Needs Improvement';
    } else {
        return 'Failing';
    }
};

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;