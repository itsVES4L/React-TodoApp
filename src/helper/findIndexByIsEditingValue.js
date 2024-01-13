 const findIndexByIsEditingValue = (array) => {
  const index = array.findIndex((item) => item.isEditing === true);
  return index;
};
 export default findIndexByIsEditingValue;