import styles from "../css/myOrders.module.css";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { useAuth } from "../../firebase/AuthContext";
import { useState, useEffect } from "react";
import { getWorkOrdersByStatus } from "../../firebase/firestore";
import WorkOrder from "../components/WorkOrder";

function UpcomingOrders() {
    const { user, loading } = useAuth();
    const [ loadingData, setLoadingData ] = useState(true);
    const [ upcomingOrders, setUpcomingOrders] = useState(null);

    useEffect(() => {
        if(!user || loading) return;

        const loadData = async() => {
            try{
                const pending = await getWorkOrdersByStatus(user.uid, "upcoming");
                setUpcomingOrders(pending);

            }catch(error){
                console.log("failed to load orders", error);

            }finally{
                setLoadingData(false);
            }
        }

        loadData();

    }, [user, loading])

    if(loading || loadingData) return <p>loading...</p>
    return(
        <div className={styles["page"]}>
            <Header user={user} />
            <div className={styles["content"]}>
                <div className={styles["orders-box"]}>
                    <p style={{color: "var(--hover-text)", paddingLeft: "5px"}}>Upcoming Orders</p>
        
                    {upcomingOrders.length === 0 && <p style={{color: "var(--default-text)", paddingLeft: "5px"}}>nothing to see here...</p>}

                    <div className={styles["orders"]}>
                        {upcomingOrders && upcomingOrders.map(order => (
                            <WorkOrder key={order.id} order={order} />
                        ))}
                    </div>
                </div>
            </div>
            <Navbar />
        </div>
    )
}

export default UpcomingOrders;