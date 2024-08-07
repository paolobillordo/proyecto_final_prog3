import { Navigate, useLocation, Link } from "react-router-dom";
import styles from '../Welcome/Welcome.module.css'


function Welcome() {
    const location = useLocation();

    function login(){
        return <Navigate to="/login" state={{ from: location }} />;
    }
    return (
        <div className={styles.container}>
            <div className={styles.sec_img}>
                <section className={styles.section}>
                    HOLA! Esto es TASK MANAGER, el manejador de tus proyectos y tareas personales que estabas buscando y acabas de encontrar.
                </section>
                <img className={styles.img_tasks} src="src\assets\file.png" alt="img tasks" />
            </div>
            <Link to='/login' className={styles.btn_login}>Login</Link>

        </div>

    )
}

export default Welcome;