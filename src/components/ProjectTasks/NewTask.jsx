import { useContext, useState } from "react";
import { useAuth } from "../Contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import styles from "../ProjectTasks/NewTask.module.css"
import { ProjectContext } from "../Contexts/ProjectContext";


function NewTask() {
    const { project, addTask, states } = useContext(ProjectContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const { token } = useAuth("state")
    const navigate = useNavigate();

    const porHacer = states.find(estado => estado.name === "To Do");

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`${import.meta.env.VITE_API_BASE_URL}taskmanager/tasks/`, {
            method: "POST",
            body: JSON.stringify({
                title: name,
                description: description,
                project: project.id,
                status: porHacer.id,
            }),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("No se pudo crear la tarea");
                }
                return response.json();
            })
            .then((data) => {
                addTask([data])
                navigate("/projects")                
            })
            .catch((error) => {
                console.error("Error al intentar crear la tarea", error);
            })


        setName('');
        setDescription('');
    };

    return (
        <div className={styles.container}>
            <Link to="/projects" className={styles.back} >VOLVER</Link>

            <form onSubmit={handleSubmit}>
                <div className={styles.field}>
                    <label className={styles.field_names} htmlFor="name">Titulo</label>
                    <input
                        className={styles.input}
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className={styles.field}>
                    <label className={styles.field_names} htmlFor="description">Descripción</label>
                    <textarea
                        className={styles.text_area}
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>

                <button className={styles.create} type="submit">Crear</button>
            </form>

        </div>
    )
}

export default NewTask;