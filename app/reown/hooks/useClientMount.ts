'use client'
import { useEffect, useState, useRef } from "react";

export function useClientMounted() {
  const [mounted, setMounted] = useState(false);
  const isMountedRef = useRef(false);

  useEffect(() => {
    if (!isMountedRef.current) {
      isMountedRef.current = true;
      // 使用 setTimeout 将 setState 放入事件队列，确保异步执行
      setTimeout(() => setMounted(true), 0);
    }
  }, []); // Runs only on mount

  return mounted;
}