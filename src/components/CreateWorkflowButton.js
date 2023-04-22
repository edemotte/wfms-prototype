import React from 'react';

const CreateWorkflowButton = ({ openWorkflowForm }) => {
  return (
    <button className="create-workflow-button" onClick={openWorkflowForm}>
      Create a New Workflow
    </button>
  );
};

export default CreateWorkflowButton;
