import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function TaskForm() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
  
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const token = localStorage.getItem("authToken");

            const response = await fetch("/api/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name,
                    description,
                    deadline,
                }),
            });

        if (response.ok) {
          setName("");
          setDescription("");
          setDeadline(""); // Сбрасываем форму
          navigate("/tasks"); // Перенаправляем на страницу списка задач
        } else {
            setError("Failed to create task. Please try again.");
        }
      } catch (err) {
            setError("An error occurred. Please try again later.");
            console.error(err);
      }
    };

    return (
      <form onSubmit={handleSubmit}>
        <h2>Create New Task</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <label>
          Task Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <br />
        <label>
          Deadline:
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Create Task</button>
      </form>
    );
}

export default TaskForm;
