import firebase, { db } from './firebase-config';
import { collection, getDocs, getDoc, query, doc, addDoc, deleteDoc, updateDoc, where, orderBy, endAt, startAt, limit } from "firebase/firestore";


// Metodo para guardar usuario
export const saveUser = (id, nombre, email, rol, estado) => {

  addDoc(collection(db, 'users'), { id, nombre, email, rol, estado });
}

//Metodo para listar un usuario por id
export const ListUser = async (id) => {
  const UserRef = collection(db, "users");

  const q = query(UserRef, where("email", "==", id));

  const querySnapshot = await getDocs(q);

  return querySnapshot;
}

//Metodo para listar todos los usuarios
export const ListUsers = async () => {

  const result = await getDocs(query(collection(db, 'users'), orderBy('id')));

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

  const q = query(UserRef, where("id", "==", id));

  const querySnapshot = await getDocs(q);

  return querySnapshot;
}



export const updateUser = async (id, rol, estado) => {

  await updateDoc(doc(db, 'users', id), {rol, estado})
}

// Metodo para crear producto

export const getProducts = async() => {

  const result = await getDocs(query(collection(db, 'Product'), orderBy('id')));

  return result;

 }

export const getProductsDispo = async () => {

  const result = await getDocs(query(collection(db, 'Product'), where("estado", "==", "Disponible")));

  return result;

}

// Metodo para guardar producto
export const saveProduct = (id, codigo, nombre, valorUnitario, estado) => {

  addDoc(collection(db, 'Product'), { id, codigo, nombre, valorUnitario, estado });

}


//Metodo para listar todos los productos
export const listproduct = async () => {

  const result = await getDocs(query(collection(db, 'Product')));

  return result;
}

//Metodo para realizar busqueda de productos por nombre

export const ListProductsForName = async (nombre) => {

  const UserRef = collection(db, "Product");

  const q = query(UserRef, orderBy('nombre'), startAt(nombre), endAt(nombre + '\uf8ff'));

  const querySnapshot = await getDocs(q);

  return querySnapshot;
}


//Metodo para realizar busqueda de productos por id
export const ListProductsForID = async (id) => {

  const UserRef = collection(db, "Product");

  const q = query(UserRef, where("id", "==", id));

  const querySnapshot = await getDocs(q);
  console.log(querySnapshot.docs);
  return querySnapshot;
}

export const updateProducto = async (id, codigo, nombre, valorUnitario, estado) => {

  await updateDoc(doc(db, 'Product', id), {codigo, nombre, valorUnitario, estado})
}

//Metodo para listar todos las ventas
export const ListSales = async () => {

  const result = await getDocs(query(collection(db, 'sales'), orderBy('id')));

  return result;
}

// export const ListSales2 = async () => {

//   const result = await getDocs(query(collection(db, 'sales')));

//   var data = [];
//   result.forEach((doc) => {
//     data.push({id: doc.data().id,x:doc.data().fecha, y: doc.data().valorTotal});
//   });

//   return data;
// }

//Metodo para realizar busqueda de productos por id
export const ListProductsVendor= async () => {

  const UserRef = collection(db, "users");

  const q = query(UserRef, where("rol", "==", "Vendedor"));

  const querySnapshot = await getDocs(q);

  return querySnapshot;
}

//Metodo para realizar busqueda de productos por id
export const ListProductsCash = async (id) => {

  const UserRef = collection(db, "Product");

  const q = query(UserRef, where("nombre", "==", id));

  const querySnapshot = await getDocs(q);

  return querySnapshot;
}

// Metodo para guardar venta
export const saveSale = (id, nombreCliente, documentoCliente, fecha, encargado, productos, valorTotal) => {

  addDoc(collection(db, 'sales'), { id, nombreCliente, documentoCliente, fecha, encargado, productos, valorTotal });
}

//Metodo para listar todas las ventas
export const listSales = async () => {

  const result = await getDocs(query(collection(db, 'sales')));

  return result;
}

//Metodo para realizar busqueda de venta por id
export const ListSalesForID = async (id) => {

  const UserRef = collection(db, "sales");

  const q = query(UserRef, where("id", "==", id));

  const querySnapshot = await getDocs(q);

  return querySnapshot;
}

//Metodo para realizar busqueda de venta por nombre del cliente

export const ListSalesForNC = async (nombreCliente) => {

  const UserRef = collection(db, "sales");

  const q = query(UserRef, orderBy('nombreCliente'), startAt(nombreCliente), endAt(nombreCliente + '\uf8ff'));

  const querySnapshot = await getDocs(q);

  return querySnapshot;
}

//Metodo para realizar busqueda de venta por docuemnto del cliente

export const ListSalesForDC = async (documentoCliente) => {

  const UserRef = collection(db, "sales");

  const q = query(UserRef, orderBy('documentoCliente'), startAt(documentoCliente), endAt(documentoCliente + '\uf8ff'));

  const querySnapshot = await getDocs(q);

  return querySnapshot;
}

export const updateSales = async (id, nombreCliente, documentoCliente, fecha, encargado, productos, valorTotal ) => {

  await updateDoc(doc(db, 'sales', id), {nombreCliente, documentoCliente, fecha, encargado, productos, valorTotal })

}