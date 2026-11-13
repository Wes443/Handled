// Helpers for attaching photos to work orders and reports.
// Photos are shrunk in the browser and stored as text (data URLs) inside the
// Firestore document, so no Firebase Storage / billing is needed.
// Firestore documents max out at 1 MiB, so we cap the count and total size.

export const MAX_IMAGES = 3;
export const MAX_TOTAL_SIZE = 900_000; // characters, leaves room for the other fields
const MAX_SINGLE_SIZE = 300_000;

// load a File into an <img> so it can be drawn on a canvas
function loadImage(file) {
    return new Promise((resolve, reject) => {
        const url = URL.createObjectURL(file);
        const img = new Image();
        img.onload = () => {
            URL.revokeObjectURL(url);
            resolve(img);
        };
        img.onerror = () => {
            URL.revokeObjectURL(url);
            reject(new Error("Could not read image"));
        };
        img.src = url;
    });
}

// draw the image at a smaller size and export it as a JPEG data URL
function render(img, maxDimension, quality) {
    const width = img.naturalWidth;
    const height = img.naturalHeight;
    const scale = Math.min(1, maxDimension / Math.max(width, height));
    const w = Math.round(width * scale);
    const h = Math.round(height * scale);

    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;

    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ffffff"; // so transparent PNGs don't turn black
    ctx.fillRect(0, 0, w, h);
    ctx.drawImage(img, 0, 0, w, h);

    return canvas.toDataURL("image/jpeg", quality);
}

// shrink a photo until it fits under MAX_SINGLE_SIZE
export async function compressImage(file) {
    const img = await loadImage(file);

    const attempts = [
        [1000, 0.7],
        [1000, 0.5],
        [800, 0.5],
        [600, 0.5],
    ];

    let result = "";
    for (const [maxDimension, quality] of attempts) {
        result = render(img, maxDimension, quality);
        if (result.length <= MAX_SINGLE_SIZE) break;
    }
    return result;
}