import { useState } from "react";
import Navbar from "@/components/Navbar";
import AddTaskForm from "./AddTaskForm";
import TaskList from "./TaskList";

const Dashboard = () => {
  const [refreshFlag, setRefreshFlag] = useState(false);

  const triggerRefresh = () => {
    setRefreshFlag(!refreshFlag);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        <h2 className="text-xl font-semibold text-gray-800">Your Tasks</h2>

        <AddTaskForm onTaskAdded={triggerRefresh} />

        <TaskList refresh={refreshFlag} />
      </main>
    </div>
  );
};

export default Dashboard;
