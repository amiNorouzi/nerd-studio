"use client";

import { useState } from "react";
import { useGetDictionary } from "@/hooks/useGetDictionary";

export function TestClient() {
  const [number, setNumber] = useState(0);
  const { page } = useGetDictionary();
  return (
    <div>
      {number}
      <button onClick={() => setNumber(prev => prev + 1)}>add</button>
      <button onClick={() => setNumber(prev => prev - 1)}>hello</button>
      <p>{page.home.title}</p>
    </div>
  );
}
