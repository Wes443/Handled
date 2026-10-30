import styles from "../css/button.module.css"; 
import { GoogleLogo } from "../icons";

export default function Input({text, color, onChange, icon}){
    return (
        <div style={{backgroundColor: color}} className={styles["button"]} onClick={onChange}>
            {icon === "google" && <GoogleLogo style={{width: "24px", height: "24px", color: "var(--container)"}}/>}
            <p>{text}</p>
        </div>

        
    );
}