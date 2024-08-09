import { useAuth } from "../Contexts/AuthContext";
import styles from "../Profile/Profile.module.css"
import { Link } from 'react-router-dom';


function Profile() {
    const { logout } = useAuth("actions");


    return (
        <div className={styles.container}>
            <div className={styles.nav}>
                <div className={styles.back}>
                    <Link to='/projects'>Volver</Link>
                </div>
                <div className={styles.logout}>
                    <Link onClick={logout}>Logout</Link>
                </div>
            </div>
            <div className={styles.profile_container}>

            </div>
        </div>
    )
}

export default Profile;

/* "username": "32162145",
"first_name": "Paolo Fernando Martin",
"last_name": "Billordo",
"email": "paolobillordo@gmail.com",
"bio": null, */