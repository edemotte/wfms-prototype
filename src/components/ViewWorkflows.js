import React from 'react';
import WorkflowVisualization from './WorkflowVisualization';

const ViewWorkflows = ({ workflow }) => {
    return (
      <div className="view-workflows">
        <h2>Workflow Visualization</h2>
        <WorkflowVisualization workflow={workflow} />
      </div>
    );
  };
  
  export default ViewWorkflows;
  