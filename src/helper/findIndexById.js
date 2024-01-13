const findIndexById = (Array, id) => {
  const index = Array.findIndex((item) => item.id === id);
  return index;
};
export default findIndexById;
