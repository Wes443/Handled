import styles from "../css/recurringReport.module.css";
import { useAuth } from "../../firebase/AuthContext";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { Dropdown } from "../components/Dropdown";
import { useState } from "react";
import Button from "../components/Button";
import { createRecurringReport } from "../../firebase/firestore";

function RecurringReport() {
    const { user, loading } = useAuth();
    const [ number, setNumber ] = useState("");
    const [ description, setDescription ] = useState("");

    const numbers = [
        { value: "1", label: "1" },
        { value: "2", label: "2" },
        { value: "3", label: "3" },
        { value: "4", label: "4" },
        { value: "5+", label: "5+" },
    ];

    const uploadImage = async() => {

    }

    const handleSubmit = async() => {
        try{
            await createRecurringReport({
                description: description,
                number: number,
                userId: user.uid,
                time: Timestamp.now(),
            })

            navigate("/home", {replace: true});
        }catch(error){
            console.log(error)
        }
    }

    if(loading) return <p>loading...</p>

    return(
        <div className={styles["page"]}>
            <Header user={user} />
            <div className={styles["content"]}>
                <div className={styles["number"]}>
                    <p>How many times has this issue occured?</p>
                    <Dropdown options={numbers} value={number} onChange={setNumber} placeholder="0" />
                </div>
                <textarea
                    className={styles["textbox"]}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the recurrence..."
                />
                <Button text="upload image" color="var(--container)" onChange={uploadImage} icon="upload"/>
                <Button text="submit" color="var(--btn-1)" onChange={handleSubmit} />
            </div>
            <Navbar />
        </div>
    );
}

export default RecurringReport;