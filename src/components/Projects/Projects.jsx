import styles from '../Projects/Projects.module.css'
import Project from './Project.jsx';

function Projects() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Tus Proyectos</h1>
            <div className={styles.projects_container}>
                <div className={styles.projects}>
                    <Project />
                    <Project />
                    <Project />
                    <Project />
                    <Project />
                    <Project />
                    <Project />
                    <Project />
                    <Project />
                    <Project />
                    <Project />
                    <Project />
                    <Project />
                </div>
                <button className={styles.btn_create}>CREAR NUEVO</button>

            </div>
        </div>
    )
}

export default Projects;