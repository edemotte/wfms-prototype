
import React, { useState, useEffect } from 'react';
import CreateWorkflowButton from './components/CreateWorkflowButton';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import db from './components/firebase';
import WorkflowVisualization from './components/WorkflowVisualization';



import NewWorkflowForm from './components/NewWorkflowForm';

function App() {
  const [showWorkflowForm, setShowWorkflowForm] = useState(false);

  const openWorkflowForm = () => setShowWorkflowForm(true);
  const closeWorkflowForm = () => setShowWorkflowForm(false);
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
        {showWorkflowForm && (
          <NewWorkflowForm saveWorkflow={saveWorkflow} closeWorkflowForm={closeWorkflowForm} />
        )}

        {/* Add other components like Dashboard, NavigationMenu, etc. */}
      </main>

      {workflows.map((workflow, index) => (
        <div key={index} className="workflow-container">
          <h3>{workflow.workflowName}</h3>
          <p>{workflow.workflowDescription}</p>
          <WorkflowVisualization workflow={workflow} />
        </div>
      ))}

    </div>
  );
}

export default App;