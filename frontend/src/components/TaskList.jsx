export default function TaskList({ tasks, onToggle, onDelete }) {
  if (tasks.length === 0) {
    return <p className="empty">Aucune tâche pour le moment.</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id} className={task.done ? 'done' : ''}>
          <input
            type="checkbox"
            checked={task.done}
            onChange={() => onToggle(task)}
          />
          <span>{task.title}</span>
          <button onClick={() => onDelete(task.id)}>Supprimer</button>
        </li>
      ))}
    </ul>
  );
}
