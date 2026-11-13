import styles from "../css/button.module.css";
import { GoogleLogo, Plus, Danger, Upload, Recurring } from "../icons";

export default function Button({ text, color, onChange, icon }) {
    return (
        <button
            type="button"
            style={{ backgroundColor: color }}
            className={styles.button}
            onClick={onChange}
        >
            {icon === "google" && (
                <GoogleLogo style={{ width: "24px", height: "24px", color: "var(--container)" }} />
            )}
            {icon === "plus" && (
                <Plus style={{ width: "24px", height: "24px", color: "var(--container)" }} />
            )}
            {icon === "danger" && (
                <Danger style={{ width: "24px", height: "24px", color: "var(--container)", marginTop: "5px" }} />
            )}
            {icon === "upload" && (
                <Upload style={{ width: "24px", height: "24px", color: "var(--container)" }} />
            )}
            {icon === "recurring" && (
                <Recurring style={{ width: "24px", height: "24px", color: "var(--default-text)" }} />
            )}
            <span>{text}</span>
        </button>
    );
}
