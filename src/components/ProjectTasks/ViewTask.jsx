import { Link, useNavigate } from "react-router-dom";
import styles from "../ProjectTasks/ViewTask.module.css"
import { useContext } from "react";
import { ProjectContext } from "../Contexts/ProjectContext";
import { useAuth } from "../Contexts/AuthContext";

function ViewTask() {
    const { task, setNewTasks, states, project } = useContext(ProjectContext);
    const { token } = useAuth("state");
    const navigate = useNavigate();


    function deleteTask() {
        fetch(`${import.meta.env.VITE_API_BASE_URL}taskmanager/tasks/${task.id}/`, {
            method: "DELETE",
            headers: {
                Authorization: `Token ${token}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("No se pudo eliminar la tarea");
                }
                setNewTasks((prevTasks) =>
                    prevTasks.filter((t) => t.id !== task.id)
                );
                navigate("/projects");
            })
            .catch((error) => {
                console.error("Error al intentar eliminar la tarea", error);
            })
    }

    function changeStatus(estado) {

        const selectState = states.find(e => e.name === estado);

        fetch(`${import.meta.env.VITE_API_BASE_URL}taskmanager/tasks/${task.id}`, {
            method: "PATCH",
            body: JSON.stringify({

                status: selectState.id,
            }),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("No se pudo cambiar el estado");
                }
                return response.json();
            })
            .then((data) => {
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
                navigate("/projects")
            })
            .catch((error) => {
                console.error("Error al intentar cambiar el estado", error);
            })       

    }



    return (
        <div className={styles.container}>
            <div className={styles.nav}>
                <div className={styles.back}>
                    <Link to='/projects'>Volver</Link>
                </div>
                <div className={styles.delete}>
                    <Link onClick={deleteTask}>Eliminar</Link>
                </div>
            </div>
            <div className={styles.profile_container}>
                {task ?
                    <div className={styles.info}>
                        <div>
                            <h2 className={styles.name}>Tiulo: {task.title} </h2>
                            <h2 className={styles.name}>Descripción: {task.description} </h2>
                        </div>
                            <h2 className={styles.name}>Elige el Estado de la tarea:</h2>
                        <div className={styles.states}>
                            <div className={styles.to_do}>
                                <Link onClick={() => changeStatus("To Do")}>Por Hacer</Link>
                            </div>
                            <div className={styles.in_process}>
                                <Link onClick={() => changeStatus("In Progress")}>En Curso</Link>
                            </div>
                            <div className={styles.finish}>
                                <Link onClick={() => changeStatus("Done")}>Finalizada</Link>
                            </div>

                        </div>
                    </div>
                    : <h1 className={styles.name}>"Ups... No se encontro la tarea..."</h1>
                }
            </div>
        </div>
    )
}

export default ViewTask;
