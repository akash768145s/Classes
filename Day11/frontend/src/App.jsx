import { useEffect, useState } from 'react';
import './App.css';

// Backend API URL (Express.js running locally)
const API = 'http://localhost:3000/students';

function App() {
  // State to hold the list of students
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    grade: 'A',
    department: 'Computer Science'
  });

  // State to track which student is being edited (null if adding new)
  const [editId, setEditId] = useState(null);

  // Filter states
  const [filterDepartment, setFilterDepartment] = useState('');
  const [filterGrade, setFilterGrade] = useState('');

  // Available options
  const grades = ['A', 'B', 'C', 'D', 'F'];
  const departments = ['Computer Science', 'Engineering', 'Business', 'Arts', 'Science'];

  // Fetch all students from the backend when the component loads
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      // Build query parameters for filtering
      const params = new URLSearchParams();
      if (filterDepartment) params.append('department', filterDepartment);
      if (filterGrade) params.append('grade', filterGrade);

      const url = params.toString() ? `${API}?${params.toString()}` : API;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch students');
      const data = await response.json();
      setStudents(data);
      setError('');
    } catch (err) {
      setError('Failed to load students: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch students when filters change
  useEffect(() => {
    fetchStudents();
  }, [filterDepartment, filterGrade]);

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      age: '',
      grade: 'A',
      department: 'Computer Science'
    });
    setEditId(null);
  };

  // Add a new student OR update existing student
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = editId ? `${API}/${editId}` : API;
      const method = editId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save student');
      }

      resetForm();
      await fetchStudents();
    } catch (err) {
      setError(err.message);
    }
  };

  // Delete a student by ID
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;

    try {
      const response = await fetch(`${API}/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete student');

      await fetchStudents();
    } catch (err) {
      setError(err.message);
    }
  };

  // Prepare to edit a student
  const handleEdit = (student) => {
    setFormData({
      name: student.name,
      email: student.email,
      age: student.age.toString(),
      grade: student.grade,
      department: student.department
    });
    setEditId(student._id);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return <div className="loading">Loading students...</div>;
  }

  return (
    <div className="app">
      <header className="header">
        <h1>🎓 Student Management System</h1>
        <p>Manage student records with MongoDB backend</p>
      </header>

      {error && (
        <div className="error-message">
          {error}
          <button onClick={() => setError('')}>✕</button>
        </div>
      )}

      <main className="main-content">
        {/* Student Form */}
        <section className="form-section">
          <h2>{editId ? 'Edit Student' : 'Add New Student'}</h2>
          <form onSubmit={handleSubmit} className="student-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter student name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email address"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="age">Age *</label>
                <input
                  id="age"
                  name="age"
                  type="number"
                  min="16"
                  max="100"
                  value={formData.age}
                  onChange={handleInputChange}
                  placeholder="Enter age"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="grade">Grade *</label>
                <select
                  id="grade"
                  name="grade"
                  value={formData.grade}
                  onChange={handleInputChange}
                  required
                >
                  {grades.map(grade => (
                    <option key={grade} value={grade}>{grade}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="department">Department *</label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  required
                >
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary">
                {editId ? 'Update Student' : 'Add Student'}
              </button>
              {editId && (
                <button type="button" onClick={resetForm} className="btn-secondary">
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </section>

        {/* Filters */}
        <section className="filters-section">
          <h3>Filter Students</h3>
          <div className="filters">
            <div className="filter-group">
              <label htmlFor="filterDepartment">Department:</label>
              <select
                id="filterDepartment"
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
              >
                <option value="">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <label htmlFor="filterGrade">Grade:</label>
              <select
                id="filterGrade"
                value={filterGrade}
                onChange={(e) => setFilterGrade(e.target.value)}
              >
                <option value="">All Grades</option>
                {grades.map(grade => (
                  <option key={grade} value={grade}>{grade}</option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* Student List */}
        <section className="students-section">
          <h3>Students ({students.length})</h3>
          {students.length === 0 ? (
            <p className="no-students">No students found.</p>
          ) : (
            <div className="students-grid">
              {students.map(student => (
                <div key={student._id} className="student-card">
                  <div className="student-header">
                    <h4>{student.name}</h4>
                    <span className={`grade grade-${student.grade}`}>{student.grade}</span>
                  </div>
                  <div className="student-details">
                    <p><strong>Email:</strong> {student.email}</p>
                    <p><strong>Age:</strong> {student.age}</p>
                    <p><strong>Department:</strong> {student.department}</p>
                    <p><strong>Enrolled:</strong> {formatDate(student.enrollmentDate)}</p>
                  </div>
                  <div className="student-actions">
                    <button
                      onClick={() => handleEdit(student)}
                      className="btn-edit"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(student._id)}
                      className="btn-delete"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
