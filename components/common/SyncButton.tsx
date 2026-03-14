"use client";

import { useState } from "react";

interface Props {
  onSync: () => Promise<void>;
}

export default function SyncButton({ onSync }: Props) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    try {
      setLoading(true);
      await onSync();
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="text-xs px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
    >
      Sinkron
    </button>
  );
}
