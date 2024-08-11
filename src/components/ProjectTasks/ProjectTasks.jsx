import { useContext } from 'react';
import styles from '../ProjectTasks/ProjectTasks.module.css'
import Task from './Task';
import { ProjectContext } from '../Contexts/ProjectContext';
import { useAuth } from '../Contexts/AuthContext';


function ProjectTask() {
    const { project } = useContext(ProjectContext);
    const { token } = useAuth("state")

    const deleteProject = () => {

        fetch(`${import.meta.env.VITE_API_BASE_URL}/taskmanager/projects/${project.id}/`, {
            method: "DELETE",            
            headers: {
                Authorization: `Token ${token}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("No se pudo eliminar el proyecto");
                }
                window.location.reload();
                return;
            })
            .catch((error) => {
                console.error("Error al intentar eliminar el proyecto", error);
            })

    }


    return (
        <div className={styles.container}>
            {project ?
                <>
                    <div className={styles.project_desc}>
                        <p className={styles.description}>{project ? project.description : ''}</p>
                        <button className={styles.btn_new_task}>NUEVA TAREA</button>
                        <button className={styles.btn_delete_project} onClick={deleteProject}>ELIMINAR PROYECTO</button>
                    </div>

                    <div className={styles.tasks_container}>
                        <div className={styles.column_task}>
                            <h2 className={styles.to_do}>POR HACER</h2>
                            <Task />
                            <Task />
                            <Task />
                            <Task />
                            <Task />
                            <Task />

                        </div>
                        <div className={styles.column_task}>
                            <h2 className={styles.in_curse}>EN CURSO</h2>
                            <Task />
                            <Task />

                        </div>
                        <div className={styles.column_task}>
                            <h2 className={styles.finish}>TERMINADO</h2>
                            <Task />
                            <Task />
                            <Task />
                        </div>

                    </div>
                </> : null}
        </div>
    )
}


export default ProjectTask;