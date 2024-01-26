/** Generate id for the item in the list */
export const getRandomId = () => {
  return '_' + Math.random().toString(36).substring(2, 11);
}

