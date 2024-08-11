import { useState } from "react";
import styles from "../Projects/NewProject.module.css"
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";


function NewProject() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const { token } = useAuth("state")
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`${import.meta.env.VITE_API_BASE_URL}/taskmanager/projects/`, {
            method: "POST",
            body: JSON.stringify({
                name: name,
                description: description,
            }),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("No se pudo modificar el perfil");
                }
                navigate("/projects")
                return;
            })
            .catch((error) => {
                console.error("Error intentar modificar el perfil", error);
            })


        setName('');
        setDescription('');
    };

    return (
        <div className={styles.container}>
            <Link to="/projects" className={styles.back} >VOLVER</Link>

            <form onSubmit={handleSubmit}>
                <div className={styles.field}>
                    <label className={styles.field_names} htmlFor="name">Nombre</label>
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
    );
}


export default NewProject;