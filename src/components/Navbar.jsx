import { useNavigate } from "react-router-dom";
import styles from "../css/navbar.module.css";
import { Calendar, Message, Home } from "../icons";

function Navbar(){
    const navigate = useNavigate();

    return(
        <div className={styles["bar"]}>
            <div className={styles["icon"]} onClick={() => navigate("/home")}>
                <Home style={{width: "24", height: "24", color: "currentColor"}}/>
                <p>Home</p>
            </div>
            <div className={styles["icon"]} onClick={() => navigate("/orders")}>
                <Calendar style={{width: "24", height: "24", color: "currentColor"}}/>
                <p>My Orders</p>
            </div>
            <div className={styles["icon"]} onClick={() => navigate("/chat")}>
                <Message style={{width: "24", height: "24", color: "currentColor"}}/>
                <p>Chat</p>
            </div>
        </div>
    ) 
}

export default Navbar;