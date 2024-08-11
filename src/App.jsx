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
              <Route path='/profile' element={<Profile />} />
              <Route path='/profile/edit' element={<EditProfile />} />
              <Route path='/new/project' element={<NewProject />} />

            </Routes>
          </div>
        </div>

      </ProjectProvider>

    </AuthProvider>
  )
}

export default App;
