export function getErrorMessage(
  error: any,
  fallback = "Terjadi kesalahan.",
): string {
  if (!error) return fallback;

  // Validation error Laravel
  if (error?.response?.data?.errors) {
    const firstError = Object.values(error.response.data.errors)[0] as string[];

    return firstError?.[0] || fallback;
  }

  // Custom message backend
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }

  // JS error
  if (error.message) {
    return error.message;
  }

  return fallback;
}
