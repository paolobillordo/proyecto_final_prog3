import { useEffect, useState } from "react";
import styles from "../Profile/EditProfile.module.css"
import { useAuth } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function EditProfile() {
    const { token } = useAuth("state");
    const [data, setData] = useState(null)
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        username: '',
        bio: '',
        email: '',
        image: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleImageChange = (e) => {
        setFormData({
            ...formData,
            image: e.target.files[0],
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const filledFormData = {};
        for (const key in formData) {
            if (formData[key]) {
                filledFormData[key] = formData[key];
            }
        }

        fetch(`${import.meta.env.VITE_API_BASE_URL}users/profiles/${data.user__id}/`, {
            method: "PATCH",
            body: filledFormData,
            headers: {
                Authorization: `Token ${token}`,
            },

        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("No se pudo modificar el perfil");
                }
                navigate("/profile")
                return;
            })
            .catch((error) => {
                console.error("Error intentar modificar el perfil", error);
            })

        console.log(data.user__id)

    };


    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BASE_URL}users/profiles/profile_data/`, {
            method: "GET",
            headers: {
                Authorization: `Token ${token}`,
            },

        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("No se pudo encontrar el usuario");
                }
                return response.json();
            })
            .then((responseData) => {
                setData(responseData);
            })
            .catch((error) => {
                console.error("Error al buscar el usuario", error);
            })

    }, []);

    return (
        <div className={styles.container}>
            <h2 className={styles.editar}>Editar Perfil</h2>
            {data ?

                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="first_name">Nombre:</label>
                        <input
                            type="text"
                            id="first_name"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            placeholder={data.first_name}
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="last_name">Apellido:</label>
                        <input
                            type="text"
                            id="last_name"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            placeholder={data.last_name}
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="username">Usuario:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder={data.username}
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="email">Correo Electrónico:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder={data.email}
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="bio">Biografía:</label>
                        <textarea
                            id="bio"
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            rows="4"
                            placeholder={data.bio}
                            className={styles.textarea}
                        />
                    </div>
                    <div className={styles.formGroup} id={styles.file_container}>
                        <label className={styles.label} htmlFor="image">imagen de Perfil:</label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            onChange={handleImageChange}
                            className={styles.file_input}
                        />
                    </div>
                    <div className={styles.formGroup} id={styles.button}>
                        <button type="submit" className={styles.button}>
                            Guardar
                        </button>
                    </div>
                </form> :
                <h3 className={styles.editar}>Ups... No se encontraron tus datos</h3>
            }
        </div>
    );

}

export default EditProfile;