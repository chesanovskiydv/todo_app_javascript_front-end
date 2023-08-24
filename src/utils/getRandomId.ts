/** Generate id for the item in the list */
const getRandomId = () => {
  return '_' + Math.random().toString(36).substring(2, 11);
}

export default getRandomId;
