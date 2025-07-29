import { useEffect, useState } from 'react';

// Backend API URL (Express.js running locally)
const API = 'http://localhost:3000/students';

function App() {
  // State to hold the list of students
  const [students, setStudents] = useState([]);

  // State to store the current input from the text box
  const [name, setName] = useState('');

  // State to track which student is being edited (null if adding new)
  const [editId, setEditId] = useState(null);

  // Fetch all students from the backend when the component loads
  useEffect(() => {
    fetch(API)
      .then(res => res.json())
      .then(setStudents); // Set the student list into state
  }, []);

  // Add a new student OR update existing student
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form refresh

    // If in edit mode, update student
    if (editId) {
      await fetch(`${API}/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }), // Send updated name
      });
      setEditId(null); // Clear edit mode
    } else {
      // If not editing, create a new student
      await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }), // Send new student name
      });
    }

    setName(''); // Clear input field

    // Refresh student list from backend after add/edit
    const updated = await fetch(API).then(res => res.json());
    setStudents(updated);
  };

  // Delete a student by ID
  const handleDelete = async (id) => {
    await fetch(`${API}/${id}`, { method: 'DELETE' });

    // Remove the deleted student from local state
    setStudents(students.filter(s => s.id !== id));
  };

  // Prepare to edit a student's name
  const handleEdit = (student) => {
    setName(student.name);   // Pre-fill input with current name
    setEditId(student.id);   // Store the ID being edited
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Student Manager</h1>

      {/* Form to add or update a student */}
      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Enter student name"
          required
        />
        <button type="submit">{editId ? 'Update' : 'Add'}</button>
      </form>

      {/* Student List */}
      <ul>
        {students.map(s => (
          <li key={s.id}>
            {s.name}
            {/* Edit and Delete Buttons for each student */}
            <button onClick={() => handleEdit(s)}>Edit</button>
            <button onClick={() => handleDelete(s.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
