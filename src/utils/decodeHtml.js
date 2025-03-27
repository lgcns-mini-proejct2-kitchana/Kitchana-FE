const decodeHtml = (text) => {
  const parser = new DOMParser();
  const decodedString = parser.parseFromString(text, 'text/html').body.textContent;
  return decodedString || text;
};

export default decodeHtml;