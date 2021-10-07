import firebase, { db } from './firebase-config';
import { collection, getDocs, getDoc, query, doc, addDoc, deleteDoc, updateDoc, where, orderBy, endAt, startAt } from "firebase/firestore";

export const saveUser = (id, email, rol, estado ) => {
  addDoc(collection(db, 'users'), { id,email,rol,estado });
}

export const ListUser = async (id) => {
  const UserRef = collection(db, "users");

  const q = query(UserRef, where("id", "==", id));

  const querySnapshot = await getDocs(q);

  return querySnapshot;
}

export const ListUsers = async () => {

  const result = await getDocs(query(collection(db, 'users')));

  return result;
}

export const ListUsersForEmail = async (id) => {

  const UserRef = collection(db, "users");

  const q = query(UserRef, orderBy('email'), startAt(id), endAt(id + '\uf8ff'));

  const querySnapshot = await getDocs(q);

  return querySnapshot;
}



