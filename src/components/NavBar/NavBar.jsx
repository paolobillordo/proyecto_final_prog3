import styles from '../NavBar/NavBar.module.css'
import { Link } from 'react-router-dom';

function NavBar() {
    const logout = () => {
        console.log("Boton de logout")
    }
    return (
        <header className={styles.header}>
            <span className={styles.logo}>TASK MANAGER</span>
            <nav className={styles.nav}>
                <Link to='/profile'>Mi Perfil</Link>
                <Link onClick={logout}>Logout</Link>

            </nav>

        </header>
    )
}

export default NavBar;