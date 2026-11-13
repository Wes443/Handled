import { useLocation, useNavigate } from "react-router-dom";
import styles from "../css/orderDetails.module.css";
import { useAuth } from "../../firebase/AuthContext";
import Header from "../components/Header";
import Navbar from "../components/Navbar";

function OrderDetails () {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { user, loading } = useAuth();

    if(!state?.order) navigate("/home");

    const date = state.order.time;
    const issue = state.order.issue;
    const priority = state.order.priority;
    const status = state.order.status;
    const orderId = state.order.orderId;
    const entry = state.order.entry;
    const description = state.order.description;
    const images = state.order.images || [];


    const day = date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
    });

    const time = date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
    });

    if(loading) return <p>Loading...</p>;

    return (
        <div className={styles["page"]}>
            <Header user={user} />
            <div className={styles["content"]}>
                <div className={styles["order-box"]}>
                    <p><span style={{color: "var(--hover-text)"}}>OrderId</span> {orderId}</p>
                    <p><span style={{color: "var(--hover-text)"}}>Status</span> {status}</p>
                    <p><span style={{color: "var(--hover-text)"}}>Issue</span> {issue}</p>
                    <p><span style={{color: "var(--hover-text)"}}>Day & Time</span> {day} | {time}</p>
                    <p><span style={{color: "var(--hover-text)"}}>Priority</span> {priority}</p>
                    <p><span style={{color: "var(--hover-text)"}}>Entry</span> {entry}</p>
                    <p style={{color: "var(--hover-text)"}}>Description</p>
                    <p>{description}</p>
                    {images.length > 0 && <>
                        <p style={{color: "var(--hover-text)"}}>Photos</p>
                        <div style={{display: "flex", flexWrap: "wrap", gap: "10px"}}>
                            {images.map((src, i) => (
                                <img
                                    key={i}
                                    src={src}
                                    alt={`Photo ${i + 1} for this order`}
                                    style={{maxWidth: "100%", maxHeight: "300px", borderRadius: "10px", objectFit: "contain"}}
                                />
                            ))}
                        </div>
                    </>}
                </div>
            </div>
            <Navbar />
        </div>
    )
}

export default OrderDetails;
