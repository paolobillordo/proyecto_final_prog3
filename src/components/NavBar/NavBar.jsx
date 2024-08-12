import { useContext } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import styles from '../NavBar/NavBar.module.css'
import { Link } from 'react-router-dom';
import { ProjectContext } from '../Contexts/ProjectContext';

function NavBar() {
    const { nameUser } = useContext(ProjectContext);

    const { logout } = useAuth("actions");
    

    return (
        <header className={styles.header}>
            <span className={styles.logo}>Tablero de {nameUser}</span>
            <nav className={styles.nav}>
                <Link to='/profile'>Mi Perfil</Link>
                <Link onClick={logout}>Logout</Link>

            </nav>

        </header>
    )
}

export default NavBar;