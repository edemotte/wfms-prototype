import React, { useState } from 'react';
import '../NewWorkflowForm.css';

const NewWorkflowForm = ({ saveWorkflow, closeWorkflowForm }) => {
  const [workflowName, setWorkflowName] = useState('');
  const [workflowDescription, setWorkflowDescription] = useState('');
  const [workflowVisibility, setWorkflowVisibility] = useState('public');
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    setTasks([...tasks, { name: '', description: '', assignee: '', dueDate: '', priority: '', dependencies: [] }]);
  };

  const handleTaskChange = (index, field, value) => {
    const updatedTasks = [...tasks];
    updatedTasks[index][field] = value;
    setTasks(updatedTasks);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    saveWorkflow({ workflowName, workflowDescription, workflowVisibility, tasks });
    closeWorkflowForm();
  };

  return (
    <div className="new-workflow-form">
           <h2>Create a New Workflow</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="workflowName">Workflow Name:</label>
        <input
          type="text"
          id="workflowName"
          value={workflowName}
          onChange={(e) => setWorkflowName(e.target.value)}
        />

        <label htmlFor="workflowDescription">Workflow Description:</label>
        <textarea
          id="workflowDescription"
          value={workflowDescription}
          onChange={(e) => setWorkflowDescription(e.target.value)}
        />

        <label htmlFor="workflowVisibility">Workflow Visibility:</label>
        <select
          id="workflowVisibility"
          value={workflowVisibility}
          onChange={(e) => setWorkflowVisibility(e.target.value)}
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>

        <h3>Tasks:</h3>
        {tasks.map((task, index) => (
          <div key={index}>
            <label htmlFor={`taskName-${index}`}>Task Name:</label>
            <input
              type="text"
              id={`taskName-${index}`}
              value={task.name}
              onChange= {(e) => handleTaskChange(index, 'name', e.target.value)}
            />

            <label htmlFor={`taskDescription-${index}`}>Task Description:</label>
            <textarea
              id={`taskDescription-${index}`}
              value={task.description}
              onChange={(e) => handleTaskChange(index, 'description', e.target.value)}
            />

            <label htmlFor={`taskAssignee-${index}`}>Task Assignee:</label>
            <select
              id={`taskAssignee-${index}`}
              value={task.assignee}
              onChange={(e) => handleTaskChange(index, 'assignee', e.target.value)}
            >
              {/* Replace with dynamic assignee list */}
              <option value="user1">User 1</option>
              <option value="user2">User 2</option>
            </select>

            <label htmlFor={`taskDueDate-${index}`}>Task Due Date:</label>
            <input
              type="date"
              id={`taskDueDate-${index}`}
              value={task.dueDate}
              onChange={(e) => handleTaskChange(index, 'dueDate', e.target.value)}
            />

            <label htmlFor={`taskPriority-${index}`}>Task Priority:</label>
            <select
              id={`taskPriority-${index}`}
              value={task.priority}
              onChange={(e) => handleTaskChange(index, 'priority', e.target.value)}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
    
                <label htmlFor={`taskDependency-${index}`}>Task Dependencies:</label>
                <select
                  id={`taskDependency-${index}`}
                  multiple
                  value={task.dependencies}
                  onChange={(e) => {
                    const dependencies = Array.from(e.target.selectedOptions, (option) => option.value);
                    handleTaskChange(index, 'dependencies', dependencies);
                  }}
                >
                  {/* Replace with dynamic task dependency list */}
                  {tasks.map((dependency, dependencyIndex) => (
                    index !== dependencyIndex && (
                      <option key={dependencyIndex} value={dependencyIndex}>
                        {dependency.name || `Task ${dependencyIndex + 1}`}
    </option>
    )
    ))}
    </select>
    </div>
    ))}
    <button type="button" onClick={addTask}>
      Add Task
    </button>

    <button type="submit">
      Save Workflow
    </button>

    <button type="button" onClick={closeWorkflowForm}>
      Cancel
    </button>
  </form>
</div>
);
};
export default NewWorkflowForm;