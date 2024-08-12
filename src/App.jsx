import styles from './App.module.css'
import NavBar from './components/NavBar/NavBar.jsx'
import Welcome from './components/Welcome/Welcome.jsx';
import Footer from './components/Footer/Footer.jsx';
import Login from './components/Login/Login.jsx';
import { AuthProvider } from './components/Contexts/AuthContext.jsx';
import { Route, Routes } from 'react-router-dom';
import ProjectsContainer from './components/ProjectsContainer/ProjectsContainer.jsx';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx';
import Profile from './components/Profile/Profile.jsx';
import EditProfile from './components/Profile/EditProfile.jsx';
import { ProjectProvider } from './components/Contexts/ProjectContext.jsx';
import NewProject from './components/Projects/NewProject.jsx';
import ViewTask from './components/ProjectTasks/ViewTask.jsx';
import NewTask from './components/ProjectTasks/NewTask.jsx';


function App() {
  return (
    <AuthProvider>
      <ProjectProvider>
        <div>

          <div className={styles.container}>
            <Routes>
              <Route path='/' element={<Welcome />} />
              <Route path='/login' element={<Login />} />
              <Route path='/projects' element={<ProtectedRoute><ProjectsContainer /></ProtectedRoute>} />
              <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path='/profile/edit' element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
              <Route path='/new/project' element={<ProtectedRoute><NewProject /></ProtectedRoute>} />
              <Route path='/task' element={<ProtectedRoute><ViewTask /></ProtectedRoute>} />
              <Route path='/new/task' element={<ProtectedRoute><NewTask /></ProtectedRoute>} />
            </Routes>
          </div>
          <Footer/>
        </div>

      </ProjectProvider>

    </AuthProvider>
  )
}

export default App;
