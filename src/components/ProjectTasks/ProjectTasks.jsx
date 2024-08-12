import { useContext } from 'react';
import styles from '../ProjectTasks/ProjectTasks.module.css'
import Task from './Task';
import { ProjectContext } from '../Contexts/ProjectContext';
import { useAuth } from '../Contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';


function ProjectTask() {
    const { project, selProject, setNewProjects, tasks, states, setRender, } = useContext(ProjectContext);
    const { token } = useAuth("state");

    const deleteProject = () => {

        fetch(`${import.meta.env.VITE_API_BASE_URL}taskmanager/projects/${project.id}/`, {
            method: "DELETE",
            headers: {
                Authorization: `Token ${token}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("No se pudo eliminar el proyecto");
                }
                setNewProjects((prevProjects) =>
                    prevProjects.filter((p) => p.id !== project.id)
                );
                setRender(true)
                selProject(null);
                return;
            })
            .catch((error) => {
                console.error("Error al intentar eliminar el proyecto", error);
            })
    }

    const porHacer = states.find(e => e.name === "To Do");
    const enCurso = states.find(e => e.name === "In Progress");
    const finalizado = states.find(e => e.name === "Done");



    return (
        <div className={styles.container}>
            {project ?
                <>
                    <div className={styles.project_desc}>
                        <p className={styles.description}>{project ? project.description : ''}</p>
                        <Link to={"/new/task"} className={styles.btn_new_task} >NUEVA TAREA</Link>
                        <button className={styles.btn_delete_project} onClick={deleteProject}>ELIMINAR PROYECTO</button>
                    </div>

                    <div className={styles.tasks_container}>
                        <div className={styles.column_task}>
                            <h2 className={styles.to_do}>POR HACER</h2>
                            {tasks ? tasks.map((tarea, index) => (
                                porHacer.id === tarea.status ? <Task key={index} {...tarea} /> : null
                            )) : null}

                        </div>
                        <div className={styles.column_task}>
                            <h2 className={styles.in_curse}>EN CURSO</h2>
                            {tasks ? tasks.map((tarea, index) => (
                                enCurso.id === tarea.status ? <Task key={index} {...tarea} /> : null
                            )) : null}

                        </div>
                        <div className={styles.column_task}>
                            <h2 className={styles.finish}>TERMINADO</h2>
                            {tasks ? tasks.map((tarea, index) => (
                                finalizado.id === tarea.status ? <Task key={index} {...tarea} /> : null
                            )) : null}
                        </div>

                    </div>
                </> : null}
        </div>
    )
}


export default ProjectTask;