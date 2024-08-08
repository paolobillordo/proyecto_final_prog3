import styles from '../ProjectTasks/ProjectTasks.module.css'


function ProjectTask(){
    return(
        <div className={styles.container}>
            <div className={styles.project_desc}>
                <h1 className={styles.title}>Proyecto:</h1>
                <p className={styles.description}>Esta es la descripción del proyecto elegido</p>
            </div>
            <div className={styles.tasks_container}>
                <div className={styles.column_task}>

                </div>
                <div className={styles.column_task}>

                </div>
                <div className={styles.column_task}>

                </div>

            </div>
        </div>

    )

}

export default ProjectTask;