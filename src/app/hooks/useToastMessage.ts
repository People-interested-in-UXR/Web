"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

const useToastMessage = <T>(
  defaultValue: T
): [T, Dispatch<SetStateAction<T>>] => {
  const [toastMessage, setToastMessage] = useState<T>(defaultValue);

  useEffect(() => {
    if (toastMessage) {
      setTimeout(() => {
        setToastMessage(defaultValue);
      }, 4000);
    }
  }, [toastMessage, defaultValue]);

  return [toastMessage, setToastMessage] as const;
};

export default useToastMessage;
