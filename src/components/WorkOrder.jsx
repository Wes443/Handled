import { useNavigate } from "react-router-dom";
import styles from "../css/order.module.css";

export default function WorkOrder({order}){
    const date = order?.time.toDate();
    const issue = order?.issue;
    const priority = order?.priority;
    const navigate = useNavigate();

    const day = date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
    });

    const time = date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
    });

    return (
        <div className={styles["order"]} onClick={() => navigate("/order-details", {state: { order: {...order, time: order.time.toDate()}, from: "any" }})}>
            <div style={{display: "flex", flexDirection: "column"}}>
                <p>{day} | {time}</p>
                <p>issue: {issue}</p>
            </div>
            <div className={styles["pill"]} style={{backgroundColor: priority == "medium" || priority == "low" ? "var(--pill)" : "var(--btn-2)"}}>
                <p>{priority}</p>
            </div>
        </div>
    );
}
