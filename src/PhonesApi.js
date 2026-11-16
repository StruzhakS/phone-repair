import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from './firebase';

const phonesRef = collection(db, 'Phones');

// Document id equals the numeric phone id, so ids stay short and sequential
const toPhone = snapshot => ({ ...snapshot.data(), id: Number(snapshot.id) });

export const getPhonesApi = async () => {
  const snapshot = await getDocs(phonesRef);
  return snapshot.docs.map(toPhone);
};

export const getPhoneByIdApi = async id => {
  const snapshot = await getDoc(doc(phonesRef, String(id)));
  return toPhone(snapshot);
};

const getNextId = async () => {
  const snapshot = await getDocs(
    query(phonesRef, orderBy('id', 'desc'), limit(1))
  );
  return snapshot.empty ? 1 : Number(snapshot.docs[0].data().id) + 1;
};

export const addPhoneApi = async phone => {
  const id = await getNextId();
  const data = {
    ...phone,
    id,
    isSold: false,
    soldAt: null,
    addedAt: new Date().toISOString(),
  };
  await setDoc(doc(phonesRef, String(id)), data);
  return { data };
};

export const deletePhoneApi = async id => {
  await deleteDoc(doc(phonesRef, String(id)));
  return id;
};

export const updateModelApi = async changeData => {
  const ref = doc(phonesRef, String(changeData.id));
  const { Model, Price, Detailprice, Sold_for, Note } = changeData.phone;
  await updateDoc(ref, { Model, Price, Detailprice, Sold_for, Note });
  return toPhone(await getDoc(ref));
};

export const updateStatusPhoneApi = async ({ id, check }) => {
  const ref = doc(phonesRef, String(id));
  await updateDoc(ref, {
    isSold: !check,
    soldAt: !check ? new Date().toISOString() : null,
  });
  return toPhone(await getDoc(ref));
};
