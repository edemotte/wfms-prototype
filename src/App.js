
import React, { useState, useEffect } from 'react';
import CreateWorkflowButton from './components/CreateWorkflowButton';
import { doc, collection, getDocs, addDoc,updateDoc, deleteDoc } from 'firebase/firestore';
import db from './components/firebase';
import WorkflowVisualization from './components/WorkflowVisualization';
import Modal from './components/Modal';
import EditWorkflowForm from './components/EditWorkflowForm';





import NewWorkflowForm from './components/NewWorkflowForm';

function App() {
  const [showWorkflowForm, setShowWorkflowForm] = useState(false);
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);



  const openWorkflowForm = () => setShowWorkflowForm(true);
  // const closeWorkflowForm = () => setShowWorkflowForm(false);
  const [workflows, setWorkflows] = useState([]);

  useEffect(() => {
    const fetchWorkflows = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'workflows'));
        const fetchedWorkflows = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setWorkflows(fetchedWorkflows);
      } catch (error) {
        console.error('Error fetching workflows:', error);
      }
    };
  
    fetchWorkflows();
  }, []);
  
    


// const handleEditWorkflow = async (updatedWorkflow) => {
//   // Update the workflow in the database and the local state
//   await updateDoc(doc(db, "workflows", updatedWorkflow.id), updatedWorkflow);
//   setWorkflows(workflows.map(wf => wf.id === updatedWorkflow.id ? updatedWorkflow : wf));
// };

const handleEditWorkflow = (index) => {
  setSelectedWorkflow(workflows[index]);
  setShowEditModal(true);
};

const closeWorkflowForm = () => {
  setShowWorkflowForm(false);
  setSelectedWorkflow(null);
};


const handleSaveEditedWorkflow = async (editedWorkflow) => {
  if (!selectedWorkflow) return;
  
  const updatedWorkflows = workflows.map((workflow) =>
    workflow.id === selectedWorkflow.id ? { ...selectedWorkflow, ...editedWorkflow } : workflow
  );

  setWorkflows(updatedWorkflows);
  setSelectedWorkflow(null);
  setIsEditModalOpen(false);

  const workflowRef = doc(db, 'workflows', selectedWorkflow.id);
  try {
    await updateDoc(workflowRef, editedWorkflow);
    console.log('Workflow updated successfully');
  } catch (error) {
    console.error('Error updating workflow:', error);
  }
};


const handleDeleteWorkflow = async (workflowToDelete) => {
  // Delete the workflow from the database and the local state
  await deleteDoc(doc(db, "workflows", workflowToDelete.id));
  setWorkflows(workflows.filter(wf => wf.id !== workflowToDelete.id));
};



    const saveWorkflow = async (workflow) => {
      try {
        const docRef = await addDoc(collection(db, 'workflows'), workflow);
        console.log('New workflow saved with ID:', docRef.id);
      } catch (error) {
        console.error('Error saving workflow:', error);
      }
    };
    
  

  return (
    <div className="App">
<header>
        {/* Add your header components here */}
      </header>

      <main>
        <CreateWorkflowButton openWorkflowForm={openWorkflowForm} />
        {/* {showWorkflowForm && (
          <NewWorkflowForm 
            saveWorkflow={saveWorkflow} 
            closeWorkflowForm={() => setShowEditModal(false)} 
            initialWorkflow={selectedWorkflow}
            isEditMode={isEditModalOpen}
            handleSaveEditedWorkflow={handleSaveEditedWorkflow}
          />
        )} */}
{showWorkflowForm && !isEditModalOpen && (
  <NewWorkflowForm
    saveWorkflow={saveWorkflow}
    closeWorkflowForm={closeWorkflowForm}
    initialWorkflow={null}
  />
)}

{showEditModal && (
  <EditWorkflowForm
    initialWorkflow={selectedWorkflow}
    handleSaveEditedWorkflow={handleSaveEditedWorkflow}
    closeWorkflowForm={() => setShowEditModal(false)}
  />
)}





        {/* Add other components like Dashboard, NavigationMenu, etc. */}
      </main>

      {workflows.map((workflow, index) => (
        <div key={index} className="workflow-container">
          <h3>{workflow.workflowName}</h3>
          <p>{workflow.workflowDescription}</p>
          <WorkflowVisualization 
            workflow={workflow} 
            onEditWorkflow={handleEditWorkflow}
            onDeleteWorkflow={handleDeleteWorkflow}
            setIsEditModalOpen={setShowEditModal}
          />
          
        </div>
      ))}

{isEditModalOpen && (
  <Modal isOpen={isEditModalOpen} closeModal={() => setIsEditModalOpen(false)}>
    <NewWorkflowForm 
      saveWorkflow={handleSaveEditedWorkflow} 
      closeWorkflowForm={() => setIsEditModalOpen(false)} 
      initialWorkflow={selectedWorkflow}
      handleSaveEditedWorkflow={handleSaveEditedWorkflow}
    />
  </Modal>
)}


    </div>
  );
}

export default App;