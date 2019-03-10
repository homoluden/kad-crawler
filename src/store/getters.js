export const foo = state => state.foo;
export const startDate = () => {
  const d = new Date();
  d.setDate(d.getDate() - 3);
  return d.toLocaleDateString(`ru-RU`);
};

export const endDate = () => {
  const d = new Date();
  return d.toLocaleDateString(`ru-RU`);
};
