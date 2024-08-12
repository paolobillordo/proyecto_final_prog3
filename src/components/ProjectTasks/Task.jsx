import { useContext } from 'react';
import styles from '../ProjectTasks/Task.module.css'
import { ProjectContext } from '../Contexts/ProjectContext';
import { useNavigate } from 'react-router-dom';

function Task(t) {
    const { selTask } = useContext(ProjectContext);
    const navigate = useNavigate()
    
    const selectTask = () => {
        selTask(t);
        navigate("/task")
    }


    return (
        <div className={styles.container} onClick={selectTask}>
            <h3 className={styles.task_title}>{t.title}</h3>
        </div>
    )
}

export default Task;