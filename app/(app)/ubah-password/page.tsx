"use client";

import Button from "@/components/form/Button";
import Input from "@/components/form/input/InputField";
import api from "@/services/api";
import { AxiosError } from "axios";
import { useState } from "react";

export default function UbahPasswordPage() {
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await api.post("/user/update-password", {
        old_password: oldPassword,
        new_password: newPassword,
        confirm_password: confirmPassword,
      });
      setSuccess(response.data.message);
    } catch (error: AxiosError | any) {
      setError(error.response?.data.message);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
        <Input
          type="password"
          value={oldPassword}
          onChange={(event) => setOldPassword(event.target.value)}
        />
        <Input
          type="password"
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
        />
        <Input
          type="password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />
        {error && <div className="text-red-600">{error}</div>}
        {success && <div className="text-green-600">{success}</div>}
        <Button type="submit">Ubah Kata Sandi</Button>
      </form>
    </div>
  );
}
