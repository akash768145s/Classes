import { useEffect, useState } from 'react';

const API = 'http://localhost:3000/students';

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [editId, setEditId] = useState(null);

  // Load students
  useEffect(() => {
    fetch(API).then(res => res.json()).then(setStudents);
  }, []);

  // Add or update student
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await fetch(`${API}/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      setEditId(null);
    } else {
      await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
    }
    setName('');
    const updated = await fetch(API).then(res => res.json());
    setStudents(updated);
  };

  // Delete student
  const handleDelete = async (id) => {
    await fetch(`${API}/${id}`, { method: 'DELETE' });
    setStudents(students.filter(s => s.id !== id));
  };

  // Edit student
  const handleEdit = (student) => {
    setName(student.name);
    setEditId(student.id);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Student Manager</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Enter student name"
          required
        />
        <button type="submit">{editId ? 'Update' : 'Add'}</button>
      </form>

      <ul>
        {students.map(s => (
          <li key={s.id}>
            {s.name}
            <button onClick={() => handleEdit(s)}>Edit</button>
            <button onClick={() => handleDelete(s.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
