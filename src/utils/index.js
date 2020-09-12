export const collectIdsAndData = (doc) => {
  return { id: doc.id, ...doc.data() };
};

export const formatNames = (namesArr, category) => {
  let string = "";

  if (namesArr.length === 1) {
    string = namesArr[0];
  } else if (namesArr.length === 2) {
    string = `${namesArr[0]} and ${namesArr[1]}`;
  } else {
    for (let i = 0; i < namesArr.length; i++) {
      const el = namesArr[i];

      if (i + 1 === namesArr.length) {
        string += `and ${el}`;
      } else {
        string += `${el}, `;
      }
    }
  }

  if (category) {
    string += `'s ${category}`;
  }

  return string;
};
