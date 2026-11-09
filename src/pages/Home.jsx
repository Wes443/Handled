import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import WorkOrder from "../components/WorkOrder";
import Button from "../components/Button";
import styles from "../css/home.module.css";
import { useAuth } from "../../firebase/AuthContext";
import { getUpcomingWorkOrder, getWorkOrdersByStatus } from "../../firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Down } from "../icons";

function Home(){
    const { user, loading } = useAuth();
    const [upcomingOrder, setUpcomingOrder] = useState(null);
    const [pendingOrders, setPendingOrders] = useState(null);
    const [loadingData, setLoadingData] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || loading) return;

        const getUpcoming = async() => {
            try{
                const upcoming = await getUpcomingWorkOrder(user.uid);
                setUpcomingOrder(upcoming);

            }catch(error){
                console.log("failed to load upcoming order", error);

            }finally{
                setLoadingData(false);
            }
        }

        getUpcoming();

    }, [user, loading]);

    useEffect(() => {
        if (!user || loading) return;

        const getPending = async() => {
            try{
                const pending = await getWorkOrdersByStatus(user.uid, "pending");
                setPendingOrders(pending);

            }catch(error){
                console.log("failed to load pending orders", error);

            }finally{
                setLoadingData(false);
            }
        }

        getPending();

    }, [user, loading]);

    if (loading || loadingData || !upcomingOrder || !pendingOrders) return <p>Loading...</p>;

    return (
        <div className={styles["page"]}>
            <Header user={user} />
            <div className={styles["content"]}>
                <div className={styles["upcoming"]}>
                    <p style={{color: "var(--hover-text)", paddingLeft: "5px"}}>Upcoming Visit</p>
                    {upcomingOrder && <WorkOrder order={upcomingOrder} />}
                    {upcomingOrder == null && <p style={{color: "var(--default-text)", paddingLeft: "5px"}}>nothing to see here...</p>}
                </div>
                
                <div className={styles["pending"]}>
                    <span style={{display: "flex", justifyContent: "space-between"}}>
                        <p style={{color: "var(--hover-text)", paddingLeft: "5px"}}>Pending Orders</p>
                        <Down style={{width: "20", height: "20", color: "var(--hover-text)", transform: "rotate(270deg)"}} />
                    </span>

                    {pendingOrders.length === 0 && <p style={{color: "var(--default-text)", paddingLeft: "5px"}}>nothing to see here...</p>}
                    {pendingOrders && pendingOrders.map(order => (
                        <WorkOrder key={order.id} order={order} />
                    ))}
                </div>

                <Button text="create work order" color="var(--btn-1)" onChange={() => navigate("/create-order")} icon="plus" />
                <Button text="report issue" color="var(--btn-2)" onChange={() => navigate("/report-issue")} icon="danger" />
                <Button text="report recurring issue" color="var(--btn-2)" onChange={() => navigate("/report-recurring-issue")} icon="recurring" />
            </div>
            <Navbar />
        </div>
    )
}

export default Home;