export interface PasswordChecks {
  minLength: boolean;
  uppercase: boolean;
  lowercase: boolean;
  number: boolean;
  special: boolean;
}

export function getPasswordChecks(password: string): PasswordChecks {
  return {
    minLength: password.length >= 6,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };
}

export function getPasswordStrength(password: string): number {
  const checks = getPasswordChecks(password);
  return Object.values(checks).filter(Boolean).length;
}

export function getPasswordStrengthLabel(strength: number): {
  label: string;
  color: string;
  width: string;
} {
  if (strength <= 2) {
    return {
      label: "Weak",
      color: "bg-red-500",
      width: "w-1/3",
    };
  }

  if (strength <= 4) {
    return {
      label: "Medium",
      color: "bg-yellow-500",
      width: "w-2/3",
    };
  }

  return {
    label: "Strong",
    color: "bg-green-500",
    width: "w-full",
  };
}
