import React, { useEffect, useState } from "react";

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchTasks = async () => {
        try {
          const token = localStorage.getItem("authToken");

          const response = await fetch("http://localhost:8080/api/tasks", {
            headers: {
              Authorization: `Bearer ${token}`, // Отправляем токен в заголовке
            },
          });

          if (response.ok) {
            const data = await response.json();
            setTasks(data);
          } else {
            setError("Failed to fetch tasks. Please try again.");
          }
        } catch (err) {
          setError("An error occurred while fetching tasks.");
          console.error(err);
        }
      };

      fetchTasks();
    }, []);

    if (error) {
      return <div>{error}</div>;
    }

    return (
      <div>
        <h2>Task List</h2>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>{task.name}</li>
          ))}
        </ul>
      </div>
    );
}

export default TaskList;
