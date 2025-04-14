import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const API = import.meta.env.VITE_API_URL;

const AddTaskForm = ({ onTaskAdded }) => {
  const { token } = useSelector((state) => state.auth);
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.dueDate) {
      toast.error("Title and Due Date are required.");
      return;
    }

    try {
      await axios.post(`${API}/tasks`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Task added!");
      setForm({ title: "", description: "", priority: "medium", dueDate: "" });
      onTaskAdded(); // refresh task list
    } catch (err) {
      console.error("Error adding task", err);
      toast.error("Failed to add task.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-4 rounded-md shadow-sm"
    >
      <Input
        name="title"
        placeholder="Task title"
        value={form.title}
        onChange={handleChange}
        required
      />
      <Textarea
        name="description"
        placeholder="Description (optional)"
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
      <Button type="submit" className="w-full">
        Add Task
      </Button>
    </form>
  );
};

export default AddTaskForm;
