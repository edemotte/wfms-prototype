import React from 'react';

const CreateWorkflowButton = ({ openWorkflowForm }) => {
  return (
    <button onClick={openWorkflowForm}>
      Create a New Workflow
    </button>
  );
};

export default CreateWorkflowButton;
