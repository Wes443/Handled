import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import WorkOrder from "../components/WorkOrder";
import Button from "../components/Button";
import styles from "../css/home.module.css";
import { useAuth } from "../../firebase/AuthContext";
import { getUpcomingWorkOrder, getWorkOrdersByStatus } from "../../firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Down, Plus, Danger, Recurring } from "../icons";

function Home(){
    const { user, loading } = useAuth();
    const [upcomingOrder, setUpcomingOrder] = useState(null);
    const [pendingOrders, setPendingOrders] = useState([]);
    const [loadingData, setLoadingData] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || loading) return;

        const loadOrders = async () => {
            try {
                const [upcoming, pending] = await Promise.all([
                    getUpcomingWorkOrder(user.uid),
                    getWorkOrdersByStatus(user.uid, "pending"),
                ]);
                setUpcomingOrder(upcoming);
                setPendingOrders(pending ?? []);
            } catch (error) {
                console.log("failed to load orders", error);
            } finally {
                setLoadingData(false);
            }
        };

        loadOrders();
    }, [user, loading]);

    if (loading || loadingData) return <p>Loading...</p>;

    const upcomingDate = upcomingOrder?.time?.toDate?.();
    const heroDay = upcomingDate?.toLocaleDateString("en-US", { weekday: "long" });
    const heroTime = upcomingDate?.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
    const firstName = user?.displayName?.trim().split(/\s+/)[0];

    return (
        <div className={styles["page"]}>
            <Header user={user} />
            <div className={styles["content"]}>
                <div>
                    <p style={{color: "var(--hover-text)", fontSize: "14px"}}>Welcome back</p>
                    <p style={{color: "var(--default-text)", fontSize: "26px", fontWeight: 750, letterSpacing: "-0.02em"}}>{firstName ? `Hi, ${firstName}` : "Hi there"}</p>
                </div>

                <div className={styles["upcoming"]}>
                    {upcomingDate ? (
                        <div className={styles["hero"]}>
                            <p className={styles["heroLabel"]}>Upcoming visit</p>
                            <p className={styles["heroBig"]}>{heroDay}, {heroTime}</p>
                            <p className={styles["heroSub"]}>{upcomingOrder.issue}</p>
                            <div className={styles["heroRow"]}>
                                <span className={styles["heroChip"]}>Priority: {upcomingOrder.priority}</span>
                            </div>
                        </div>
                    ) : (
                        <p style={{color: "var(--hover-text)"}}>nothing to see here...</p>
                    )}
                </div>

                <div className={styles["actions"]}>
                    <button className={styles["act"]} onClick={() => navigate("/create-order")}>
                        <Plus className={styles["actIcon"]} style={{color: "var(--brand-dark)"}} /><span>New request</span>
                    </button>
                    <button className={styles["act"]} onClick={() => navigate("/report-issue")}>
                        <Danger className={styles["actIcon"]} style={{color: "var(--btn-2)"}} /><span>Report issue</span>
                    </button>
                    <button className={styles["act"]} onClick={() => navigate("/report-recurring-issue")}>
                        <Recurring className={styles["actIcon"]} style={{color: "#B77300"}} /><span>Keeps happening</span>
                    </button>
                </div>

                <div className={styles["pending"]}>
                    <span className={styles["sectionHead"]} onClick={() => navigate("/pending-orders")}>
                        <p>Pending</p>
                        <Down style={{width: "20", height: "20", color: "var(--hover-text)", transform: "rotate(270deg)"}} />
                    </span>

                    {pendingOrders.length === 0 && <p style={{color: "var(--hover-text)"}}>nothing to see here...</p>}
                    <div className={styles["orders"]}>
                        {pendingOrders && pendingOrders.map(order => (
                            <WorkOrder key={order.id} order={order} />
                        ))}
                    </div>
                </div>
            </div>
            <Navbar />
        </div>
    )
}

export default Home;
