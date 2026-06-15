import {
  type DataSnapshot,
  get,
  off,
  onValue,
  ref,
  remove,
  update,
} from "firebase/database";

import { firebaseDb } from "@/lib/firebase";

export const fetchRealtimeData = async <T>(path: string): Promise<T | null> => {
  const dataRef = ref(firebaseDb, path);
  const snapshot = await get(dataRef);

  return snapshot.exists() ? (snapshot.val() as T) : null;
};

export const subscribeRealtimeData = <T>(
  path: string,
  callback: (data: T | null) => void,
): (() => void) => {
  const dataRef = ref(firebaseDb, path);

  const listener = onValue(
    dataRef,
    (snapshot: DataSnapshot) => {
      callback(snapshot.exists() ? (snapshot.val() as T) : null);
    },
    (error) => {
      console.error(`[Firebase RT] Error subscribing at ${path}`, error);
    },
  );

  const unsubscribe = () => {
    off(dataRef, "value", listener);
  };

  return unsubscribe;
};

export const writeRealtimeData = async (
  path: string,
  data: object | null,
): Promise<void> => {
  const dataRef = ref(firebaseDb, path);

  if (!data) {
    await remove(dataRef);
    return;
  }

  await update(dataRef, data);
};
