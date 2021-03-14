export const GetComment = (str, setUri) => {
  const content = [],
    uri = [];
  str.forEach((element) => {
    let {
      x,
      comment: { value },
    } = element;
    uri.push(x.value);
    content.push(value);
  });
  setUri([...new Set(uri)]);
  return [...new Set(content)];
};
//[0] data [1] uri
