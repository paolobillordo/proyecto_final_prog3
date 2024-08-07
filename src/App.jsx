import styles from './App.module.css'
import NavBar from './components/NavBar/NavBar.jsx'
import Welcome from './components/Welcome/Welcome.jsx';
import Projects from './components/Projects/Projects.jsx';
import Footer from './components/Footer/Footer.jsx';

function App() {
  return (
    <div className={styles.container}>
      <NavBar />
      <Projects />
      <Footer />
      
    </div>
  )
}

export default App;
