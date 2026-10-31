import Navbar from "../components/Navbar";
import Header from "../components/Header";
import styles from "../css/home.module.css";
import { useAuth } from "../../firebase/AuthContext";

function Home(){
    const { user, loading } = useAuth();

    if (loading) return <p>Loading...</p>;

    return (
        <div className={styles["page"]}>
            <Header user={user} />
            <div className={styles["content"]}>
                <p style={{color: "white"}}>HOME PAGE</p>
            </div>
            <Navbar />
        </div>
    )
}

export default Home;