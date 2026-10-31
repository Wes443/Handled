import { db } from "./firebase";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where, serverTimestamp } from "firebase/firestore";

//function that adds a work order to the database
export async function createWorkOrder(order) {
    const ref = doc(collection(db, "Work Order"));
    await setDoc(ref, {...order, orderId: ref.id});
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
    const q = query(collection(db, "items"), where("userId", "==", userId), where("status", "==", status));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}