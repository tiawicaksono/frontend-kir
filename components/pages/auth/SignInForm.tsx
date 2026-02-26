"use client";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import PasswordInput from "@/components/form/form-elements/PasswordField";
import LoadingButton from "@/components/common/LoadingButton";

export default function SignInForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, loading, user } = useAuth();
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);
  const [showError, setShowError] = useState(false);

  // auto hide alert
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
    setIsSubmitting(true);
    setError(null);

    try {
      const redirectTo = await login(email, password);
      router.replace(redirectTo);
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
                <Label>
                  Email <span className="text-error-500">*</span>
                </Label>
                <Input
                  disabled={isSubmitting}
                  placeholder="info@gmail.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <PasswordInput
                  label="Password"
                  value={password}
                  onChange={setPassword}
                />
              </div>

              <div>
                <LoadingButton
                  type="submit"
                  size="sm"
                  loading={isSubmitting}
                  loadingText="Signing in..."
                >
                  Sign in
                </LoadingButton>
              </div>
            </div>
          </form>

          <div className="mt-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/signup"
                    className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                  >
                    Sign Up
                  </Link>
                </span>
              </div>
              <Link
                href="/reset-password"
                className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          {/* ALERT (no layout shift) */}
          {(error || showError) && (
            <div
              className={`
                absolute
                left-0
                right-0
                mt-4
                rounded-lg
                border border-red-200
                bg-red-50
                p-3
                text-sm text-red-700
                transition-all
                duration-400
                ease-[cubic-bezier(0.22, 1, 0.36, 1)]
                ${
                  showError
                    ? "opacity-100 scale-100 translate-y-0"
                    : "opacity-0 scale-95 translate-y-2"
                }
              `}
            >
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
