import {
  getPasswordChecks,
  getPasswordStrength,
  getPasswordStrengthLabel,
} from "@/utils/validatePassword";

interface Props {
  password: string;
}

export default function PasswordStrengthIndicator({ password }: Props) {
  if (!password) return null;

  const checks = getPasswordChecks(password);
  const strength = getPasswordStrength(password);
  const strengthData = getPasswordStrengthLabel(strength);

  return (
    <div className="space-y-3">
      {/* Strength Bar */}
      <div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${strengthData.color} ${strengthData.width}`}
          />
        </div>
        <p
          className={`text-sm font-medium mt-2 ${
            strength <= 2
              ? "text-red-500"
              : strength <= 4
                ? "text-yellow-500"
                : "text-green-500"
          }`}
        >
          {strengthData.label} password
        </p>
      </div>

      {/* Checklist */}
      <ul className="text-sm space-y-1">
        <li className={checks.minLength ? "text-green-600" : "text-gray-400"}>
          ✓ Minimum 6 characters
        </li>
        <li className={checks.uppercase ? "text-green-600" : "text-gray-400"}>
          ✓ One uppercase letter
        </li>
        <li className={checks.lowercase ? "text-green-600" : "text-gray-400"}>
          ✓ One lowercase letter
        </li>
        <li className={checks.number ? "text-green-600" : "text-gray-400"}>
          ✓ One number
        </li>
        <li className={checks.special ? "text-green-600" : "text-gray-400"}>
          ✓ One special character
        </li>
      </ul>
    </div>
  );
}
