import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const fetchTasks = async () => {
    try {
      const { data } = await API.get("/tasks");
      setTasks(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    await API.post("/tasks", { title });
    setTitle("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className='dashboard'>
      <nav>
        <h3>Welcome, {role.toUpperCase()}</h3>
        <button onClick={logout}>Logout</button>
      </nav>

      <div className='task-section'>
        <h3>Task Manager</h3>
        <form onSubmit={addTask}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Enter Task Name...'
            required
          />
          <button type='submit'>Add Task</button>
        </form>

        <div className='task-list'>
          {tasks.map((task) => (
            <div key={task._id} className='task-item'>
              <span>{task.title}</span>
              {role === "admin" && (
                <button
                  onClick={() => deleteTask(task._id)}
                  style={{ color: "red" }}
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
