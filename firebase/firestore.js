import { db } from "./firebase";
import { collection, doc, setDoc, getDocs, query, where, Timestamp, orderBy, limit } from "firebase/firestore";

//function that adds a work order to the database
export async function createWorkOrder(order) {
    const ref = doc(collection(db, "Work Orders"));
    await setDoc(ref, {...order, orderId: ref.id});
    return ref.id;
}

//function that adds a work order to the database
export async function createReport(report) {
    const ref = doc(collection(db, "Reports"));
    await setDoc(ref, {...report, reportId: ref.id});
    return ref.id;
}

//function that returns all the work orders for a specific user
export async function getWorkOrders(userId) {
    const q = query(collection(db, "Work Orders"), where("userId", "==", userId));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

//function that returns all the works orders with a specific status
export async function getWorkOrdersByStatus(userId, status) {
    const q = query(collection(db, "Work Orders"), where("userId", "==", userId), where("status", "==", status));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

//function that gets the upcoming work order
export async function getUpcomingWorkOrder(userId) {
    const q = query(
        collection(db, "Work Orders"),
        where("userId", "==", userId),
        where("status", "==", "upcoming"),
        where("time", "<=", Timestamp.now()),
        orderBy("time", "desc"),
        limit(1)
    );

    const snap = await getDocs(q);
    if (snap.empty) return null;

    const d = snap.docs[0];
    return { id: d.id, ...d.data() };
}