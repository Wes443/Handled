import { useState, useEffect, useRef } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { getInitials } from "../functions/functions";
import styles from "../css/header.module.css";
import { Down } from "../icons";
import { useNavigate } from "react-router-dom";

function Header({user}) {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    // close the menu when clicking anywhere outside it
    useEffect(() => {
        if (!menuOpen) return;

        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [menuOpen]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate("/", { replace: true });
        } catch (error) {
            console.log("failed to log out", error);
        }
    };

    return (
        <div className={styles["bar"]}>
            <div onClick={() => navigate(-1)}><Down style={{color: "var(--default-text)", transform: "rotate(90deg)"}}/></div>

            <div className={styles["profile"]} ref={menuRef}>
                <div className={styles["pfp"]} onClick={() => setMenuOpen(!menuOpen)}>
                    <p>{getInitials(user)}</p>
                </div>

                {menuOpen && (
                    <div className={styles["menu"]}>
                        <p className={styles["menu-email"]}>{user?.email}</p>
                        <button className={styles["menu-item"]} onClick={handleLogout}>
                            Log out
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Header;