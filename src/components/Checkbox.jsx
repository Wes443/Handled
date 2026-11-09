import styles from "../css/checkbox.module.css";
import { Check, Uncheck } from "../icons";

export default function CheckBox({ reason, checked, label, checkboxToggle }) {
	return (
		<div className={styles["checkbox-container"]}>
			{checked && <Check style={{ width: "24px", height: "24px" }} onClick={() => checkboxToggle(reason)} />}
			{!checked && (
				<Uncheck style={{ width: "20px", height: "20px", margin: "2px" }} onClick={() => checkboxToggle(reason)} />
			)}
			<p>{label}</p>
		</div>
	);
}