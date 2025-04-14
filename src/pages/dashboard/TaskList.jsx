import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import TaskItem from "./TaskItem";
import EditTaskForm from "./EditTaskForm";

const TaskList = ({ refresh }) => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const { token } = useSelector((state) => state.auth);

  const API = import.meta.env.VITE_API_URL;

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(res.data);
    } catch (err) {
      console.error("Failed to fetch tasks", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [refresh]);

  const handleToggleComplete = async (id, completed) => {
    try {
      await axios.patch(
        `${API}/tasks/${id}`,
        { completed },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchTasks();
    } catch (err) {
      console.error("Failed to update task", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchTasks();
    } catch (err) {
      console.error("Failed to delete task", err);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleCloseEdit = () => {
    setEditingTask(null);
  };

  const handleUpdate = () => {
    fetchTasks();
    handleCloseEdit();
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <div className="mt-6">
      <div className="flex space-x-2 mb-4 justify-center">
        {["all", "completed", "pending"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-3 py-1 rounded-full text-sm capitalize ${
              filter === type ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {editingTask && (
        <EditTaskForm
          task={editingTask}
          onClose={handleCloseEdit}
          onUpdated={handleUpdate}
        />
      )}

      {loading ? (
        <div className="text-center text-sm text-blue-600 animate-pulse">
          Loading tasks...
        </div>
      ) : filteredTasks.length === 0 ? (
        <p className="text-sm text-gray-500 text-center">No tasks found.</p>
      ) : (
        filteredTasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            onToggleComplete={handleToggleComplete}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))
      )}
    </div>
  );
};

export default TaskList;
