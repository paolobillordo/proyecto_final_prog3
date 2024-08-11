import { useContext, useState } from 'react';
import styles from '../Projects/Projects.module.css'
import Project from './Project.jsx';
import { useAuth } from '../Contexts/AuthContext.jsx';
import { ProjectContext } from '../Contexts/ProjectContext.jsx';
import { Link } from 'react-router-dom';

function Projects() {
    const [data, setData] = useState(null);
    const { token } = useAuth("state");
    const { projects, tasks, userId, setId, setNewProjects, setNewTasks, removeProject, removeTask, addProject, addTask } = useContext(ProjectContext);

    let myProjects = (projects? projects.filter(project => project.owner === userId): null)
    
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Tus Proyectos</h1>
            <div className={styles.projects_container}>
                <div className={styles.projects}>
                    {myProjects ? myProjects.map((project, index) => (
                        <Project key={index} {...project} />
                    )):null}                    
                </div>
                <Link to="/new/project" className={styles.btn_create}>CREAR NUEVO</Link>
            </div>
        </div>
    )
}

export default Projects;