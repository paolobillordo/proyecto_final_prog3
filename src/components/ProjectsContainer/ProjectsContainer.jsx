import Projects from "../Projects/Projects";
import ProjectTask from "../ProjectTasks/ProjectTasks";
import styles from "../ProjectsContainer/ProjectsContainer.module.css"
import NavBar from "../NavBar/NavBar";

function ProjectsContainer() {
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