import { useContext } from 'react';
import styles from '../Projects/Project.module.css'
import { ProjectContext } from '../Contexts/ProjectContext';

function Project(proj) {
    const { project, selProject } = useContext(ProjectContext);

    const sel_proj = () => {
        selProject(proj)
    }


    return (
        <div className={`${styles.container} ${project? project.id === proj.id ? styles.selected : '':''}`} onClick={sel_proj}>
            <p className={styles.project_name}>{proj.name}</p>
        </div>
    )
}

export default Project;