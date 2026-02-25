import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    try {
      const { data } = await API.get("/tasks");
      setTasks(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchTasks();
    }
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    await API.post("/tasks", { title, description, status });
    setTitle("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const logout = async () => {
    try {
      await API.post("/auth/logout");
    } catch (err) {
      console.error(err);
    }
    localStorage.removeItem("user");
    navigate("/login");
  };
  if (!user) return null;

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
              <div>
                <h4>{task.title}</h4>
                <p>{task.description}</p>
                <small>Status: {task.status}</small>
              </div>
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
