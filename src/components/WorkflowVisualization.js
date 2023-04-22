import React from 'react';
import '../WorkflowVisualization.css';

const WorkflowVisualization = ({ workflow, workflowId, onEditWorkflow, onDeleteWorkflow,setIsEditModalOpen }) => {
  const renderTasks = () => {
    return workflow.tasks.map((task, index) => (
      <div key={index} className="task">
        {task.name}
        <div className="task-hover">
          {task.description && <p>Description: {task.description}</p>}
          {task.assignee && <p>Assignee: {task.assignee}</p>}
          {task.dueDate && <p>Due Date: {task.dueDate}</p>}
          {task.priority && <p>Priority: {task.priority}</p>}
          <button onClick={() => {
            onEditWorkflow(workflowId);
            setIsEditModalOpen(true);
          }}>Edit</button>
          {/* <button onClick={() => onDeleteWorkflow(index)}>Delete</button> */
          // <button onClick={() => onDeleteWorkflow(workflow)}>Delete</button>

          }
        </div>
      </div>
    ));
  };

  
  const renderConnections = () => {

    const connectors = [];

    workflow.tasks.forEach((task, taskIndex) => {
      // console.log("task", task)
      task.dependencies.forEach((dependencyIndex) => {
        const startY = 50 * taskIndex + 25;
        const endY = 50 * dependencyIndex + 25;
        const middleY = (startY + endY) / 2;

        connectors.push(
          <React.Fragment key={`${taskIndex}-${dependencyIndex}`}>
            <div
              className="horizontal-line"
              style={{
                position: 'absolute',
                top: `${startY}px`,
                left: 0,
                width: '50px',
                borderBottom: '2px solid #333',
              }}
            ></div>
            <div
              className="vertical-line"
              style={{
                position: 'absolute',
                top: `${Math.min(startY, endY)}px`,
                left: 0,
                height: `${Math.abs(endY - startY)}px`,
                borderLeft: '2px solid #333',
              }}
            ></div>
            <div
              className="horizontal-line"
              style={{
                position: 'absolute',
                top: `${endY}px`,
                left: 0,
                width: '50px',
                borderBottom: '2px solid #333',
              }}
            ></div>
          </React.Fragment>
        );
        // console.log(connectors);
      });
    });
  
    return connectors;
  };
  
return (
  <div className="workflow-visualization">
    {renderConnections()}
    {renderTasks()}
  </div>
);

};

export default WorkflowVisualization;
