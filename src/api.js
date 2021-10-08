import firebase, { db } from './firebase-config';
import { collection, getDocs, getDoc, query, doc, addDoc, deleteDoc, updateDoc, where, orderBy, endAt, startAt } from "firebase/firestore";


// Metodo para guardar usuario
export const saveUser = (id, email, rol, estado) => {

  addDoc(collection(db, 'users'), { id, email, rol, estado });

}

//Metodo para listar un usuario por id
export const ListUser = async (id) => {
  const UserRef = collection(db, "users");

  const q = query(UserRef, where("id", "==", id));

  const querySnapshot = await getDocs(q);

  return querySnapshot;
}

//Metodo para listar todos los usuarios
export const ListUsers = async () => {

  const result = await getDocs(query(collection(db, 'users')));

  return result;
}


//Metodo para realizar busqueda de usuarios por email
export const ListUsersForEmail = async (email) => {

  const UserRef = collection(db, "users");

  const q = query(UserRef, orderBy('email'), startAt(email), endAt(email + '\uf8ff'));

  const querySnapshot = await getDocs(q);

  return querySnapshot;
}


//Metodo para realizar busqueda de usuarios por id
export const ListUsersForID = async (id) => {

  const UserRef = collection(db, "users");

  const q = query(UserRef, orderBy('id'), startAt(id), endAt(id + '\uf8ff'));

  const querySnapshot = await getDocs(q);

  return querySnapshot;
}



