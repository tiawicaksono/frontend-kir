"use client";

import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PasswordInput from "@/components/form/form-elements/PasswordField";
import LoadingButton from "@/components/common/LoadingButton";

// 🔥 SAFE IMPORT HOOK
import { useAuth } from "@/core/auth/auth.context";

export default function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [showError, setShowError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 🔥 SAFE GUARD (INI PENTING)
  let login: any = null;

  try {
    const auth = useAuth();
    login = auth?.login;
  } catch (e) {
    // ❗ Jangan crash SSR
    login = null;
  }

  useEffect(() => {
    if (!error) return;

    const hide = setTimeout(() => setShowError(false), 3200);
    return () => clearTimeout(hide);
  }, [error]);

  useEffect(() => {
    if (showError) return;

    const remove = setTimeout(() => setError(null), 400);
    return () => clearTimeout(remove);
  }, [showError]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!login) {
      setError("Auth system belum siap. Silakan reload halaman.");
      setShowError(true);
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await login(email, password);

      const redirect = searchParams?.get("redirect");

      if (redirect && redirect.startsWith("/")) {
        router.replace(redirect);
      } else {
        router.replace("/dashboard");
      }
    } catch {
      setError("Email atau password salah. Silakan coba lagi.");
      setShowError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div className="relative">
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign In
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email and password to sign in!
            </p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="space-y-6">
              <div>
                <Label>Email *</Label>
                <Input
                  disabled={isSubmitting}
                  type="email"
                  value={email}
                  onChange={setEmail}
                />
              </div>

              <div>
                <PasswordInput
                  label="Password"
                  value={password}
                  onChange={setPassword}
                />
              </div>

              <LoadingButton
                type="submit"
                loading={isSubmitting}
                loadingText="Signing in..."
              >
                Sign in
              </LoadingButton>
            </div>
          </form>

          {(error || showError) && (
            <div className="absolute left-0 right-0 mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700 border border-red-200">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
