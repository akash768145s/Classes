# Student Management Backend API

A modular Node.js/Express.js backend with MongoDB integration for managing student records.

## 🏗️ Project Structure

```
backend/
├── config/
│   └── database.js          # MongoDB connection configuration
├── models/
│   └── Student.js           # Student mongoose schema and model
├── routes/
│   └── students.js          # Student API routes
├── index.js                 # Main server file
├── package.json
└── README.md
```

## 🚀 Setup Instructions

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Configure MongoDB Atlas**

   - Open `config/database.js`
   - Replace `'YOUR_MONGODB_ATLAS_URL'` with your actual MongoDB Atlas connection string
   - Example: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/studentdb?retryWrites=true&w=majority`

3. **Start the Server**
   ```bash
   npm start
   ```

## 📚 API Endpoints

### Health Check

- `GET /health` - Check API status

### Students

- `GET /students` - Get all students
- `GET /students/:id` - Get single student by ID
- `POST /students` - Create new student
- `PUT /students/:id` - Update student
- `DELETE /students/:id` - Delete student
- `GET /students/department/:department` - Filter students by department
- `GET /students/grade/:grade` - Filter students by grade

## 📊 Student Model

```javascript
{
  name: String (required, min 2 chars),
  email: String (required, unique, valid email),
  age: Number (required, 16-100),
  grade: String (required, A/B/C/D/F),
  department: String (required, Computer Science/Engineering/Business/Arts/Science),
  enrollmentDate: Date (auto-generated),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

## 🔧 Features

### Enhanced Validation

- Email format validation
- Age range validation (16-100)
- Name minimum length (2 characters)
- Grade and department enum validation

### Mongoose Features

- **Virtuals**: `fullInfo` - Returns formatted student info
- **Static Methods**:
  - `findByDepartment(department)` - Find students by department
  - `findByGrade(grade)` - Find students by grade
- **Instance Methods**:
  - `getStatus()` - Returns performance status based on grade

### Error Handling

- Comprehensive error messages
- Validation error handling
- Duplicate email detection
- Global error handler

## 🛠️ Development

### Adding New Models

1. Create a new file in `models/` directory
2. Define the schema with validation
3. Export the model

### Adding New Routes

1. Create a new file in `routes/` directory
2. Define the router with endpoints
3. Import and use in `index.js`

### Environment Variables

For production, consider using environment variables:

```javascript
// In config/database.js
mongoose.connect(process.env.MONGODB_URI || 'YOUR_MONGODB_ATLAS_URL', {
```

## 📝 Example API Usage

### Create a Student

```bash
curl -X POST http://localhost:3000/students \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "age": 20,
    "grade": "A",
    "department": "Computer Science"
  }'
```

### Get All Students

```bash
curl http://localhost:3000/students
```

### Filter by Department
2
```bash
curl http://localhost:3000/students/department/Computer%20Science
```

## 🔒 Security Notes

- Replace the MongoDB Atlas URL with your actual connection string
- Consider adding authentication middleware for production
- Implement rate limiting for API endpoints
- Use environment variables for sensitive configuration
