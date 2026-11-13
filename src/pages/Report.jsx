import { useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import CheckBox from "../components/Checkbox";
import { useAuth } from "../../firebase/AuthContext";
import Button from "../components/Button";
import { createReport } from "../../firebase/firestore";
import styles from "../css/report.module.css";
import { Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Report(){
    const { user, loading } = useAuth();
    const [ reasons, setReasons ] = useState([]);
    const [ description, setDescription ] = useState("");

    const navigate = useNavigate();

	//a function that adds or removes a reason from the useState
	function toggleReason(reason) {
		setReasons((prev) => (prev.includes(reason) ? prev.filter((r) => r !== reason) : [...prev, reason]));
	}

    const handleSubmit = async() => {
        try{
            await createReport({
                description: description,
                reasons: reasons,
                userId: user.uid,
                time: Timestamp.now(),
            })

            navigate("/home", {replace: true});
        }catch(error){
            console.log(error)
        }
    }

    const uploadImage = async() => {

    }

    if (loading) return <p>loading...</p>
    return (
        <div className={styles["page"]}>
            <Header user={user}/>
            <div className={styles["content"]}>
                <div className={styles["report-box"]}>
                    <p style={{color: "var(--default-text)"}}>What is the reason for your report?</p>
                    <CheckBox reason="StolenProperty" checked={reasons.includes("StolenProperty")} label="Stolen property" checkboxToggle={toggleReason} />
                    <CheckBox reason="BrokenAppliance" checked={reasons.includes("BrokenAppliance")} label="Broken appliance" checkboxToggle={toggleReason} />
                    <CheckBox reason="MaintenanceBehavior" checked={reasons.includes("MaintenanceBehavior")} label="Maintenance behavior" checkboxToggle={toggleReason} />
                    <CheckBox reason="MaintenanceAbsent" checked={reasons.includes("MaintenanceAbsent")} label="Maintenance never arrived" checkboxToggle={toggleReason} />
                    <CheckBox reason="Other" checked={reasons.includes("Other")} label="Other" checkboxToggle={toggleReason} />
                    <textarea
                        className={styles["textbox"]}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="start typing..."
                    />
                    <Button text="upload image" color="var(--container)" onChange={uploadImage} icon="upload"/>
                    <Button text={"Submit"} color={"var(--btn-1)"} onChange={handleSubmit} />
                </div>
                
            </div>
            <Navbar />
        </div>
    );
}

export default Report;