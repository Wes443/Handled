//function that gets the initials of the user or the user's email (fallback)
export function getInitials(user) {
    const name = user?.displayName?.trim();

    if (name) {
        const parts = name.split(/\s+/);
        const first = parts[0][0];
        const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
        return (first + last).toUpperCase();
    }

    //fallback
    const email = user?.email;
    if (email) return email[0].toUpperCase();

    return "?";
}