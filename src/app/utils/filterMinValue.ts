export const filterMinValue = <T extends { value: number }>(data: T[]): T[] => {
  const minValue = Math.min(...data.map((item) => item.value));

  return data.filter((item) => item.value !== minValue);
};
