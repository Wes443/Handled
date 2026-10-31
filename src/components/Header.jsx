import { getInitials } from "../functions/functions";
import styles from "../css/header.module.css";
import { Down } from "../icons";
import { useNavigate } from "react-router-dom";

function Header({user}) {
    const navigate = useNavigate();

    return (
        <div className={styles["bar"]}>
            <div onClick={() => navigate("/home", {replace: true})}><Down style={{color: "var(--default-text)", transform: "rotate(90deg)"}}/></div>
            <div className={styles["pfp"]}>
                <p>{getInitials(user)}</p>
            </div>
        </div>
    );
}

export default Header;