import styles from "../css/button.module.css"; 
import { GoogleLogo, Plus, Danger } from "../icons";

export default function Input({text, color, onChange, icon}){
    return (
        <div style={{backgroundColor: color}} className={styles["button"]} onClick={onChange}>
            {icon === "google" && <GoogleLogo style={{width: "24px", height: "24px", color: "var(--container)"}}/>}
            {icon === "plus" && <Plus style={{width: "24px", height: "24px", color: "var(--container)"}}/>}
            {icon === "danger" && <Danger style={{width: "24px", height: "24px", color: "var(--container)", marginTop: "5px"}}/>}
            <p>{text}</p>
        </div>

        
    );
}