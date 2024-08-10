import styles from '../ProjectTasks/ProjectTasks.module.css'
import Task from './Task';


function ProjectTask() {
    
    return (
        <div className={styles.container}>
            <div className={styles.project_desc}>
                <h1 className={styles.title}>Proyecto:</h1>
                <p className={styles.description}>Esta es la descripción del proyecto elegido</p>
                <button className={styles.btn_new_task}>NUEVA TAREA</button>

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
        </div>
    )
}


export default ProjectTask;