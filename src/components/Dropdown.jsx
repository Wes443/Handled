import { useState, useRef, useEffect } from "react";
import "../css/dropdown.css";
import { Down } from "../icons";

export function Dropdown({ options, value, onChange, placeholder = "Select..." }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    const selected = options.find((o) => o.value === value);

    useEffect(() => {
        function handleClick(e) {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        }

        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    function choose(option) {
        onChange(option.value);
        setOpen(false);
    }

    return (
        <div className="dropdown" ref={ref}>
            <button className="dropdown-trigger" onClick={() => setOpen((o) => !o)}>
                {selected ? selected.label : placeholder}
                <Down style={{width: "20", height: "20", color: "var(--default-text)"}} />
            </button>

            {open && (
                <ul className="dropdown-menu" role="listbox">
                    {options.map((opt) => (
                        <li
                            key={opt.value}
                            role="option"
                            className={"dropdown-option" + (opt.value === value ? " selected" : "")}
                            onClick={() => choose(opt)}
                        >
                        {opt.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export function DateTimeField({ value, onChange, placeholder = "Pick a date and time" }) {
    const inputRef = useRef(null);

    function openPicker() {
        const input = inputRef.current;
        if (!input) return;
        try {
            input.showPicker();

        } catch {
            input.focus(); // fallback for browsers without showPicker
            input.click();
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

    const display = value ? formatDateTime(value) : placeholder;

    return (
        <div className="datetime-field">
            <button className="datetime-trigger" onClick={openPicker}>
                {display}
                <Down style={{width: "20", height: "20", color: "var(--default-text)"}} />
            </button>

            <input
                ref={inputRef}
                type="datetime-local"
                className="datetime-input"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                tabIndex={-1}
                aria-hidden="true"
            />
        </div>
    );
}