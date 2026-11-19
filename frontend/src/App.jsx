import { useEffect, useState } from 'react';
import { getTasks, addTask, updateTask, deleteTask } from './api';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

export default function App() {
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => setTasks(await getTasks());

  useEffect(() => {
    loadTasks();
  }, []);

  const handleAdd = async (title) => {
    await addTask(title);
    loadTasks();
  };

  const handleToggle = async (task) => {
    await updateTask(task.id, !task.done);
    loadTasks();
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    loadTasks();
  };

  return (
    <div className="container">
      <h1>Ma liste de tâches</h1>
      <TaskForm onAdd={handleAdd} />
      <TaskList tasks={tasks} onToggle={handleToggle} onDelete={handleDelete} />
    </div>
  );
}
