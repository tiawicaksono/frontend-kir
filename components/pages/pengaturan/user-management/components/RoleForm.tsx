"use client";

import { useState } from "react";
import { Input, Button } from "antd";

interface Props {
  onSuccess?: () => void;
}

export default function RoleForm({ onSuccess }: Props) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    // 🔥 simulate API
    await new Promise((r) => setTimeout(r, 1000));

    setLoading(false);
    onSuccess?.();
  };

  return (
    <div className="space-y-4">
      <Input placeholder="Role Name" />

      <div className="flex justify-end">
        <Button type="primary" loading={loading} onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
}
