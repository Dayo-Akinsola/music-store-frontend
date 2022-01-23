const firstLetterUpper = (str) => {
  const firstLetter = str.slice(0, 1);
  return `${firstLetter.toUpperCase()}${str.substring(1)}`
}

export default firstLetterUpper;