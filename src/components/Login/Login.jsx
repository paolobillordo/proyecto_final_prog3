import { useRef, useState } from "react";
import { useAuth } from "../Contexts/AuthContext";
import styles from "../Login/Login.module.css"



function Login() {
    const usernameRef = useRef("");
    const passwordRef = useRef("");
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuth("actions");

    function handleSubmit(event) {
        event.preventDefault();
        if (!isLoading) {
            setIsLoading(true);
            fetch(`${import.meta.env.VITE_API_BASE_URL}api-auth/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: usernameRef.current.value,
                    password: passwordRef.current.value,
                }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("No se pudo iniciar sesión");
                    }
                    return response.json();
                })
                .then((responseData) => {
                    login(responseData.token);
                })
                .catch((error) => {
                    console.error("Error error al iniciar sesión", error);
                    setIsError(true);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }

    return (

        <div className={styles.container}>
            <form onSubmit={handleSubmit}>
                <div className={styles.field}>
                    <label className={styles.field_names} htmlFor="username">Nombre de usuario:</label>
                        <input
                            className={styles.input}
                            type="text"
                            id="username"
                            name="username"
                            ref={usernameRef}
                        />                        
                </div>
                <div className={styles.field}>
                    <label className={styles.field_names} htmlFor="password">Contraseña:</label>
                        <input
                            className={styles.input}
                            type="password"
                            id="password"
                            name="password"
                            ref={passwordRef}
                        />                       
                </div>
                <div className={styles.field}>
                    <div className={styles.btn_div}>
                        <button
                            type="submit"
                            className={styles.btn_login}
                        >
                            Login
                        </button>
                        {isLoading && <p>Cargando...</p>}
                        {isError && <p>Error al cargar los datos.</p>}
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Login;