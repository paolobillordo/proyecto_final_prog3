import styles from './App.module.css'
import NavBar from './components/NavBar/NavBar.jsx'
import Welcome from './components/Welcome/Welcome.jsx';
import Projects from './components/Projects/Projects.jsx';
import Footer from './components/Footer/Footer.jsx';
import ProjectTasks from './components/ProjectTasks/ProjectTasks.jsx';

function App() {
  return (
    <div>
      <NavBar />

      <div className={styles.container}>
        <Projects />
        <ProjectTasks />

      </div>
    </div>
  )
}

export default App;
