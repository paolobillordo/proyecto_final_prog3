import { useEffect, useState } from "react";
import { useAuth } from "../Contexts/AuthContext";
import styles from "../Profile/Profile.module.css"
import { Link } from 'react-router-dom';


function Profile() {
    const { logout } = useAuth("actions");
    const { token } = useAuth("state");
    const [data, setData] = useState(null)

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
                setData(responseData);
            })
            .catch((error) => {
                console.error("Error error al iniciar sesión", error);
            })

    }, []);

    console.log(data)


    return (
        <div className={styles.container}>
            <div className={styles.nav}>
                <div className={styles.back}>
                    <Link to='/projects'>Volver</Link>
                </div>
                <div className={styles.edit}>
                    <Link to='/profile/edit'>Editar</Link>
                </div>
                <div className={styles.logout}>
                    <Link onClick={logout}>Logout</Link>
                </div>
            </div>
            <div className={styles.profile_container}>
                {data ?
                    <div className={styles.info}>
                        <div>
                            <h2 className={styles.name}>Nombre: {data.first_name}</h2>
                            <h2 className={styles.name}>Apellido: {data.last_name}</h2>
                            <h2 className={styles.name}>email: {data.email}</h2>
                            <h2 className={styles.name}>username: {data.username}</h2>
                            <h2 className={styles.name}>bio: {data.bio}</h2>
                        </div>
                    </div>
                    : null
                }
            </div>
        </div>
    )
}

export default Profile;
