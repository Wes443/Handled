import styles from "../css/myOrders.module.css";
import { useAuth } from "../../firebase/AuthContext";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { getWorkOrdersByStatus } from "../../firebase/firestore";
import WorkOrder from "../components/WorkOrder";

function Orders(){
    const { user, loading } = useAuth();
    const [ loadingData, setLoadingData ] = useState(true);
    const [ upcomingOrders, setUpcomingOrders] = useState(null);
    const [ pendingOrders, setPendingOrders] = useState(null);
    const [ pastOrders, setPastOrders] = useState(null);

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
                    <p style={{color: "var(--hover-text)", paddingLeft: "5px"}}>Upcoming Orders</p>
                        
                    {upcomingOrders.length === 0 && <p style={{color: "var(--default-text)", paddingLeft: "5px"}}>nothing to see here...</p>}
                    {upcomingOrders && upcomingOrders.map(order => (
                        <WorkOrder key={order.id} order={order} />
                    ))}
                </div>

                <div className={styles["orders-box"]}>
                    <p style={{color: "var(--hover-text)", paddingLeft: "5px"}}>Pending Orders</p>
                        
                    {pendingOrders.length === 0 && <p style={{color: "var(--default-text)", paddingLeft: "5px"}}>nothing to see here...</p>}
                    {pendingOrders && pendingOrders.map(order => (
                        <WorkOrder key={order.id} order={order} />
                    ))}
                </div>

                <div className={styles["orders-box"]}>
                    <p style={{color: "var(--hover-text)", paddingLeft: "5px"}}>Past Orders</p>
                        
                    {pastOrders.length === 0 && <p style={{color: "var(--default-text)", paddingLeft: "5px"}}>nothing to see here...</p>}
                    {pastOrders && pastOrders.map(order => (
                        <WorkOrder key={order.id} order={order} />
                    ))}
                </div>
            </div>
            <Navbar />
        </div>
    )
}

export default Orders;