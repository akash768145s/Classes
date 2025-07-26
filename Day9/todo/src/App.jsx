import './App.css';
import ToDoList from './ToDoList';
import DarkModeToggle from './DarkModeToggle';

function App() {
  return (
    <div className="app-container">
      <header className="header">
        <h1>To-Do List</h1>
        <DarkModeToggle />
      </header>
      <main>
        <ToDoList />
      </main>
    </div>
  );
}

export default App;
