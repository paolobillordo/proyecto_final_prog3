import { useContext, useEffect, useRef } from 'react';
import styles from '../Projects/Project.module.css'
import { ProjectContext } from '../Contexts/ProjectContext';
import { useAuth } from '../Contexts/AuthContext';

function Project(proj) {
    const { project, selProject, setNewTasks, setRender, firstRender, addStates } = useContext(ProjectContext);
    const { token } = useAuth("state");

    const sel_proj = () => {
        selProject(proj)
    }

    useEffect(() => {
        if (firstRender) {
            setRender(false);
            return;
        }
        fetch(`${import.meta.env.VITE_API_BASE_URL}taskmanager/tasks/?page_size=100&project=${project.id}`, {
            method: "GET",
            headers: {
                Authorization: `Token ${token}`,
            },

        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("No se pudo traer las tareas del proyecto");
                }
                return response.json();
            })
            .then((responseData) => {
                setNewTasks(responseData.results)
            })
            .catch((error) => {
                console.error("Error al traer las tareas", error);
            })

        fetch(`${import.meta.env.VITE_API_BASE_URL}taskmanager/task-states/?page_size=100&project=${project.id}`, {
            method: "GET",
            headers: {
                Authorization: `Token ${token}`,
            },

        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("No se pudo traer los estados del proyecto");
                }
                return response.json();
            })
            .then((responseData) => {
                addStates(responseData.results)
            })
            .catch((error) => {
                console.error("Error al traer los estados", error);
            })
    }, [project]);


    return (
        <div className={`${styles.container} ${project ? project.id === proj.id ? styles.selected : '' : ''}`} onClick={sel_proj}>
            <p className={styles.project_name}>{proj.name}</p>
        </div>
    )
}

export default Project;