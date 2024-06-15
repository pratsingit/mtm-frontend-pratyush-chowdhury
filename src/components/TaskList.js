import React, { useState } from 'react';

const TaskList = ({ tasks, deleteTask, updateTask }) => {
  const [editIndex, setEditIndex] = useState(-1); 
  const [editedTask, setEditedTask] = useState({ name: '', description: '' }); 

  const handleEditClick = (index) => {
    setEditIndex(index); 
    setEditedTask(tasks[index]); 
  };

  const handleCancelEdit = () => {
    setEditIndex(-1); 
  };

  const handleSaveEdit = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = editedTask; 
    updateTask(updatedTasks); 
    setEditIndex(-1); 
  };

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    setEditedTask((prevTask) => ({
      ...prevTask,
      [field]: value,
    }));
  };

  return (
    <ul className="list-group">
      {tasks.map((task, index) => (
        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
          {editIndex === index ? ( 
            <div>
              <input
                type="text"
                className="form-control mb-2"
                value={editedTask.name}
                onChange={(e) => handleInputChange(e, 'name')}
              />
              <textarea
                className="form-control"
                value={editedTask.description}
                onChange={(e) => handleInputChange(e, 'description')}
              />
              <div className="mt-2">
                <button className="btn btn-sm btn-outline-success me-2" onClick={() => handleSaveEdit(index)}>
                  Save
                </button>
                <button className="btn btn-sm btn-outline-secondary" onClick={handleCancelEdit}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <span>{task.name}</span>
              <p className="mb-0">{task.description}</p>
              <div className="btn-group" role="group" aria-label="Task Actions">
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => handleEditClick(index)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => deleteTask(index)}
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
