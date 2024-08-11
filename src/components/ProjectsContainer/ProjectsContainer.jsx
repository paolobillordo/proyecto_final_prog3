import Projects from "../Projects/Projects";
import ProjectTask from "../ProjectTasks/ProjectTasks";
import styles from "../ProjectsContainer/ProjectsContainer.module.css"
import NavBar from "../NavBar/NavBar";
import { useContext, useEffect, useState } from "react";
import { ProjectContext } from "../Contexts/ProjectContext";
import { useAuth } from "../Contexts/AuthContext";

function ProjectsContainer() {
    const [data, setData] = useState(null);
    const { token } = useAuth("state");
    const { projects, tasks, userId, setId, setNewProjects, setNewTasks, removeProject, removeTask, addProject, addTask } = useContext(ProjectContext);

    let page = 1;

    function getProjects(page){
        fetch(`${import.meta.env.VITE_API_BASE_URL}/taskmanager/projects/?page_size=100&page=${page}`, {
            method: "GET",
            headers: {
                Authorization: `Token ${token}`,
            },

        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("No se pudo iniciar sesión");
                }
                return response.json();
            })
            .then((responseData) => {
                addProject(responseData.results);
                if (responseData.next != null) {
                    page+=1;
                    getProjects(page)
                }
            })
            .catch((error) => {
                console.error("Error error al iniciar sesión", error);
            })           
        }
        
        useEffect(() => {
            fetch(`${import.meta.env.VITE_API_BASE_URL}users/profiles/profile_data/`, {
                method: "GET",
                headers: {
                    Authorization: `Token ${token}`,
                },

            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("No se pudo iniciar sesión");
                    }
                    return response.json();
                })
                .then((responseData) => {
                    setId(responseData.user__id);
                })
                .catch((error) => {
                    console.error("Error error al iniciar sesión", error);
                })
            removeProject()
            getProjects(page)
        }, []);
        

    return (
        <div>
            <NavBar />
            <div className={styles.container}>
                <Projects />
                <ProjectTask />
            </div>
        </div>
    );
}

export default ProjectsContainer;