export const safe = (val: any) => {
  if (val === null || val === undefined || val === "") return "-";
  return val;
};
