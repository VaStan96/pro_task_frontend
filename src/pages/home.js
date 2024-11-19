import React, {useState} from "react";
import Login from "../components/login";
import TaskList from "../components/tasklist";

const HomePage = ({ onLogin }) => {

    const [tasks] = useState([
      {
        id: 1,
        title: "Task 1",
        description: "This is the first task",
        status: "Incomplete",
      },
      {
        id: 2,
        title: "Task 2",
        description: "This is the second task",
        status: "Complete",
      },
      {
        id: 3,
        title: "Task 3",
        description: "This is the third task",
        status: "Incomplete",
      },
    ]);

  return (
    <div className="login-page">
      <h2>Home Page</h2>
      <Login onLogin={onLogin} />
      <TaskList tasks={tasks} />
    </div>
  );
};

export default HomePage;
