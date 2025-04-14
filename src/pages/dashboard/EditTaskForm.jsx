import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const API = import.meta.env.VITE_API_URL;

const EditTaskForm = ({ task, onClose, onUpdated }) => {
  const { token } = useSelector((state) => state.auth);
  const [form, setForm] = useState({
    title: task.title,
    description: task.description || "",
    priority: task.priority,
    dueDate: task.dueDate?.split("T")[0] || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`${API}/tasks/${task._id}`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Task updated");
      onUpdated(); // refresh list + close form
    } catch (err) {
      toast.error("Failed to update task");
      console.error(err);
    }
  };

  return (
    <div className="p-4 border rounded-md bg-white mb-4">
      <h2 className="font-semibold text-gray-700 mb-2">Edit Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <Textarea
          name="description"
          value={form.description}
          onChange={handleChange}
        />
        <div className="flex space-x-2">
          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="border px-2 py-2 rounded-md w-1/2"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <Input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
            className="w-1/2"
          />
        </div>
        <div className="flex justify-between">
          <Button type="submit">Update</Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditTaskForm;
