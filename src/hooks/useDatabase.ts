import React from "react";

import {
  fetchRealtimeData,
  subscribeRealtimeData,
  writeRealtimeData,
} from "@/services";

type VoidFunc = () => void;

export const useDatabase = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [unsubscribeList, setUnsubscribeList] = React.useState<VoidFunc[]>([]);

  const saveData = React.useCallback(
    async (path: string, data: object | null) => {
      if (isLoading) {
        return;
      }

      setIsLoading(true);

      try {
        await writeRealtimeData(path, data);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading],
  );

  const getData = React.useCallback(
    async <T,>(path: string): Promise<T | null> => {
      if (isLoading) {
        return null;
      }

      setIsLoading(true);

      try {
        return await fetchRealtimeData<T>(path);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading],
  );

  const listenData = React.useCallback(
    <T,>(path: string, callback: (data: T | null) => void) => {
      if (isLoading) {
        return;
      }

      setIsLoading(true);
      const unsubscribe = subscribeRealtimeData<T>(path, callback);

      setUnsubscribeList((previousList) => [...previousList, unsubscribe]);
      setIsLoading(false);
    },
    [isLoading],
  );

  React.useEffect(() => {
    return () => {
      unsubscribeList.forEach((unsubscribe) => {
        unsubscribe();
      });
    };
  }, [unsubscribeList]);

  return { isLoading, saveData, getData, listenData };
};
