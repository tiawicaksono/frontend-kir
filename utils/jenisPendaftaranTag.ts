export function getPendaftaranTagColor(id?: number) {
  const value = Number(id);

  if ([3, 4].includes(value)) {
    return "red";
  }

  if ([5, 6].includes(value)) {
    return "orange";
  }

  return "blue";
}
