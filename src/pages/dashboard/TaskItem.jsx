import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const TaskItem = ({ task, onToggleComplete, onDelete, onEdit }) => {
  const isOverdue = new Date(task.dueDate) < new Date() && !task.completed;

  return (
    <div className="bg-white shadow-md border border-gray-200 rounded-xl p-4 mb-4">
      <div className="flex justify-between items-start gap-4">
        <div className="flex items-start gap-3 w-full">
          <Checkbox
            checked={task.completed}
            onCheckedChange={() => onToggleComplete(task._id, !task.completed)}
          />

          <div className="flex flex-col">
            <h3
              className={`text-base font-semibold ${
                task.completed ? "line-through text-gray-400" : "text-gray-800"
              }`}
            >
              {task.title}
            </h3>

            {task.description && (
              <p className="text-sm text-gray-500 mt-1">{task.description}</p>
            )}

            <div className="flex items-center gap-3 mt-2 flex-wrap">
              <span
                className={`px-2 py-1 text-xs rounded-full font-medium capitalize ${
                  task.priority === "low"
                    ? "bg-green-100 text-green-700"
                    : task.priority === "medium"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {task.priority}
              </span>

              {task.dueDate && (
                <span
                  className={`text-xs ${
                    isOverdue ? "text-red-600 font-medium" : "text-gray-500"
                  }`}
                >
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(task)}
            className="w-20"
          >
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(task._id)}
            className="w-20"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
