import styles from "../css/myOrders.module.css";
import { useAuth } from "../../firebase/AuthContext";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { getWorkOrdersByStatus } from "../../firebase/firestore";
import WorkOrder from "../components/WorkOrder";
import { Down } from "../icons";
import { useNavigate } from "react-router-dom";

function Orders(){
    const { user, loading } = useAuth();
    const [ loadingData, setLoadingData ] = useState(true);
    const [ upcomingOrders, setUpcomingOrders] = useState(null);
    const [ pendingOrders, setPendingOrders] = useState(null);
    const [ pastOrders, setPastOrders] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if(!user || loading) return;

        const loadData = async() => {
            try{
                const upcoming = await getWorkOrdersByStatus(user.uid, "upcoming");
                setUpcomingOrders(upcoming);

                const pending = await getWorkOrdersByStatus(user.uid, "pending");
                setPendingOrders(pending);

                const past = await getWorkOrdersByStatus(user.uid, "past");
                setPastOrders(past);

            }catch(error){
                console.log("failed to load orders", error);

            }finally{
                setLoadingData(false);
            }
        }

        loadData();

    }, [user, loading])

    if (loading || loadingData) return <p>Loading...</p>;

    return(
        <div className={styles["page"]}>
            <Header user={user} />
            <div className={styles["content"]}>
                <div className={styles["orders-box"]}>
                    <span style={{display: "flex", justifyContent: "space-between"}} onClick={() => navigate("/upcoming-orders")}>
                        <p style={{color: "var(--hover-text)", paddingLeft: "5px"}}>Upcoming Orders</p>
                        <Down style={{width: "20", height: "20", color: "var(--hover-text)", transform: "rotate(270deg)"}} />
                    </span>
                        
                    {upcomingOrders.length === 0 && <p style={{color: "var(--default-text)", paddingLeft: "5px"}}>nothing to see here...</p>}

                    <div className={styles["orders"]}>
                        {upcomingOrders && upcomingOrders.map(order => (
                            <WorkOrder key={order.id} order={order} />
                        ))}
                    </div>
                </div>

                <div className={styles["orders-box"]}>
                    <span style={{display: "flex", justifyContent: "space-between"}} onClick={() => navigate("/pending-orders")}>
                        <p style={{color: "var(--hover-text)", paddingLeft: "5px"}}>Pending Orders</p>
                        <Down style={{width: "20", height: "20", color: "var(--hover-text)", transform: "rotate(270deg)"}} />
                    </span>
                        
                    {pendingOrders.length === 0 && <p style={{color: "var(--default-text)", paddingLeft: "5px"}}>nothing to see here...</p>}

                    <div className={styles["orders"]}>
                        {pendingOrders && pendingOrders.map(order => (
                            <WorkOrder key={order.id} order={order} />
                        ))}
                    </div>
                </div>

                <div className={styles["orders-box"]}>
                    <span style={{display: "flex", justifyContent: "space-between"}} onClick={() => navigate("/past-orders")}>
                        <p style={{color: "var(--hover-text)", paddingLeft: "5px"}}>Past Orders</p>
                        <Down style={{width: "20", height: "20", color: "var(--hover-text)", transform: "rotate(270deg)"}} />
                    </span>
                        
                    {pastOrders.length === 0 && <p style={{color: "var(--default-text)", paddingLeft: "5px"}}>nothing to see here...</p>}

                    <div className={styles["orders"]}>
                        {pastOrders && pastOrders.map(order => (
                            <WorkOrder key={order.id} order={order} />
                        ))}
                    </div>
                </div>
            </div>
            <Navbar />
        </div>
    )
}

export default Orders;