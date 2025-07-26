import { useState, useEffect } from 'react';

const FILTERS = ['All', 'Active', 'Completed'];

function getInitialTasks() {
    try {
        return JSON.parse(localStorage.getItem('tasks')) || [];
    } catch {
        return [];
    }
}

export default function ToDoList() {
    const [tasks, setTasks] = useState(getInitialTasks);
    const [input, setInput] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editValue, setEditValue] = useState('');
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const filteredTasks = tasks.filter(t =>
        filter === 'All' ? true : filter === 'Active' ? !t.completed : t.completed
    );

    function addTask(e) {
        e.preventDefault();
        if (!input.trim()) return;
        setTasks([
            ...tasks,
            { id: Date.now(), text: input.trim(), completed: false }
        ]);
        setInput('');
    }

    function startEdit(id, text) {
        setEditingId(id);
        setEditValue(text);
    }

    function saveEdit(id) {
        setTasks(tasks.map(t => t.id === id ? { ...t, text: editValue } : t));
        setEditingId(null);
        setEditValue('');
    }

    function cancelEdit() {
        setEditingId(null);
        setEditValue('');
    }

    function toggleComplete(id) {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    }

    function deleteTask(id) {
        setTasks(tasks.filter(t => t.id !== id));
    }

    return (
        <div className="todo-list">
            <form className="todo-form" onSubmit={addTask}>
                <input
                    className="todo-input"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Add a new task..."
                    aria-label="Add a new task"
                />
                <button className="todo-add-btn" type="submit">Add</button>
            </form>
            <div className="todo-filters">
                {FILTERS.map(f => (
                    <button
                        key={f}
                        className={filter === f ? 'active' : ''}
                        onClick={() => setFilter(f)}
                    >
                        {f}
                    </button>
                ))}
            </div>
            <ul className="todo-items">
                {filteredTasks.length === 0 && <li className="empty">No tasks</li>}
                {filteredTasks.map(task => (
                    <li key={task.id} className={task.completed ? 'completed' : ''}>
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleComplete(task.id)}
                            aria-label="Mark completed"
                        />
                        {editingId === task.id ? (
                            <>
                                <input
                                    className="todo-edit-input"
                                    value={editValue}
                                    onChange={e => setEditValue(e.target.value)}
                                    onKeyDown={e => {
                                        if (e.key === 'Enter') saveEdit(task.id);
                                        if (e.key === 'Escape') cancelEdit();
                                    }}
                                    autoFocus
                                />
                                <button className="todo-save-btn" onClick={() => saveEdit(task.id)}>Save</button>
                                <button className="todo-cancel-btn" onClick={cancelEdit}>Cancel</button>
                            </>
                        ) : (
                            <>
                                <span
                                    className="todo-text"
                                    onDoubleClick={() => startEdit(task.id, task.text)}
                                    tabIndex={0}
                                    onKeyDown={e => {
                                        if (e.key === 'Enter') startEdit(task.id, task.text);
                                    }}
                                >
                                    {task.text}
                                </span>
                                <button className="todo-edit-btn" onClick={() => startEdit(task.id, task.text)} aria-label="Edit">✏️</button>
                                <button className="todo-delete-btn" onClick={() => deleteTask(task.id)} aria-label="Delete">🗑️</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
} 