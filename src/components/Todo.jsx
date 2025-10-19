import React, { useState, useEffect } from "react";

const Todo = ({ addTodo, todos, editTask, deleteTodo }) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  // Edit modal state
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // Delete modal state
  const [isDeleting, setIsDeleting] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  // Reset the input when selectedTask changes (prefill)
  useEffect(() => {
    if (selectedTask) setValue(selectedTask.task);
  }, [selectedTask]);

  // ---------- Add todo ----------
  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmed = value.trim();
    if (!trimmed) {
      setError("Task cannot be empty !!");
      return;
    }

    // duplicate check
    if (todos.some((t) => t.task.toLowerCase() === trimmed.toLowerCase())) {
      setError("Task already exists !!");
      return;
    }

    addTodo(trimmed);
    setValue("");
    setError("");
  };

  // ---------- Open edit modal ----------
  const handleEdit = (todo) => {
    setSelectedTask(todo);
    setIsEditing(true);
    setError("");
  };

  // ---------- Submit edit ----------
  const handleEditSubmit = (e) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) {
      setError("Task cannot be empty !!");
      return;
    }

    if (
      todos.some(
        (t) =>
          t.task.toLowerCase() === trimmed.toLowerCase() &&
          t.id !== selectedTask.id
      )
    ) {
      setError("Task already exists !!");
      return;
    }

    // ✅ Call parent editTask
    editTask(trimmed, selectedTask.id);

    // Reset
    setIsEditing(false);
    setSelectedTask(null);
    setValue("");
    setError("");
  };

  // ---------- Open delete modal ----------
  const handleDeleteClick = (todo) => {
    setTaskToDelete(todo);
    setIsDeleting(true);
  };

  // ---------- Confirm delete ----------
  const confirmDelete = () => {
    if (!taskToDelete) return;
    deleteTodo(taskToDelete.id);
    setIsDeleting(false);
    setTaskToDelete(null);
  };

  return (
    <>
      <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 w-[400px] min-h-[400px] rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-start p-6 mx-auto my-8 md:my-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">
          BE PRODUCTIVE
        </h2>
        {/* Add Task Form */}
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center"
        >
          <div className="flex items-center w-full max-w-xs mb-2">
            <input
              type="text"
              placeholder="Add a task..."
              className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none text-gray-700"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <button
              type="submit"
              className="p-2 bg-stone-800 text-white rounded-r-lg hover:bg-stone-700 transition-colors"
            >
              ➕
            </button>
          </div>

          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <p className="text-gray-500 text-xs text-center">
            Enter your tasks and stay productive!
          </p>
        </form>

        {/* Todo List */}
        <ul className="mt-6 w-full max-w-md space-y-3 overflow-y-auto">
          {todos.length === 0 && (
            <p className="text-gray-400 text-sm text-center mt-4">
              No tasks yet. Add one!
            </p>
          )}

          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between bg-gray-100 rounded-lg px-4 py-2 shadow-sm hover:shadow-md transition-all"
            >
              <span
                className={`flex-1 truncate text-gray-800 ${
                  todo.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {todo.task}
              </span>

              <div className="flex items-center gap-2 ml-3">
                <button
                  onClick={() => handleEdit(todo)}
                  className="text-blue-600 hover:text-blue-800 transition"
                  title="Edit Task"
                >
                  ✏️
                </button>

                <button
                  onClick={() => handleDeleteClick(todo)}
                  className="text-red-600 hover:text-red-800 transition"
                  title="Delete Task"
                >
                  🗑️
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* ---------- Edit Modal (absolute on screen) ---------- */}
      {isEditing && selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[300px]">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Edit Task
            </h3>
            <form className="flex flex-col gap-3" onSubmit={handleEditSubmit}>
              <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 text-gray-700 focus:outline-none"
                autoFocus
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setSelectedTask(null);
                    setValue("");
                    setError("");
                  }}
                  className="px-3 py-1 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 bg-stone-800 text-white rounded hover:bg-stone-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------- Delete Confirmation Modal (absolute on screen) ---------- */}
      {isDeleting && taskToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[300px] text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Are you sure you want to delete this task?
            </h3>
            <p className="text-gray-600 mb-4">{taskToDelete.task}</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setIsDeleting(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Todo;
