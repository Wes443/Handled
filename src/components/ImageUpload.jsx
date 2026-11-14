import { useRef, useState } from "react";
import Button from "./Button";
import styles from "../css/imageUpload.module.css";
import { compressImage, MAX_IMAGES, MAX_TOTAL_SIZE } from "../functions/imageUtils";

// Upload button + photo previews.
// On phones, the picker offers the camera or photo library.
// On desktop, it opens a normal file browser.
export default function ImageUpload({ images, onChange }) {
    const inputRef = useRef(null);
    const [error, setError] = useState("");
    const [processing, setProcessing] = useState(false);

    const isFull = images.length >= MAX_IMAGES;

    const openPicker = () => {
        if (processing || isFull) return;
        setError("");
        inputRef.current?.click();
    };

    const handleFiles = async (e) => {
        const files = Array.from(e.target.files || []);
        e.target.value = ""; // lets the same photo be picked again later
        if (files.length === 0) return;

        const messages = [];
        const room = MAX_IMAGES - images.length;
        const toAdd = files.slice(0, room);
        if (files.length > room) {
            messages.push(`You can attach up to ${MAX_IMAGES} photos.`);
        }

        setProcessing(true);
        const compressed = [];
        let failed = 0;
        for (const file of toAdd) {
            try {
                compressed.push(await compressImage(file));
            } catch {
                failed++;
            }
        }
        setProcessing(false);

        if (failed > 0) {
            messages.push("Some photos couldn't be read. Try a JPG or PNG.");
        }

        const next = [...images];
        let total = next.reduce((sum, img) => sum + img.length, 0);
        for (const img of compressed) {
            if (total + img.length > MAX_TOTAL_SIZE) {
                messages.push("Those photos are too large together. Try removing one.");
                break;
            }
            next.push(img);
            total += img.length;
        }

        onChange(next);
        setError(messages.join(" "));
    };

    const removeImage = (index) => {
        onChange(images.filter((_, i) => i !== index));
        setError("");
    };

    let buttonText = "upload image";
    if (processing) buttonText = "processing...";
    else if (isFull) buttonText = `photo limit reached (${MAX_IMAGES}/${MAX_IMAGES})`;
    else if (images.length > 0) buttonText = `add another image (${images.length}/${MAX_IMAGES})`;

    return (
        <div className={styles["wrapper"]}>
            <input
                ref={inputRef}
                className={styles["hidden-input"]}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFiles}
            />

            {images.length > 0 && (
                <div className={styles["previews"]}>
                    {images.map((src, i) => (
                        <div key={i} className={styles["thumb"]}>
                            <img src={src} alt={`Attached photo ${i + 1}`} />
                            <button
                                type="button"
                                className={styles["remove"]}
                                onClick={() => removeImage(i)}
                                aria-label={`Remove photo ${i + 1}`}
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <Button text={buttonText} color="var(--brand-dark)" onChange={openPicker} icon="upload" />

            {error && <p className={styles["error"]}>{error}</p>}
        </div>
    );
}
