import { useState } from "react";
import styles from "../css/createOrder.module.css";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import { useAuth } from "../../firebase/AuthContext";
import { Dropdown, DateTimeField } from "../components/Dropdown";
import { createWorkOrder } from "../../firebase/firestore";
import { Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function CreateOrder(){
    const { user, loading } = useAuth();
    const [ priority, setPriority] = useState("");
    const [ reason, setReason ] = useState("");
    const [ dateTime, setDateTime ] = useState("");
    const [ entry, setEntry ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ review, setReview ] = useState(false);
    const [ error, setError] = useState("");
    const navigate = useNavigate();

    const priorities = [
        { value: "low", label: "Low" },
        { value: "medium", label: "Medium" },
        { value: "high", label: "High" },
    ];

    const reasons = [
        { value: "Lighting", label: "Lighting" },
        { value: "Plumbing", label: "Plumbing" },
        { value: "HVAC", label: "HVAC" },
        { value: "Electrical", label: "Electrical" },
        { value: "Appliance", label: "Appliance" },
        { value: "Pest control", label: "Pest" },
        { value: "Lock & Keys", label: "Lock & Keys" },
        { value: "Doors & Windows", label: "Doors & Windows" },
    ];

    const entries = [
        { value: "Anytime", label: "Anytime" },
        { value: "Home", label: "Only when I'm home" },
        { value: "Call", label: "Call before entering" },
    ];

    function checkFields() {
        if ([priority, reason, dateTime, entry].every((field) => field !== "")){
            setReview(true)
        }else{
            setError("Missing required fields!")
        }
    }

    function formatDateTime(value) {
        if (!value) return "";
        const d = new Date(value);

        const datePart = d.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
        });

        const timePart = d.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
        });

        return `${datePart} | ${timePart}`;
    }

    const submitOrder = async() => {
        try{
            await createWorkOrder({
                description: description,
                entry: entry,
                issue: reason,
                priority: priority,
                status: "pending",
                userId: user.uid,
                time: Timestamp.fromDate(new Date(dateTime))
            })
            
            navigate("/home", {replace: true});

        }catch(error){
            console.log(error);
            setError("An error occured");
        }
    }

    if (loading) return <p>Loading...</p>;

    return (
        <div className={styles["page"]}>
            <Header user={user} />

            {!review && <div className={styles["content"]}>
                <Dropdown 
                    options={priorities} 
                    value={priority} 
                    onChange={setPriority} 
                    placeholder="Select a priority" 
                />

                <Dropdown 
                    options={reasons} 
                    value={reason} 
                    onChange={setReason} 
                    placeholder="Select a reason"
                />

                <Dropdown 
                    options={entries} 
                    value={entry} 
                    onChange={setEntry} 
                    placeholder="Select an entry type"
                />

                <DateTimeField value={dateTime} onChange={setDateTime} />

                <textarea
                    className={styles["textbox"]}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the issue..."
                />

                <Button text="review" color="var(--btn-1)" onChange={() => checkFields()} />

                {error && <p style={{color: "var(--btn-2)", alignSelf: "center"}}>{error}</p>}

            </div>}

            {review && <div className={styles["content"]}>
                  <p style={{color: "var(--default-text)", fontSize: "24px", paddingLeft: "10px"}}>Review your order</p>
                  <div className={styles["review-box"]}>
                    <p><span style={{color: "var(--hover-text)"}}>Priority: </span>{priority}</p>
                    <p><span style={{color: "var(--hover-text)"}}>Reason: </span> {reason}</p>
                    <p><span style={{color: "var(--hover-text)"}}>Day & Time: </span> {formatDateTime(dateTime)}</p>
                    <p><span style={{color: "var(--hover-text)"}}>Entry: </span>{entry}</p>
                    <p style={{color: "var(--hover-text)"}}>Notes</p>
                    <p>{description}</p>
                  </div>

                  <Button text="submit" color="var(--btn-1)" onChange={submitOrder} />
                  <Button text="edit order" color="var(--pill)" onChange={() => setReview(false)} />
                  {error && <p style={{color: "var(--btn-2)", alignSelf: "center"}}>{error}</p>}
            </div>}
            <Navbar />
        </div>
    );
}

export default CreateOrder;