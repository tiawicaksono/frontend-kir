"use client";

import { useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import LoadingButton from "@/components/common/LoadingButton";
import PasswordInput from "@/components/form/form-elements/PasswordField";
import PasswordStrengthIndicator from "@/components/common/PasswordStrengthIndicator";
import { getPasswordStrength } from "@/utils/validatePassword";
import api from "@/services/api";
import { useAlert } from "@/context/AlertContext";

export default function ChangePassword() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const strength = getPasswordStrength(password);
  const { showAlert } = useAlert();

  const isFormValid =
    oldPassword &&
    password &&
    confirmPassword &&
    strength === 5 &&
    password === confirmPassword;

  const handleSubmit = async () => {
    if (!isFormValid) return;

    try {
      setIsSubmitting(true);

      const response = await api.post("/change-password", {
        old_password: oldPassword,
        password: password,
        password_confirmation: confirmPassword,
      });

      showAlert({
        variant: "success",
        title: "Berhasil",
        message: "Password berhasil diubah",
      });

      setOldPassword("");
      setPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      if (error.response?.status === 422) {
        const errors = error.response.data.errors;

        if (errors) {
          const firstError = Object.values(errors)[0] as string[];
          showAlert({
            variant: "error",
            title: "Error",
            message: firstError[0],
          });
        } else {
          showAlert({
            variant: "error",
            title: "Error",
            message: error.response.data.message,
          });
        }
      } else {
        showAlert({
          variant: "error",
          title: "Error",
          message:
            error.response?.data?.message ||
            error.message ||
            "Something went wrong",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ComponentCard title="Change Password">
      <div className="space-y-5">
        <PasswordInput
          label="Old Password"
          value={oldPassword}
          onChange={setOldPassword}
          disabled={isSubmitting}
        />

        <div className="space-y-3">
          <PasswordInput
            label="New Password"
            value={password}
            onChange={setPassword}
            disabled={isSubmitting}
          />

          <PasswordStrengthIndicator password={password} />
        </div>

        <div>
          <PasswordInput
            label="Confirm New Password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            disabled={isSubmitting}
          />

          {confirmPassword && password !== confirmPassword && (
            <p className="text-sm text-red-500 mt-2">
              Password confirmation does not match
            </p>
          )}
        </div>

        <LoadingButton
          type="button"
          size="sm"
          loading={isSubmitting}
          loadingText="Changing..."
          onClick={handleSubmit}
        >
          Change Password
        </LoadingButton>
      </div>
    </ComponentCard>
  );
}
