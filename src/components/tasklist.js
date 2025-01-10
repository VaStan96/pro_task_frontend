import React, { useEffect, useState } from "react";

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [taskId, setTaskId] = useState("");

    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("authToken");

        const response = await fetch("/api/tasks", {
          headers: {
            Authorization: `Bearer ${token}`, // Отправляем токен в заголовке
          },
        });

        if (response.ok) {
          const data = await response.json();
          setTasks(data);
          setError(null);
        } else {
          setError("Failed to fetch tasks. Please try again.");
          setTasks([]);
        }
      } catch (err) {
        setError("An error occurred while fetching tasks.");
        setTasks([]);
        console.error(err);
      }
    };

    useEffect(() => {
      fetchTasks();
    }, []);

    const fetchTaskById = async () => {
      try {
        const token = localStorage.getItem("authToken");

        if (!taskId.trim()) {
          await fetchTasks();
          return;
        }

        if (!/^\d+$/.test(taskId)) {
          setError("Please enter a valid numeric task ID.");
          return;
        }

        const response = await fetch(
          `/api/tasks/${taskId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Отправляем токен в заголовке
            },
          }
        ); 

        if (response.ok) {
          const data = await response.json();
          setTasks([data]);
          setError(null);
        } else {
          setError("Failed to fetch tasks. Please try again.");
          setTasks([]);
        }
      }
      catch (err) {
          setError("An error occurred while fetching the task.");
          setTasks([]);
          console.error(err);
        }
    };

    const changeStatus = async (id) => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch(
          `/api/tasks/${id}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`, // Отправляем токен в заголовке
            },
          }
        );

        if (response.ok) {
          setError(null); // delete error
          fetchTasks();
        } else {
          setError(`Failed to change status task with ID ${id}.`);
        }
      } catch (err) {
        setError(`An error occurred while change status task with ID ${id}.`);
        console.error(err);
      }
    };

    const delTask = async (id) => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch(
          `/api/tasks/${id}`, 
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`, // Отправляем токен в заголовке
          },
        });

        if (response.ok) {
          setMessage(`Task with ID ${id} was successfully deleted.`);
          setError(null); // delete error
          fetchTasks();
        } else {
          setError(`Failed to delete task with ID ${id}.`);
          setMessage(null); // delete message
        }
      } catch (err) {
        setError(`An error occurred while deleting task with ID ${id}.`);
        setMessage(null);
        console.error(err);
      }
    };

    return (
      <div>
        <h2>Task List</h2>
        {/* Search field */}
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="taskId">Enter Task ID: </label>
          <input
            type="text"
            id="taskId"
            value={taskId}
            onChange={(e) => setTaskId(e.target.value)}
            style={{ marginRight: "10px" }}
          />
          <button onClick={fetchTaskById}>Search</button>
        </div>

        {/* Error message */}
        {error && (
          <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
        )}

        {/* Delete message */}
        {message && (
          <div style={{ color: "green", marginBottom: "10px" }}>{message}</div>
        )}

        {/* Output table */}
        <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th>TaskId</th>
              <th>Name</th>
              <th>Description</th>
              <th>Created_at</th>
              <th>Deadline</th>
              <th>Status</th>
              <th>Change status</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.name}</td>
                <td>{task.description}</td>
                <td>{task.createdAt}</td>
                <td>{task.deadline}</td>
                <td>{task.status}</td>
                <td>
                  <button onClick={() => changeStatus(task.id)}>Change Status</button>
                </td>
                <td>
                  <button onClick={() => delTask(task.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}

export default TaskList;
