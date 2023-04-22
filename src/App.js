
import React, { useState, useEffect } from 'react';
import CreateWorkflowButton from './components/CreateWorkflowButton';
import { doc, collection, getDocs, addDoc,updateDoc, deleteDoc } from 'firebase/firestore';
import  { db, auth } from './components/firebase';
import NewWorkflowForm from './components/NewWorkflowForm';
import WorkflowVisualization from './components/WorkflowVisualization';
import Modal from './components/Modal';
import EditWorkflowForm from './components/EditWorkflowForm';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Auth from './components/Auth';
import { signOut } from 'firebase/auth';
import './App.css'

function App() {
  // const [showWorkflowForm, setShowWorkflowForm] = useState(false);
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [user, setUser] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [workflows, setWorkflows] = useState([]);
  

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log('User signed out');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

    const handleSaveNewWorkflow = (workflow) => {
    setWorkflows([...workflows, workflow]);
    setIsCreateModalOpen(false);
  };

  

  // const openWorkflowForm = () => setShowWorkflowForm(true);
  // const closeWorkflowForm = () => setShowWorkflowForm(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Clean up the listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

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

const handleEditWorkflow = (workflowId) => {
  const selected = workflows.find((workflow) => workflow.id === workflowId);
  setSelectedWorkflow(selected);
  setShowEditModal(true);
};

// const closeWorkflowForm = () => {
//   setShowWorkflowForm(false);
//   setSelectedWorkflow(null);
// };


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
      { user ? (

        <>
      <header>
      <button onClick={handleSignOut}>Sign out</button>
      </header>

      <main>
        <CreateWorkflowButton openWorkflowForm={() => setIsCreateModalOpen(true)} />
      </main>

      {workflows.map((workflow, index) => (
        <div key={index} className="workflow-container">
          <h3>{workflow.workflowName}</h3>
          <p>{workflow.workflowDescription}</p>
          <WorkflowVisualization 
            workflow={workflow}
            workflowId={workflow.id}
            onEditWorkflow={handleEditWorkflow}
            onDeleteWorkflow={handleDeleteWorkflow}
            setIsEditModalOpen={setIsEditModalOpen}
          />
          
        </div>
      ))}
        <Modal isOpen={isCreateModalOpen} closeModal={() => setIsCreateModalOpen(false)}>
          <NewWorkflowForm saveWorkflow={handleSaveNewWorkflow} closeWorkflowForm={() => setIsCreateModalOpen(false)} />
        </Modal>
      
        <Modal isOpen={isEditModalOpen} closeModal={() => setIsEditModalOpen(false)}>
          {selectedWorkflow && (
          <EditWorkflowForm 
          initialWorkflow={selectedWorkflow}
          handleSaveEditedWorkflow={handleSaveEditedWorkflow}
          closeWorkflowForm={() => setIsEditModalOpen(false)}
          />  
        )}
        </Modal>
      </>
      ) : <Auth setUser={setUser} /> }
    </div>
  );
}

export default App;