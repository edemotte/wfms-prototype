import React, { useState, useEffect } from 'react';
import '../NewWorkflowForm.css';
import NewWorkflowForm from './NewWorkflowForm';

const EditWorkflowForm = ({ initialWorkflow, handleSaveEditedWorkflow, closeWorkflowForm }) => {
  const handleSave = (editedWorkflow) => {
    handleSaveEditedWorkflow({ ...initialWorkflow, ...editedWorkflow });
  };

  return (
    <NewWorkflowForm
      saveWorkflow={handleSave}
      closeWorkflowForm={closeWorkflowForm}
      initialWorkflow={initialWorkflow}
    />
  );
};

export default EditWorkflowForm;
