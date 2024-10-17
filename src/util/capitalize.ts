export const capitalize = (str: string) => {
  return str.replace(
    /[A-Za-z]+/g,
    ($1) => $1[0].toUpperCase() + $1.slice(1).toLowerCase(),
  );
};
