import { useState, useEffect } from "react";
import { useAuth } from "../../firebase/AuthContext";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import styles from "../css/login.module.css";
import { auth } from "../../firebase/firebase";

import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";

function Login(){
    const { user, loading } = useAuth();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [creatingAcc, setCreatingAcc] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (user) navigate("/home", { replace: true });
    }, [user, navigate]);

    //function for logging in with email and password
	const handleEmailLogin = async () => {
		try {
            //if the user is creating an account
			if (creatingAcc){
                await createUserWithEmailAndPassword(auth, email, password);
                
            //if the user is logging in
            }else{
                await signInWithEmailAndPassword(auth, email, password);
            } 

            navigate("/home")

		} catch (err) {
			setError("Login failed.");
		}
	};

    if (loading) return <p>Loading...</p>;

    //function for logging in with Google
	const handleGoogleLogin = async () => {
		try {
			const provider = new GoogleAuthProvider();
			await signInWithPopup(auth, provider);
            navigate("/home");
            
		} catch (err) {
			setError("Google sign-in failed.");
		}
	};

    return (
        <div className={styles["page"]}>
            <div className={styles["header"]}>
                <p style={{fontSize: "50px", fontWeight: "500"}}>Handled</p>
                <p style={{fontSize: "16px", fontWeight: "400"}}>a work order app that...works</p>
            </div>
            
            <div className={styles["content"]}>
                <Input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    icon="mail"
                />

                <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    icon="lock"
                />

                <Button text={creatingAcc ? "Sign Up" : "Login"} color="var(--btn-1)" onChange={handleEmailLogin}/>

                <div className={styles["toggle"]}>
                    <p>{creatingAcc ? "Already have an account?" : "Don't have an account?"}</p>
                    <p className={styles["click-text"]} onClick={() => setCreatingAcc(!creatingAcc)}>{creatingAcc ? "Login" : "Sign Up"}</p>
                </div>

                <p style={{fontSize: "20px", color: "var(--default-text)"}}>or</p>
                <Button text="Continue with Google" color="var(--btn-1)" onChange={handleGoogleLogin} icon="google" />

                {error && <p style={{fontSize: "20px", color: "var(--btn-2)"}}>{error}</p>}
            </div>
        </div>
    )
}

export default Login;