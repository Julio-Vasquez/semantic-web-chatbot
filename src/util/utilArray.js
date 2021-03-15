export const GetComment = (str, setUri, setFlag) => {
  const content = [],
    uri = [],
    flags = [];
  str.forEach((element) => {
    const {
      x,
      flag,
      comment: { value },
    } = element;
    uri.push(x.value);
    content.push(value);
    flags.push(flag.value);
  });
  setUri([...new Set(uri)]);
  setFlag([...new Set(flags)]);
  return [...new Set(content.reverse())];
};
//[0] data [1] uri
